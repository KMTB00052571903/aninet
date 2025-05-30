type Callback = (payload: any) => void;

export class Dispatcher {
    private callbacks: Map<number, Callback> = new Map();
    private lastId: number = 1;

    register(callback: Callback): number {
        const id = this.lastId++;
        this.callbacks.set(id, callback);
        return id;
    }

    unregister(id: number): void {
        this.callbacks.delete(id);
    }

    dispatch(payload: any): void {
        for (const callback of this.callbacks.values()) {
            callback(payload);
        }
    }

    clear(): void {
        this.callbacks.clear();
    }
}

export default new Dispatcher();