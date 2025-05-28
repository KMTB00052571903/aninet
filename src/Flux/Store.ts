export type Listener<T> = (state: T) => void;

export class Store<T> {
    private state: T;
    private listeners: Listener<T>[] = [];

    constructor(initialState: T) {
        this.state = initialState;
    }

    getState(): T {
        return this.state;
    }

    setState(newState: T): void {
        this.state = newState;
        this.emit();
    }

    subscribe(listener: Listener<T>): () => void {
        this.listeners.push(listener);
        // Call the listener immediately with current state
        listener(this.state);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private emit(): void {
        for (const listener of this.listeners) {
            listener(this.state);
        }
    }
}