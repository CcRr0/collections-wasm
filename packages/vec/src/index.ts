import { Vector } from "./lib/pkg";

export class Vec<T> {
    private vector: Vector;
    public length: number;

    [index: number]: T;

    constructor();
    constructor(length: number, value: T);

    constructor(length: number = 0, value: T | null = null) {
        if (length > 0 && value === null) {
            throw new Error();
        }
        this.vector = new Vector(value, length);
        this.length = length;
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
