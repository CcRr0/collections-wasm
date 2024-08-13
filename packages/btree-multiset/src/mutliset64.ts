import { BinaryTreeMultiSetInt64, BinaryTreeMultiSetUInt64 } from "./lib/pkg";

type BinaryTreeMultiSet64 = BinaryTreeMultiSetInt64 | BinaryTreeMultiSetUInt64;

class _BTreeMultiSet64<T extends BinaryTreeMultiSet64> {
    protected set: T;
    public length: number;

    constructor(set: T) {
        this.set = set;
        this.length = 0;
    }

    public isEmpty(): boolean {
        return this.length === 0;
    }

    public contains(value: bigint): boolean {
        return this.set.contains(value);
    }

    public count(value: bigint): number {
        return this.set.count(value);
    }

    public first(): bigint | null {
        return this.length === 0 ? null : this.set.first_unwrap();
    }

    public last(): bigint | null {
        return this.length === 0 ? null : this.set.last_unwrap();
    }

    public rangeFirst(min: bigint, max: bigint): bigint | null {
        return this.set.range_first(min, max) || null;
    }

    public rangeLast(min: bigint, max: bigint): bigint | null {
        return this.set.range_last(min, max) || null;
    }

    public insert(value: bigint): void {
        this.length += 1;
        this.set.insert(value);
    }

    public popFirst(): bigint | null {
        if (this.length === 0) {
            return null;
        }
        this.length -= 1;
        return this.set.pop_first_unwrap();
    }

    public popLast(): bigint | null {
        if (this.length === 0) {
            return null;
        }
        this.length -= 1;
        return this.set.pop_last_unwrap();
    }

    public remove(value: bigint): boolean {
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

export class BTreeMultiSetInt64 extends _BTreeMultiSet64<BinaryTreeMultiSetInt64> {
    constructor() {
        super(new BinaryTreeMultiSetInt64());
    }
}

export class BTreeMultiSetUInt64 extends _BTreeMultiSet64<BinaryTreeMultiSetUInt64> {
    constructor() {
        super(new BinaryTreeMultiSetUInt64());
    }
}
