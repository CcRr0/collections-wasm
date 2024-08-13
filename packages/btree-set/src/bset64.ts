import { BinaryTreeSetInt64, BinaryTreeSetUInt64 } from "./lib/pkg";

type BinaryTreeSet64 = BinaryTreeSetInt64 | BinaryTreeSetUInt64;

class _BTreeSet64<T extends BinaryTreeSet64> {
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

    public first(): bigint | null {
        return this.length === 0 ? null : this.set.first_unwrap();
    }

    public last(): bigint | null {
        return this.length === 0 ? null : this.set.last_unwrap();
    }

    public insert(value: bigint): boolean {
        if (this.set.insert(value)) {
            this.length += 1;
            return true;
        }
        return false;
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

export class BTreeSetInt64 extends _BTreeSet64<BinaryTreeSetInt64> {
    constructor() {
        super(new BinaryTreeSetInt64());
    }
}

export class BTreeSetUInt64 extends _BTreeSet64<BinaryTreeSetUInt64> {
    constructor() {
        super(new BinaryTreeSetUInt64());
    }
}
