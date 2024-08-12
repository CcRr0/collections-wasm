import { SegmentTreeInt64, SegmentTreeUInt64 } from "./lib/pkg";
import { Operator } from "./operator";

type SegmentTree64 = SegmentTreeInt64 | SegmentTreeUInt64;

class _SegTree64<T extends SegmentTree64> {
    protected seg: T;
    public length: number;

    constructor(seg: T, length: number) {
        this.seg = seg;
        this.length = length;
    }

    public query(left: number, right: number): bigint {
        return this.seg.query(left, right + 1);
    }

    public update(index: number, value: bigint): void {
        this.seg.update(index, value);
    }
}

export class SegTreeInt64 extends _SegTree64<SegmentTreeInt64> {
    constructor(init: BigInt64Array | bigint[], op: keyof typeof Operator) {
        super(new SegmentTreeInt64(init instanceof BigInt64Array ? init : new BigInt64Array(init), Operator[op]), init.length);
    }
}

export class SegTreeUInt64 extends _SegTree64<SegmentTreeUInt64> {
    constructor(init: BigUint64Array | bigint[], op: keyof typeof Operator) {
        super(new SegmentTreeUInt64(init instanceof BigUint64Array ? init : new BigUint64Array(init), Operator[op]), init.length);
    }
}
