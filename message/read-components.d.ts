import type { MaybeReadResult, ReadPosition } from '../lib';
export declare enum ReadBytesError {
    insufficientLength = "Error reading bytes: insufficient length."
}
/**
 * Returns a function that reads the requested number of bytes from a
 * {@link ReadPosition}, returning either an error message (as a string) or an
 * object containing the `Uint8Array` and the next {@link ReadPosition}.
 *
 * @param length - the number of bytes to read
 */
export declare const readBytes: (length: number) => (position: ReadPosition) => MaybeReadResult<Uint8Array>;
export declare enum ReadUint32LEError {
    insufficientBytes = "Error reading Uint32LE: requires 4 bytes."
}
/**
 * Read a 4-byte, Uint32LE from the provided {@link ReadPosition},
 * returning either an error message (as a string) or an object containing the
 * number and the next {@link ReadPosition}.
 *
 * @param position - the {@link ReadPosition} at which to start reading
 */
export declare const readUint32LE: (position: ReadPosition) => MaybeReadResult<number>;
export declare enum ReadUint64LEError {
    insufficientBytes = "Error reading Uint64LE: requires 8 bytes."
}
/**
 * Read {@link Output.valueSatoshis} from the provided {@link ReadPosition},
 * returning either an error message (as a string) or an object containing the
 * {@link Output.valueSatoshis} and the next {@link ReadPosition}.
 * @param position - the {@link ReadPosition} at which to start reading
 * {@link Output.valueSatoshis}
 */
export declare const readUint64LE: (position: ReadPosition) => MaybeReadResult<bigint>;
export declare enum CompactSizePrefixedBinError {
    invalidCompactSize = "Error reading CompactSize-prefixed bin: invalid CompactSize.",
    insufficientBytes = "Error reading CompactSize-prefixed bin: insufficient bytes."
}
/**
 * Read a bin (`Uint8Array`) that is prefixed by a minimally-encoded
 * `CompactSize` starting at the provided {@link ReadPosition}, returning either
 * an error message (as a string) or an object containing the `Uint8Array` and
 * the next {@link ReadPosition}. (In the transaction format,
 * `CompactSize`-prefixes are used to indicate the length of unlocking bytecode,
 * locking bytecode, and non-fungible token commitments.)
 *
 * @param position - the {@link ReadPosition} at which to start reading the
 * `CompactSize`-prefixed bin (`Uint8Array`)
 */
export declare const readCompactSizePrefixedBin: (position: ReadPosition) => MaybeReadResult<Uint8Array>;
/**
 * Read the remaining bytes from the provided {@link ReadPosition}, returning
 * an object containing the `Uint8Array` and the next {@link ReadPosition}
 * (with `index === bin.length`).
 *
 * @param position - the {@link ReadPosition} at which to start reading the
 * remaining bytes
 */
export declare const readRemainingBytes: (position: ReadPosition) => {
    position: ReadPosition;
    result: Uint8Array;
};
//# sourceMappingURL=read-components.d.ts.map