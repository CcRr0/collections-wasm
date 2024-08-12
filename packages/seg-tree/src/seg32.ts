import { SegmentTreeInt32, SegmentTreeUInt32 } from "./lib/pkg";

type SegmentTree32 = SegmentTreeInt32 | SegmentTreeUInt32;

class _SegTree32<T extends SegmentTree32> {
    protected seg: T;
    public length: number;

    constructor(seg: T, length: number) {
        this.seg = seg;
        this.length = length;
    }

    public query(left: number, right: number): number {
        return this.seg.query(left, right + 1);
    }

    public update(index: number, value: number): void {
        this.seg.update(index, value);
    }
}

export class SegTreeInt32 extends _SegTree32<SegmentTreeInt32> {
    constructor(init: Int32Array | number[]) {
        super(new SegmentTreeInt32(init instanceof Int32Array ? init : new Int32Array(init)), init.length);
    }
}

export class SegTreeUInt32 extends _SegTree32<SegmentTreeUInt32> {
    constructor(init: Uint32Array | number[]) {
        super(new SegmentTreeUInt32(init instanceof Uint32Array ? init : new Uint32Array(init)), init.length);
    }
}
