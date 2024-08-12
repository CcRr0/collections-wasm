import { Int32Vector, UInt32Vector } from "./lib/pkg";

type Vector32 = Int32Vector | UInt32Vector;

class _Vec32<T extends Vector32> {
    protected vector: T;
    public length: number;

    [index: number]: number;

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
            set: (target, prop, value: number): boolean => {
                if (typeof prop === "string") {
                    if (!isNaN(Number(prop))) {
                        target.vector.set(parseInt(prop), value);
                    } else if (prop === "length") {
                        target.length = value;
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

    public push(value: number): void {
        this.length += 1;
        this.vector.push(value);
    }

    public pop(): number | null {
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

export class Int32Vec extends _Vec32<Int32Vector> {
    constructor();
    constructor(length: number, value: number);
    constructor(length: number, mapFn: (index: number) => number);

    constructor(length: number = 0, valueOrMapFn?: number | ((index: number) => number)) {
        if (typeof valueOrMapFn === "function") {
            const vector: Int32Vector = new Int32Vector(0, 0);
            vector.reserve(length);
            for (let i: number = 0; i < length; i++) {
                vector.push((valueOrMapFn(i)));
            }
            super(vector, length);
        } else {
            super(new Int32Vector(valueOrMapFn ?? 0, length), length);
        }
    }
}

export class UInt32Vec extends _Vec32<UInt32Vector> {
    constructor();
    constructor(length: number, value: number);
    constructor(length: number, mapFn: (index: number) => number);

    constructor(length: number = 0, valueOrMapFn?: number | ((index: number) => number)) {
        if (typeof valueOrMapFn === "function") {
            const vector: UInt32Vector = new UInt32Vector(0, 0);
            vector.reserve(length);
            for (let i: number = 0; i < length; i++) {
                vector.push((valueOrMapFn(i)));
            }
            super(vector, length);
        } else {
            super(new UInt32Vector(valueOrMapFn ?? 0, length), length);
        }
    }
}
