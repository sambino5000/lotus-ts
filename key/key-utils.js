/**
 * Verify that a private key is valid for the Secp256k1 curve. Returns `true`
 * for success, or `false` on failure.
 *
 * Private keys are 256-bit numbers encoded as a 32-byte, big-endian Uint8Array.
 * Nearly every 256-bit number is a valid secp256k1 private key. Specifically,
 * any 256-bit number greater than `0x01` and less than
 * `0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140`
 * is a valid private key. This range is part of the definition of the
 * secp256k1 elliptic curve parameters.
 *
 * This method does not require a `Secp256k1` implementation.
 */
export const validateSecp256k1PrivateKey = (privateKey) => {
    const privateKeyLength = 32;
    if (privateKey.length !== privateKeyLength ||
        privateKey.every((value) => value === 0)) {
        return false;
    }
    /**
     * The largest possible Secp256k1 private key – equal to the order of the
     * Secp256k1 curve minus one.
     */
    // prettier-ignore
    const maximumSecp256k1PrivateKey = [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 254, 186, 174, 220, 230, 175, 72, 160, 59, 191, 210, 94, 140, 208, 54, 65, 63]; // eslint-disable-line @typescript-eslint/no-magic-numbers
    const firstDifference = privateKey.findIndex((value, i) => value !== maximumSecp256k1PrivateKey[i]);
    if (firstDifference === -1 ||
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        privateKey[firstDifference] < maximumSecp256k1PrivateKey[firstDifference]) {
        return true;
    }
    return false;
};
/**
 * Securely generate a valid Secp256k1 private key given a secure source of
 * randomness.
 *
 * **Node.js Usage**
 * ```ts
 * import { randomBytes } from 'crypto';
 * import { generatePrivateKey } from '@bitauth/libauth';
 *
 * const key = generatePrivateKey(() => randomBytes(32));
 * ```
 *
 * **Browser Usage**
 * ```ts
 * import { generatePrivateKey } from '@bitauth/libauth';
 *
 * const key = generatePrivateKey(() =>
 *   window.crypto.getRandomValues(new Uint8Array(32))
 * );
 * ```
 *
 * @param secureRandom - a method that returns a securely-random 32-byte
 * Uint8Array
 */
export const generatePrivateKey = (secureRandom) => {
    // eslint-disable-next-line functional/no-let, @typescript-eslint/init-declarations
    let maybeKey;
    // eslint-disable-next-line functional/no-loop-statement
    do {
        // eslint-disable-next-line functional/no-expression-statement
        maybeKey = secureRandom();
    } while (!validateSecp256k1PrivateKey(maybeKey));
    return maybeKey;
};
//# sourceMappingURL=key-utils.js.map