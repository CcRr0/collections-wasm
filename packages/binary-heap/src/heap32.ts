import { Heap32_1, Heap32_2 } from "./lib/pkg";

type Heap32 = Heap32_1 | Heap32_2;

class _BinaryHeap<T, H extends Heap32> {
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

export class BinaryHeapInt32<T> extends _BinaryHeap<T, Heap32_1> {
    constructor() {
        super(new Heap32_1());
    }

    public push(value: T, key: number): void {
        this.length += 1;
        this.heap.push(value, key);
    }
}

export class BinaryHeapInt32Pair<T> extends _BinaryHeap<T, Heap32_2> {
    constructor() {
        super(new Heap32_2());
    }

    public push(value: T, key1: number, key2: number): void {
        this.length += 1;
        this.heap.push(value, key1, key2);
    }
}
