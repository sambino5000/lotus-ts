/**
 * An implementation of the built-in `Partial` utility that allows explicit
 * `undefined` values when
 * [exactOptionalPropertyTypes](https://www.typescriptlang.org/tsconfig#exactOptionalPropertyTypes)
 * is enabled.
 */
export declare type PartialExactOptional<T> = {
    [P in keyof T]?: T[P] | undefined;
};
export declare type ImmutablePrimitive = Function | boolean | number | string | null | undefined;
export declare type ImmutableArray<T> = readonly Immutable<T>[];
export declare type ImmutableMap<K, V> = ReadonlyMap<Immutable<K>, Immutable<V>>;
export declare type ImmutableSet<T> = ReadonlySet<Immutable<T>>;
export declare type ImmutableObject<T> = {
    readonly [K in keyof T]: Immutable<T[K]>;
};
export interface ImmutableUint8Array extends Omit<Uint8Array, 'copyWithin' | 'fill' | 'reverse' | 'set' | 'sort'> {
    readonly [n: number]: number;
}
/**
 * A deep-readonly utility type. Supports objects, `Array`s, `Uint8Array`s,
 * `Map`s, and `Set`s.
 *
 * Note: `Uint8Array` is the only supported `TypedArray`.
 */
export declare type Immutable<T> = T extends ImmutablePrimitive ? T : T extends (infer U)[] ? ImmutableArray<U> : T extends Uint8Array ? ImmutableUint8Array : T extends Map<infer K, infer V> ? ImmutableMap<K, V> : T extends Set<infer M> ? ImmutableSet<M> : ImmutableObject<T>;
declare type FunctionComparisonEqualsWrapped<T> = T extends (T extends {} ? infer R & {} : infer R) ? {
    [P in keyof R]: R[P];
} : never;
declare type FunctionComparisonEquals<A, B> = (<T>() => T extends FunctionComparisonEqualsWrapped<A> ? 1 : 2) extends <T>() => T extends FunctionComparisonEqualsWrapped<B> ? 1 : 2 ? true : false;
declare type IsAny<T> = FunctionComparisonEquals<T, any>;
declare type InvariantComparisonEqualsWrapped<T> = {
    value: T;
    setValue: (value: T) => never;
};
declare type InvariantComparisonEquals<Expected, Actual> = InvariantComparisonEqualsWrapped<Expected> extends InvariantComparisonEqualsWrapped<Actual> ? IsAny<Actual | Expected> extends true ? IsAny<Actual> | IsAny<Expected> extends true ? true : false : true : false;
declare type Equals<Expected, Actual> = InvariantComparisonEquals<Expected, Actual> extends true ? FunctionComparisonEquals<Expected, Actual> : false;
export declare type AssertTypesEqual<T1, T2> = Equals<T1, T2> extends true ? true : never;
export {};
//# sourceMappingURL=type-utils.d.ts.map