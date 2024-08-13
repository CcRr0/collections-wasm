import { BinaryTreeMultiSetInt32, BinaryTreeMultiSetUInt32 } from "./lib/pkg";

type BinaryTreeMultiSet32 = BinaryTreeMultiSetInt32 | BinaryTreeMultiSetUInt32;

class _BTreeMultiSet32<T extends BinaryTreeMultiSet32> {
    protected set: T;
    public length: number;

    constructor(set: T) {
        this.set = set;
        this.length = 0;
    }

    public isEmpty(): boolean {
        return this.length === 0;
    }

    public contains(value: number): boolean {
        return this.set.contains(value);
    }

    public count(value: number): number {
        return this.set.count(value);
    }

    public first(): number | null {
        return this.length === 0 ? null : this.set.first_unwrap();
    }

    public last(): number | null {
        return this.length === 0 ? null : this.set.last_unwrap();
    }

    public rangeFirst(min: number, max: number): number | null {
        return this.set.range_first(min, max) || null;
    }

    public rangeLast(min: number, max: number): number | null {
        return this.set.range_last(min, max) || null;
    }

    public insert(value: number): void {
        this.length += 1;
        this.set.insert(value);
    }

    public popFirst(): number | null {
        if (this.length === 0) {
            return null;
        }
        this.length -= 1;
        return this.set.pop_first_unwrap();
    }

    public popLast(): number | null {
        if (this.length === 0) {
            return null;
        }
        this.length -= 1;
        return this.set.pop_last_unwrap();
    }

    public remove(value: number): boolean {
        if (this.set.remove(value)) {
            this.length -= 1;
            return true;
        }
        return false;
    }

    public clear(): void {
        this.length = 0;
        this.set.clear();
    }
}

export class BTreeMultiSetInt32 extends _BTreeMultiSet32<BinaryTreeMultiSetInt32> {
    constructor() {
        super(new BinaryTreeMultiSetInt32());
    }
}

export class BTreeMultiSetUInt32 extends _BTreeMultiSet32<BinaryTreeMultiSetUInt32> {
    constructor() {
        super(new BinaryTreeMultiSetUInt32());
    }
}
