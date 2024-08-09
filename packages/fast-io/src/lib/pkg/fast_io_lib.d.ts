/* tslint:disable */
/* eslint-disable */
/**
*/
export class Reader {
  free(): void;
/**
*/
  constructor();
/**
* @returns {string}
*/
  read_line(): string;
/**
* @returns {string}
*/
  read_string(): string;
/**
* @returns {number}
*/
  read_u32(): number;
/**
* @returns {bigint}
*/
  read_u64(): bigint;
/**
* @returns {number}
*/
  read_i32(): number;
/**
* @returns {bigint}
*/
  read_i64(): bigint;
}
/**
*/
export class Writer {
  free(): void;
/**
* @param {number} capacity
*/
  constructor(capacity: number);
/**
*/
  flush(): void;
/**
*/
  destructive_flush(): void;
/**
* @param {number} byte
*/
  write_byte(byte: number): void;
/**
* @param {string} st
*/
  write_string(st: string): void;
/**
* @param {number} n
*/
  write_u32(n: number): void;
/**
* @param {bigint} n
*/
  write_u64(n: bigint): void;
/**
* @param {number} n
*/
  write_i32(n: number): void;
/**
* @param {bigint} n
*/
  write_i64(n: bigint): void;
}
