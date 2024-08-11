import { Heap1, Heap2 } from "./lib/pkg";

type Heap = Heap1 | Heap2;

class _BinaryHeap<T, H extends Heap> {
    protected heap: H;

    constructor(heap: H) {
        this.heap = heap;
    }

    public len(): number {
        return this.heap.len();
    }

    public isEmpty(): boolean {
        return this.heap.is_empty();
    }

    public peek(): T | null {
        return this.isEmpty() ? null : this.heap.peek_unwrap();
    }

    public pop(): T | null {
        return this.isEmpty() ? null : this.heap.pop_unwrap();
    }

    public clear(): void {
        this.heap.clear();
    }
}

export class BinaryHeap<T> extends _BinaryHeap<T, Heap1> {
    constructor() {
        super(new Heap1());
    }

    public push(value: T, key: number): void {
        this.heap.push(value, key);
    }
}

export class BinaryHeapPair<T> extends _BinaryHeap<T, Heap2> {
    constructor() {
        super(new Heap2());
    }

    public push(value: T, key1: number, key2: number): void {
        this.heap.push(value, key1, key2);
    }
}
