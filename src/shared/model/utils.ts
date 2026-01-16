export type Valueof<T> = T[keyof T];

declare const __brand: unique symbol;

export type Brand<K, T = string> = T & { [__brand]: K };
