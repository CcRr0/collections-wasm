import { Deque } from "./lib/pkg";

export class VecDeque<T> {
    private deque: Deque = new Deque();

    public len(): number {
        return this.deque.len();
    }

    public isEmpty(): boolean {
        return this.deque.is_empty();
    }

    public peekFront(): T | null {
        return this.isEmpty() ? null : this.deque.front_unwrap();
    }

    public peekBack(): T | null {
        return this.isEmpty() ? null : this.deque.back_unwrap();
    }

    public pushFront(value: T): void {
        this.deque.push_front(value);
    }

    public pushBack(value: T): void {
        this.deque.push_back(value);
    }

    public popFront(): T | null {
        return this.isEmpty() ? null : this.deque.pop_front_unwrap();
    }

    public popBack(): T | null {
        return this.isEmpty() ? null : this.deque.pop_back_unwrap();
    }
}
