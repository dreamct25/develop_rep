class IndexedDB {
    private db?: IDBDatabase
    private dbName: string
    private tableName: string

    constructor(dbName: string, tableName: string){
        this.dbName = dbName
        this.tableName = tableName
    }

    public async init(): Promise<void> {

        this.db = await new Promise<IDBDatabase>((resolve,reject) => {
        
            const connect = indexedDB.open(this.dbName, 2);

            connect.onupgradeneeded = () => {
                const db = connect.result

                if(!db.objectStoreNames.contains(this.tableName)) {
                    db.createObjectStore(this.tableName, { keyPath: 'id', autoIncrement: true });
                }
            };
        
            connect.onsuccess = () => resolve(connect.result);
            connect.onerror = () => reject('error')
        })
    }

    public async getAll<T>(): Promise<T>{

        return await new Promise<T>((resolve, reject) => {

            if(!this.db) {
                reject('error')
                return
            }

            const tx = this.db.transaction(this.tableName, 'readonly')
            const store = tx.objectStore(this.tableName)
            const req = store.getAll()

            req.onsuccess = () => resolve(req.result as T)
            req.onerror = () => reject('error')
            tx.onerror = () => reject('error')
        })
    }

    public async getSingle<T>(id: string | number): Promise<T | undefined> {

        return new Promise<T>((resolve, reject) => {

            if(!this.db) {
                reject('error')
                return
            }

            const tx = this.db.transaction(this.tableName, 'readonly');
            const store = tx.objectStore(this.tableName);
            const req = store.get(id);

            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
            tx.onerror = () => reject(tx.error);
        });
    }

    public async add<T>(data: T): Promise<boolean | DOMException | null> {

        return new Promise((resolve, reject) => {

            if(!this.db) {
                reject('error')
                return
            }

            const tx = this.db.transaction(this.tableName, 'readwrite');
            const store = tx.objectStore(this.tableName);
            const req = store.add(data);

            req.onsuccess = () => resolve(true);
            req.onerror = () => reject(req.error);
            tx.onerror = () => reject(tx.error);
        });
    }

    public async put<T>(data: T): Promise<boolean | DOMException | null> {

        return new Promise((resolve, reject) => {

            if(!this.db) {
                reject('error')
                return
            }

            const tx = this.db.transaction(this.tableName, 'readwrite');
            const store = tx.objectStore(this.tableName);
            const req = store.put(data);

            req.onsuccess = () => resolve(true);
            req.onerror = () => reject(req.error);
            tx.onerror = () => reject(tx.error);
        });
    }

    public async delete(id: string | number): Promise<boolean | DOMException | null> {

        return new Promise((resolve, reject) => {

            if(!this.db) {
                reject('error')
                return
            }

            const tx = this.db.transaction(this.tableName, 'readwrite');
            const store = tx.objectStore(this.tableName);
            const req = store.delete(id);

            req.onsuccess = () => resolve(true);
            req.onerror = () => reject(req.error);
            tx.onerror = () => reject(tx.error);
        });
    }
}

export default IndexedDB