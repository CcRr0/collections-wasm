import { Heap1, Heap2 } from "./lib/pkg";

type Heap = Heap1 | Heap2;

class BinaryHeap<T, H extends Heap> {
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

export class BinaryHeap1<T> extends BinaryHeap<T, Heap1> {
    public push(value: T, key: number): void {
        this.heap.push(value, key);
    }
}

export class BinaryHeap2<T> extends BinaryHeap<T, Heap2> {
    public push(value: T, key1: number, key2: number): void {
        this.heap.push(value, key1, key2);
    }
}
