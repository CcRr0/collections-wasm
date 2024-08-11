import { Reader, Writer } from "./lib/pkg";

let reader: Reader | null = null;
let writer: Writer | null = null;

export function initialize(writerCapacity: number = 1 << 16): void {
    reader = new Reader();
    writer = new Writer(writerCapacity);
    process.on("exit", (): void => {
        writer!.destructive_flush();
    });
}

export function readInteger(signed: boolean = true): number {
    return signed ? reader!.read_i32() : reader!.read_u32();
}

export function readBigInt(signed: boolean = true): bigint {
    return signed ? reader!.read_i64() : reader!.read_u64();
}

export function writeInteger(n: number): void {
    n >= 0 ? writer!.write_u32(n) : writer!.write_i32(n);
}

export function writeBigInt(n: bigint): void {
    n >= 0 ? writer!.write_u64(n) : writer!.write_i64(n);
}

export function writeString(str: string): void {
    writer!.write_string(str);
}

export function writeByte(byte: number): void {
    writer!.write_byte(byte);
}

export function writeSpace(): void {
    writeByte(32);
}

export function writeLine(): void {
    writeByte(10);
}

export function flush(): void {
    writer!.flush();
}
