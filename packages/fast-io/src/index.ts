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

export function isEOL(): boolean {
    return reader!.is_eol();
}

export function isEOF(): boolean {
    return reader!.is_eof();
}

export function readInt32(): number {
    return reader!.read_i32();
}

export function readUInt32(): number {
    return reader!.read_u32();
}

export function readInt64(): bigint {
    return reader!.read_i64();
}

export function readUInt64(): bigint {
    return reader!.read_u64();
}

export function readString(): string {
    return reader!.read_string();
}

export function writeInt32(n: number): void {
    writer!.write_i32(n);
}

export function writeUInt32(n: number): void {
    writer!.write_u32(n);
}

export function writeInt64(n: bigint): void {
    writer!.write_i64(n);
}

export function writeUInt64(n: bigint): void {
    writer!.write_u64(n);
}

export function writeString(str: string): void {
    writer!.write_string(str);
}

export function writeByte(byte: number): void {
    writer!.write_byte(byte);
}

export function writeSpace(): void {
    writer!.write_byte(32);
}

export function writeLine(): void {
    writer!.write_byte(10);
}

export function flush(): void {
    writer!.flush();
}
