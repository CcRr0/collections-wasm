import { Int64Vector, UInt64Vector } from "./lib/pkg";

type Vector64 = Int64Vector | UInt64Vector;

class _Vec64<T extends Vector64> {
    protected vector: T;
    public length: number;

    [index: number]: bigint;

    constructor(vector: T, length: number) {
        this.vector = vector;
        this.length = length;
        return new Proxy(this, {
            get: (target, prop) => {
                if (typeof prop === "string" && !isNaN(Number(prop))) {
                    return target.vector.get(parseInt(prop));
                }
                return target[prop as keyof typeof target];
            },
            set: (target, prop, value: number | bigint): boolean => {
                if (typeof prop === "string") {
                    if (!isNaN(Number(prop))) {
                        target.vector.set(parseInt(prop), value as bigint);
                    } else if (prop === "length") {
                        target.length = value as number;
                    }
                }
                return true;
            }
        });
    }

    public reserve(additional: number): void {
        this.vector.reserve(additional);
    }

    public isEmpty(): boolean {
        return this.length === 0;
    }

    public push(value: bigint): void {
        this.length += 1;
        this.vector.push(value);
    }

    public pop(): bigint | null {
        if (this.length === 0) {
            return null;
        }
        this.length -= 1;
        return this.vector.pop_unwrap();
    }

    public sort(reverse: boolean = false): void {
        this.vector.sort(reverse);
    }

    public clear(): void {
        this.length = 0;
        this.vector.clear();
    }
}

export class Int64Vec extends _Vec64<Int64Vector> {
    constructor();
    constructor(length: number, value: bigint);
    constructor(length: number, mapFn: (index: number) => bigint);

    constructor(length: number = 0, valueOrMapFn?: bigint | ((index: number) => bigint)) {
        if (typeof valueOrMapFn === "function") {
            const vector: Int64Vector = new Int64Vector(0n, 0);
            vector.reserve(length);
            for (let i: number = 0; i < length; i++) {
                vector.push((valueOrMapFn(i)));
            }
            super(vector, length);
        } else {
            super(new Int64Vector(valueOrMapFn ?? 0n, length), length);
        }
    }
}

export class UInt64Vec extends _Vec64<UInt64Vector> {
    constructor();
    constructor(length: number, value: bigint);
    constructor(length: number, mapFn: (index: number) => bigint);

    constructor(length: number = 0, valueOrMapFn?: bigint | ((index: number) => bigint)) {
        if (typeof valueOrMapFn === "function") {
            const vector: UInt64Vector = new UInt64Vector(0n, 0);
            vector.reserve(length);
            for (let i: number = 0; i < length; i++) {
                vector.push((valueOrMapFn(i)));
            }
            super(vector, length);
        } else {
            super(new UInt64Vector(valueOrMapFn ?? 0n, length), length);
        }
    }
}
