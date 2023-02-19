export type Dictionary<T> = { [x: string]: T };

export class Collector<T> {
    private collection: Map<string, T>;

    constructor() {
        this.collection = new Map<string, T>();
    }

    public put = (name: string, item: T) => this.collection.set(name, item);
    public get = (name: string) => this.collection.get(name);
    public has = (name: string) => this.collection.has(name);
}
