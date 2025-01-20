class IndexedDB {
    private static db: IDBDatabase

    public static initializeIndexedDB(): Promise<string> {

        return new Promise((resolve,reject) => {
            const dbName = 'ImageDataDB';
            const storeName = 'images';
        
            const connect = indexedDB.open(dbName, 2);

            connect.onupgradeneeded = ({ target }:Record<string,any>) => {
                IndexedDB.db = target.result as IDBDatabase;
                // 創建 "images" 對象存儲
                IndexedDB.db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
            };
        
            connect.onsuccess = ({ target }:Record<string,any>) => {
                IndexedDB.db = target.result as IDBDatabase;
                resolve('success')
            };
        
            connect.onerror = () => {
                reject('error')
            }
        })
    }

    public static readFromIndexedDB(): Promise<any>{

        return new Promise((resolve,reject) => {

            const storeName = 'images';
            const transaction = IndexedDB.db.transaction([storeName], 'readonly');
            const objectStore = transaction.objectStore(storeName);
            const request = objectStore.openCursor();
        
            request.onsuccess = ({ target }:Record<string,any>) => {
                const cursor = target.result as IDBCursorWithValue;
                
                if (cursor) {
                    const { data:binaryData } = cursor.value;
                    resolve(binaryData)
                    return
                }
        
                resolve(undefined)
            };
        
            // transaction.oncomplete = () => {
            //     console.log('Transaction completed');
            // };
        
            transaction.onerror = ({ target }:Record<string,any>) => {
                reject(`Transaction error: ${target.error}`)
            };
        })
    }

    public static saveToIndexedDB(binaryData:ArrayBuffer): Promise<any> {

        return new Promise((resolve,reject) => {

            const storeName = 'images';
            const transaction = IndexedDB.db.transaction([storeName], 'readwrite');
            const objectStore = transaction.objectStore(storeName);
        
            const saveData = { id: 1,data: binaryData };
        
            const countRequest = objectStore.count();
            
            countRequest.onsuccess = () => {
                if(countRequest.result > 0) objectStore.delete(1)
        
                const request = objectStore.put(saveData);
        
                request.onsuccess = () => {
                    resolve('')
                    // console.log('add success')
                };
        
                transaction.onerror = ({ target }:Record<string,any>) => {
                    reject(`Transaction error: ${target.error}`)
                };
            };
        
            countRequest.onerror = ({ target }:Record<string,any>) => reject(`get result faild error: ${target.error}`)
        })
    }
}

export default IndexedDB