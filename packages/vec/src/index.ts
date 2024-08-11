import { Vector } from "./lib/pkg";

export class Vec<T> {
    private vector: Vector;

    [index: number]: T;

    constructor();
    constructor(size: number, value: T);

    constructor(size: number = 0, value: T | null = null) {
        if (size > 0 && value === null) {
            throw new Error();
        }
        this.vector = new Vector(value, size);
        return new Proxy(this, {
            get: (target, prop) => {
                if (typeof prop === "string" && !isNaN(Number(prop))) {
                    return <T>target.vector.get(parseInt(prop));
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

    public len(): number {
        return this.vector.len();
    }

    public isEmpty(): boolean {
        return this.vector.is_empty();
    }

    public reserve(additional: number): void {
        this.vector.reserve(additional);
    }

    public push(value: T): void {
        this.vector.push(value);
    }

    public pop(): T | null {
        return this.isEmpty() ? null : this.vector.pop_unwrap();
    }
}
