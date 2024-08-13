import { Heap64_1, Heap64_2 } from "./lib/pkg";

type Heap64 = Heap64_1 | Heap64_2;

class _BinaryHeap<T, H extends Heap64> {
    protected heap: H;
    public length: number;

    constructor(heap: H) {
        this.heap = heap;
        this.length = 0;
    }

    public reserve(additional: number): void {
        this.heap.reserve(additional);
    }

    public isEmpty(): boolean {
        return this.length === 0;
    }

    public peek(): T | null {
        return this.length === 0 ? null : this.heap.peek_unwrap() as T;
    }

    public pop(): T | null {
        if (this.length === 0) {
            return null;
        }
        this.length -= 1;
        return this.heap.pop_unwrap() as T;
    }

    public clear(): void {
        this.length = 0;
        this.heap.clear();
    }
}

export class BinaryHeapInt64<T> extends _BinaryHeap<T, Heap64_1> {
    constructor() {
        super(new Heap64_1());
    }

    public push(value: T, key: bigint): void {
        this.length += 1;
        this.heap.push(value, key);
    }
}

export class BinaryHeapInt64Pair<T> extends _BinaryHeap<T, Heap64_2> {
    constructor() {
        super(new Heap64_2());
    }

    public push(value: T, key1: bigint, key2: bigint): void {
        this.length += 1;
        this.heap.push(value, key1, key2);
    }
}
