import type { Sha256 } from '../lib';
/**
 * The most common address types used on bitcoin and bitcoin-like networks. Each
 * address type represents a commonly used locking bytecode pattern.
 *
 * @remarks
 * Addresses are strings that encode information about the network and
 * `lockingBytecode` to which a transaction output can pay.
 *
 * Several address formats exist – `Base58Address` was the format used by the
 * original satoshi client, and is still in use on several active chains 
 * 
 */
export declare enum LockingBytecodeType {
    /**
     * Pay to Public Key (P2PK). This address type is uncommon, and primarily
     * occurs in early blocks because the original satoshi implementation mined
     * rewards to P2PK addresses.
     *
     * There are no standardized address formats for representing a P2PK address.
     * Instead, most applications use the `AddressType.p2pkh` format.
     */
    p2pk = "P2PK",
    /**
     * Pay to Public Key Hash (P2PKH). The most common address type. P2PKH
     * addresses lock funds using a single private key.
     */
    p2pkh = "P2PKH",
    /**
     * 20-byte Pay to Script Hash (P2SH20). An address type that locks funds to
     * the 20-byte hash of a script provided in the spending transaction. See
     * BIPs 13 and 16 for details.
     */
    p2sh20 = "P2SH20",
    /**
     * 32-byte Pay to Script Hash (P2SH32). An address type that locks funds to
     * the 32-byte hash of a script provided in the spending transaction.
     */
    p2sh32 = "P2SH32"
}
/**
 * An object representing the contents of an address of a known address type.
 * This can be used to encode an address or its locking bytecode.
 */
export interface KnownAddressTypeContents {
    type: `${LockingBytecodeType}`;
    payload: Uint8Array;
}
export interface UnknownAddressTypeContents {
    /**
     * This address type represents an address using an unknown or uncommon
     * locking bytecode pattern for which no standardized address formats exist.
     */
    type: 'unknown';
    payload: Uint8Array;
}
/**
 * An object representing the contents of an address. This can be used to encode
 * an address or its locking bytecode.
 *
 * See {@link lockingBytecodeToAddressContents} for details.
 */
export declare type AddressContents = KnownAddressTypeContents | UnknownAddressTypeContents;
export declare const isPayToPublicKeyUncompressed: (lockingBytecode: Uint8Array) => boolean;
export declare const isPayToPublicKeyCompressed: (lockingBytecode: Uint8Array) => boolean;
export declare const isPayToPublicKey: (lockingBytecode: Uint8Array) => boolean;
export declare const isPayToPublicKeyHash: (lockingBytecode: Uint8Array) => boolean;
export declare const isPayToScriptHash20: (lockingBytecode: Uint8Array) => boolean;
export declare const isPayToScriptHash32: (lockingBytecode: Uint8Array) => boolean;
/**
 * Attempt to match a lockingBytecode to a standard address type for use in
 * address encoding. (See {@link LockingBytecodeType} for details.)
 *
 * For a locking bytecode matching the Pay to Public Key Hash (P2PKH) pattern,
 * the returned `type` is {@link LockingBytecodeType.p2pkh} and `payload` is the
 * `HASH160` of the public key.
 *
 * For a locking bytecode matching the 20-byte Pay to Script Hash (P2SH20)
 * pattern, the returned `type` is {@link LockingBytecodeType.p2sh20} and
 * `payload` is the `HASH160` of the redeeming bytecode, A.K.A. "redeem
 * script hash".
 *
 * For a locking bytecode matching the Pay to Public Key (P2PK) pattern, the
 * returned `type` is {@link LockingBytecodeType.p2pk} and `payload` is the full
 * public key.
 *
 * Any other locking bytecode will return a `type` of
 * {@link LockingBytecodeType.unknown} and a payload of the
 * unmodified `bytecode`.
 *
 * @param bytecode - the locking bytecode to match
 */
export declare const lockingBytecodeToAddressContents: (bytecode: Uint8Array) => AddressContents;
/**
 * Given the 20-byte {@link hash160} of a compressed public key, return a P2PKH
 * locking bytecode:
 * `OP_DUP OP_HASH160 OP_PUSHBYTES_20 publicKeyHash OP_EQUALVERIFY OP_CHECKSIG`.
 *
 * This method does not validate `publicKeyHash` in any way; inputs of incorrect
 * lengths will produce incorrect results.
 *
 * @param publicKeyHash - the 20-byte hash of the compressed public key
 * @returns
 */
export declare const encodeLockingBytecodeP2pkh: (publicKeyHash: Uint8Array) => Uint8Array;
/**
 * Given the 20-byte {@link hash160} of a P2SH20 redeem bytecode, encode a
 * P2SH20 locking bytecode:
 * `OP_HASH160 OP_PUSHBYTES_20 redeemBytecodeHash OP_EQUAL`.
 *
 * This method does not validate `p2sh20Hash` in any way; inputs of incorrect
 * lengths will produce incorrect results.
 *
 * @param p2sh20Hash - the 20-byte, p2sh20 redeem bytecode hash
 */
export declare const encodeLockingBytecodeP2sh20: (p2sh20Hash: Uint8Array) => Uint8Array;
/**
 * Given the 32-byte {@link hash256} of a P2SH32 redeem bytecode, encode a
 * P2SH32 locking bytecode:
 * `OP_HASH256 OP_PUSHBYTES_32 redeemBytecodeHash OP_EQUAL`.
 *
 * This method does not validate `p2sh32Hash` in any way; inputs of incorrect
 * lengths will produce incorrect results.
 *
 * @param p2sh32Hash - the 32-byte, p2sh32 redeem bytecode hash
 */
export declare const encodeLockingBytecodeP2sh32: (p2sh32Hash: Uint8Array) => Uint8Array;
/**
 * Given a 33-byte compressed or 65-byte uncompressed public key, encode a P2PK
 * locking bytecode: `OP_PUSHBYTES_33 publicKey OP_CHECKSIG` or
 * `OP_PUSHBYTES_65 publicKey OP_CHECKSIG`.
 *
 * This method does not validate `publicKey` in any way; inputs of incorrect
 * lengths will produce incorrect results.
 *
 * @param publicKey - the 33-byte or 65-byte public key
 */
export declare const encodeLockingBytecodeP2pk: (publicKey: Uint8Array) => Uint8Array;
/**
 * Get the locking bytecode for a {@link KnownAddressTypeContents}. See
 * {@link lockingBytecodeToAddressContents} for details.
 *
 * @param addressContents - the `AddressContents` to encode
 */
export declare const addressContentsToLockingBytecode: ({ payload, type, }: KnownAddressTypeContents) => Uint8Array;

export declare enum LockingBytecodeGenerationError {
    unsupportedPayloadLength = "Error generating locking bytecode: no standard locking bytecode patterns support a payload of this length."
}


//# sourceMappingURL=locking-bytecode.d.ts.map