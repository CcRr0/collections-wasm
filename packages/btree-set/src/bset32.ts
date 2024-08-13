import { BinaryTreeSetInt32, BinaryTreeSetUInt32 } from "./lib/pkg";

type BinaryTreeSet32 = BinaryTreeSetInt32 | BinaryTreeSetUInt32;

class _BTreeSet32<T extends BinaryTreeSet32> {
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

    public insert(value: number): boolean {
        if (this.set.insert(value)) {
            this.length += 1;
            return true;
        }
        return false;
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

export class BTreeSetInt32 extends _BTreeSet32<BinaryTreeSetInt32> {
    constructor() {
        super(new BinaryTreeSetInt32());
    }
}

export class BTreeSetUInt32 extends _BTreeSet32<BinaryTreeSetUInt32> {
    constructor() {
        super(new BinaryTreeSetUInt32());
    }
}
