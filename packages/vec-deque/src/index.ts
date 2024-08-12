import { Deque } from "./lib/pkg";

export class VecDeque<T> {
    private deque: Deque = new Deque();
    public length: number = 0;

    public reserve(additional: number): void {
        this.deque.reserve(additional);
    }

    public isEmpty(): boolean {
        return this.length === 0;
    }

    public peekFront(): T | null {
        return this.length === 0 ? null : this.deque.front_unwrap() as T;
    }

    public peekBack(): T | null {
        return this.length === 0 ? null : this.deque.back_unwrap() as T;
    }

    public pushFront(value: T): void {
        this.length += 1;
        this.deque.push_front(value);
    }

    public pushBack(value: T): void {
        this.length += 1;
        this.deque.push_back(value);
    }

    public popFront(): T | null {
        if (this.length === 0) {
            return null;
        }
        this.length -= 1;
        return this.deque.pop_front_unwrap() as T;
    }

    public popBack(): T | null {
        if (this.length === 0) {
            return null;
        }
        this.length -= 1;
        return this.deque.pop_back_unwrap() as T;
    }
}
