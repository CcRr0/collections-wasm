import { SegmentTreeInt32, SegmentTreeInt64 } from "./lib/pkg";

type SegmentTree = SegmentTreeInt32 | SegmentTreeInt64;

class _SegTree<T extends SegmentTree> {
    protected seg: T;
    public length: number;

    constructor(seg: T, length: number) {
        this.seg = seg;
        this.length = length;
    }
}

export class SegTree32 extends _SegTree<SegmentTreeInt32> {
    constructor(init: Int32Array | number[]) {
        super(new SegmentTreeInt32(init instanceof Int32Array ? init : new Int32Array(init)), init.length);
    }

    public query(left: number, right: number): number {
        return this.seg.query(left, right + 1);
    }

    public update(index: number, value: number): void {
        this.seg.update(index, value);
    }
}

export class SegTree64 extends _SegTree<SegmentTreeInt64> {
    constructor(init: BigInt64Array | bigint[]) {
        super(new SegmentTreeInt64(init instanceof BigInt64Array ? init : new BigInt64Array(init)), init.length);
    }

    public query(left: number, right: number): bigint {
        return this.seg.query(left, right + 1);
    }

    public update(index: number, value: bigint): void {
        this.seg.update(index, value);
    }
}
