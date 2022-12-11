import { sha256 as internalSha256 } from "../crypto/crypto.js";
import { encodeLockingBytecodeP2pkh } from "../address/locking-bytecode.js";
import type { Sha256 } from "../crypto/crypto.js";

import {
  base58ToBin,
  BaseConversionError,
  binToBase58,
  utf8ToBin,
  binToUtf8,
  binToHex,
  hexToBin,
} from "../format/format.js";

/**
 * Token identifier must be all lowercase word characters [a-z0-9]. For lotus this
 * would generally be lotus
 */
export enum TokenIdentifier {
  lotus = "lotus",
}

/**
 * A single byte identifier used to verify the intended network for the transaction.
 * It must be in the set of characters: [_A-Z]. Currently the specified networks are:
 */
export enum LotusNetworkByte {
  mainnet = 95,
  testnet = 84,
  regtest = 82,
}

/**
 * Base58 version byte values for common Base58Address format versions.
 */
export enum Base58AddressFormatVersion {
  /**
   * A Pay to Public Key Hash (P2PKH) address – base58 encodes to a leading `1`.
   *
   * Hex: `0x00`
   */
  p2pkh = 0,
  /**
   * A 20-byte Pay to Script Hash (P2SH20) address – base58 encodes to a leading
   * `3`.
   *
   * Hex: `0x05`
   */
  p2sh20 = 5,
  /**
   * A private key in Wallet Import Format. For private keys used with
   * uncompressed public keys, the payload is 32 bytes and causes the version
   * to be encoded as a `5`. For private keys used with compressed public keys,
   * a final `0x01` byte is appended to the private key, increasing the payload
   * to 33 bytes, and causing the version to be encoded as a `K` or `L`.
   *
   * Hex: `0x80`
   */
  wif = 128,
  /**
   * A testnet Pay to Public Key Hash (P2PKH) address – base58 encodes to a
   * leading `m` or `n`.
   *
   * Hex: `0x6f`
   */
  p2pkhTestnet = 111,
  /**
   * A testnet 20-byte Pay to Script Hash (P2SH20) address – base58 encodes to a
   * leading `2`.
   *
   * Hex: `0xc4`
   */
  p2sh20Testnet = 196,
  /**
   * A private key in Wallet Import Format intended for testnet use. For private
   * keys used with uncompressed public keys, the payload is 32 bytes and causes
   * the version to be encoded as a `9`. For private keys used with compressed
   * public keys, a final `0x01` byte is appended to the private key, increasing
   * the payload to 33 bytes, and causing the version to be encoded as a `c`.
   *
   * Hex: `0xef`
   */
  wifTestnet = 239,
}

export enum Base58AddressError {
  unknownCharacter = "Base58Address error: address may only contain valid base58 characters.",
  tooShort = "Base58Address error: address is too short to be valid.",
  invalidChecksum = "Base58Address error: address has an invalid checksum.",
  unknownAddressVersion = "Base58Address error: address uses an unknown address version.",
  incorrectLength = "Base58Address error: the encoded payload is not the correct length (20 bytes).",
}

/**
 *
 * @param version - Base58 version byte values for common Base58Address format versions
 *
 * @param publicKeyHash - the 20-byte hash of the compressed public key
 *
 * @param sha256 - an implementation of sha256 (defaults to the internal WASM
 * implementation)
 * @returns -valid lotus address string
 */
export const encodeLotusAddress = <
  VersionType extends number = Base58AddressFormatVersion //.p2pkh
>(
  version: VersionType,
  publicKeyHash: Uint8Array,
  sha256: { hash: Sha256["hash"] } = internalSha256
) => {
  if (publicKeyHash.length != 20) {
    return "invalid public key hash";
  }
  const checksumBytes = 4;
  const scriptPubkey = encodeLockingBytecodeP2pkh(publicKeyHash);
  const lotusTokenPrefix = utf8ToBin(TokenIdentifier.lotus);
  const lotusNetworkByte = LotusNetworkByte.mainnet;
  const payloadContent = Uint8Array.from([version, ...scriptPubkey]);
  const checksumMsg = Uint8Array.from([
    ...lotusTokenPrefix,
    lotusNetworkByte,
    ...payloadContent,
  ]);
  const checksum = sha256.hash(checksumMsg).slice(0, checksumBytes);
  const preBase58Payload = Uint8Array.from([...payloadContent, ...checksum]);
  const base58Payload = binToBase58(preBase58Payload);
  const address =
    binToUtf8(lotusTokenPrefix) +
    binToUtf8(Uint8Array.from([lotusNetworkByte])) +
    base58Payload;
  return address;
};


/**
 * 
 * @param address - The address to decode
 * @param sha256  - an implementation of sha256 (defaults to the internal WASM
 * implementation)
 * @returns 
 */
export const decodeLotusAddress = (
  address: string,
  sha256: { hash: Sha256["hash"] } = internalSha256
): any => {
  const checksumBytes = 4;
  const bin = base58ToBin(address.slice(6));
  if (bin === BaseConversionError.unknownCharacter) {
    return Base58AddressError.unknownCharacter;
  }
  const minimumBase58AddressLength = 5;
  if (bin.length < minimumBase58AddressLength) {
    return Base58AddressError.tooShort;
  }
  const checksum = bin.slice(-checksumBytes);
  const checksumMsg = Uint8Array.from([
     ...utf8ToBin(TokenIdentifier.lotus),
     LotusNetworkByte.mainnet,
    ...bin.slice(0,-checksumBytes),
  ]);
    const expectedChecksum = sha256.hash(checksumMsg).slice(0, checksumBytes);
  // @ts-ignore
  if (!checksum.every((value, i) => value === expectedChecksum[i])) {
    return Base58AddressError.invalidChecksum;
  }
  return {
    payload: bin.slice(1,-checksumBytes ),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    version: bin[0]!,
  };
};
