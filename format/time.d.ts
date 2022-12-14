/**
 * The minimum Unix timestamp (inclusive) that can be encoded by a
 * transaction's `locktime`.
 */
export declare const minimumLocktimeTimestamp = 500000000;
/**
 * The maximum Unix timestamp (inclusive) that can be encoded by a
 * transaction's `locktime`.
 */
export declare const maximumLocktimeTimestamp = 4294967295;
/**
 * The minimum Date (inclusive) that can be encoded by a transaction's
 * `locktime`.
 */
export declare const minimumLocktimeDate: Date;
/**
 * The maximum Date (inclusive) that can be encoded by a transaction's
 * `locktime`.
 */
export declare const maximumLocktimeDate: Date;
export declare enum LocktimeError {
    dateOutOfRange = "The provided Date is outside of the range that can be encoded in locktime.",
    locktimeOutOfRange = "The provided locktime is outside of the range that can be encoded as a Date (greater than or equal to 500000000 and less than or equal to 4294967295).",
    incorrectLength = "The provided locktime is not the correct length (4 bytes)."
}
/**
 * Convert a JavaScript `Date` object to its equivalent transaction `locktime`
 * representation. The `date` is rounded to the nearest second (the precision of
 * `locktime` Dates).
 *
 * Note, a locktime values greater than or equal to `500000000`
 * See {@link Transaction.locktime} for details.
 *
 * @param date - the Date to convert to a locktime number
 */
export declare const dateToLocktime: (date: Date) => number | LocktimeError.dateOutOfRange;
/**
 * Convert a transaction `locktime` to its equivalent JavaScript `Date` object.
 * If locktime is outside the possible range (greater than or equal to
 * `500000000` and less than or equal to `4294967295`), an error message is
 * returned.
 *
 * @param locktime - a positive integer between `500000000` and `4294967295`,
 * inclusive
 */
export declare const locktimeToDate: (locktime: number) => Date | LocktimeError.locktimeOutOfRange;
/**
 * Convert a JavaScript `Date` object to its equivalent transaction `locktime`
 * bytecode representation. The `date` is rounded to the nearest second (the
 * precision of `locktime` Dates).
 *
 * Note: a block-based locktime can simply be encoded with
 * {@link numberToBinUint32LE} (provided it is no larger than the
 * maximum, `499999999`).
 *
 * @param date - the Date to convert to a locktime Uint8Array
 */
export declare const dateToLocktimeBin: (date: Date) => Uint8Array | LocktimeError.dateOutOfRange;
/**
 * Decode a locktime, returning a `number` for block heights, a `Date` for block
 * times, or a string for parsing errors.
 *
 * @param bin - the 4-byte Uint8Array locktime to parse
 */
export declare const decodeLocktime: (bin: Uint8Array) => number | Date | LocktimeError.incorrectLength;
//# sourceMappingURL=time.d.ts.map