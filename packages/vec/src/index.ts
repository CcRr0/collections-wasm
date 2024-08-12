import { Vector } from "./lib/pkg";

export class Vec<T> {
    private vector: Vector;
    public length: number;

    [index: number]: T;

    constructor();
    constructor(length: number, mapFn: (index: number) => T);
    constructor(length: number, mapFn: () => T);
    constructor(length: number, value: T);

    constructor(length: number = 0, valueOrMapFn?: T | (() => T) | ((index: number) => T)) {
        if (length > 0 && valueOrMapFn === undefined) {
            throw new Error();
        }
        this.length = length;
        if (typeof valueOrMapFn === "function") {
            this.vector = new Vector(null, 0);
            this.vector.reserve(length);
            if ((valueOrMapFn as (() => T) | ((index: number) => T)).length === 0) {
                for (let i: number = 0; i < length; i++) {
                    this.vector.set(i, (valueOrMapFn as () => T)());
                }
            } else {
                for (let i: number = 0; i < length; i++) {
                    this.vector.set(i, (valueOrMapFn as (index: number) => T)(i));
                }
            }
        } else {
            this.vector = new Vector(valueOrMapFn as T, length);
        }
        return new Proxy(this, {
            get: (target, prop) => {
                if (typeof prop === "string" && !isNaN(Number(prop))) {
                    return target.vector.get(parseInt(prop)) as T;
                }
                return target[prop as keyof typeof target];
            },
            set: (target, prop, value: T): boolean => {
                if (typeof prop === "string" && !isNaN(Number(prop))) {
                    target.vector.set(parseInt(prop), value);
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

    public push(value: T): void {
        this.vector.push(value);
        this.length += 1;
    }

    public pop(): T | null {
        if (this.length === 0) {
            return null;
        }
        this.length -= 1;
        return this.vector.pop_unwrap() as T;
    }
}
