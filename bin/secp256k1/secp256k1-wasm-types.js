// cSpell:ignore noncefp, ndata, outputlen
/**
 * bitflags used in secp256k1's public API (translated from secp256k1.h)
 */
/* eslint-disable no-bitwise, @typescript-eslint/no-magic-numbers, @typescript-eslint/prefer-literal-enum-member */
/** All flags' lower 8 bits indicate what they're for. Do not use directly. */
// const SECP256K1_FLAGS_TYPE_MASK = (1 << 8) - 1;
const SECP256K1_FLAGS_TYPE_CONTEXT = 1 << 0;
const SECP256K1_FLAGS_TYPE_COMPRESSION = 1 << 1;
/** The higher bits contain the actual data. Do not use directly. */
const SECP256K1_FLAGS_BIT_CONTEXT_VERIFY = 1 << 8;
const SECP256K1_FLAGS_BIT_CONTEXT_SIGN = 1 << 9;
const SECP256K1_FLAGS_BIT_COMPRESSION = 1 << 8;
/** Flags to pass to secp256k1_context_create. */
const SECP256K1_CONTEXT_VERIFY = SECP256K1_FLAGS_TYPE_CONTEXT | SECP256K1_FLAGS_BIT_CONTEXT_VERIFY;
const SECP256K1_CONTEXT_SIGN = SECP256K1_FLAGS_TYPE_CONTEXT | SECP256K1_FLAGS_BIT_CONTEXT_SIGN;
const SECP256K1_CONTEXT_NONE = SECP256K1_FLAGS_TYPE_CONTEXT;
/** Flag to pass to secp256k1_ec_pubkey_serialize and secp256k1_ec_privkey_export. */
const SECP256K1_EC_COMPRESSED = SECP256K1_FLAGS_TYPE_COMPRESSION | SECP256K1_FLAGS_BIT_COMPRESSION;
const SECP256K1_EC_UNCOMPRESSED = SECP256K1_FLAGS_TYPE_COMPRESSION;
/**
 * Flag to pass to a Secp256k1.contextCreate method.
 *
 * The purpose of context structures is to cache large precomputed data tables
 * that are expensive to construct, and also to maintain the randomization data
 * for blinding.
 *
 * You can create a context with only VERIFY or only SIGN capabilities, or you
 * can use BOTH. (NONE can be used for conversion/serialization.)
 */
export var ContextFlag;
(function (ContextFlag) {
    ContextFlag[ContextFlag["NONE"] = SECP256K1_CONTEXT_NONE] = "NONE";
    ContextFlag[ContextFlag["VERIFY"] = SECP256K1_CONTEXT_VERIFY] = "VERIFY";
    ContextFlag[ContextFlag["SIGN"] = SECP256K1_CONTEXT_SIGN] = "SIGN";
    ContextFlag[ContextFlag["BOTH"] = SECP256K1_CONTEXT_SIGN | SECP256K1_CONTEXT_VERIFY] = "BOTH";
})(ContextFlag || (ContextFlag = {}));
/**
 * Flag to pass a Secp256k1 public key serialization method.
 *
 * You can indicate COMPRESSED (33 bytes, header byte 0x02 or 0x03) or
 * UNCOMPRESSED (65 bytes, header byte 0x04) format.
 */
export var CompressionFlag;
(function (CompressionFlag) {
    CompressionFlag[CompressionFlag["COMPRESSED"] = SECP256K1_EC_COMPRESSED] = "COMPRESSED";
    CompressionFlag[CompressionFlag["UNCOMPRESSED"] = SECP256K1_EC_UNCOMPRESSED] = "UNCOMPRESSED";
})(CompressionFlag || (CompressionFlag = {}));
//# sourceMappingURL=secp256k1-wasm-types.js.map