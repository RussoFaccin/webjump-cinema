import { idbConfig } from './idb.config';
// Models
import { Movie } from '../models/Movie.model';

const {
    DB_NAME,
    STORE_LIST
} = idbConfig;
/**
 * Idb service
 */
export class Idb {
    constructor() {
        if (this.checkSupport()) {
            this.openDB(DB_NAME);
        }
    }
    checkSupport() {
        if (!window.indexedDB) {
            console.warn("Your browser doesn't support a stable version of IndexedDB. Some features will not be available.");
            return false;
        }

        return true;
    }
    openDB(dbName) {
        return new Promise((resolve, reject) => {
            const openRequest = indexedDB.open(dbName);

            openRequest.addEventListener('success', () => {
                this._idb = openRequest.result;
                resolve(openRequest.result);
            });
    
            openRequest.addEventListener('error', (err) => {
                console.error('Unable to open IDB', err);
                reject(err);
            });
    
            openRequest.addEventListener('upgradeneeded', () => {
                this._idb = openRequest.result;
    
                this.createStores();
            });
        });
    }
    createStores() {
        for (const storeName of STORE_LIST.values()) {
            this._idb.createObjectStore(storeName, {
                keyPath: 'id',
                autoIncrement: false
            }).createIndex('title', 'title', {
                unique: false
            });    
        }
    }
    /**
     * Get data from IndexedDB
     * @param {String} storeKey 
     */
    async getData(storeKey) {
        await this.openDB(DB_NAME);

        return new Promise((resolve, reject) => {
            const transaction = this._idb.transaction(STORE_LIST.get(storeKey))
                .objectStore(STORE_LIST.get(storeKey))
                .getAll();

            transaction.addEventListener('success', (evt) => {
                resolve(transaction.result)
            });

            transaction.addEventListener('error', (evt) => {
                reject('Unable to get data', err)
            });
        });
    }
    /**
     * Insert data into IndexedDB
     * @param {Array<object>} data 
     * @param {String} storeKey 
     */
    async putData(data, storeKey) {
        await this.openDB(DB_NAME);

        await this._clearData(storeKey);

        // put data
        data.forEach((entry) => {
            this._idb.transaction(STORE_LIST.get(storeKey), 'readwrite')
                .objectStore(STORE_LIST.get(storeKey))
                .put(new Movie(entry));
        });
    }

    /**
     * Clear previous store data
     * @param {String} storeKey 
     */
    _clearData(storeKey) {
        return new Promise((resolve, reject) => {
            const transaction = this._idb.transaction(STORE_LIST.get(storeKey), 'readwrite');
            const objectStore = transaction.objectStore(STORE_LIST.get(storeKey));
            const request = objectStore.clear();

            request.addEventListener('success', (evt) => {
                resolve(request.result);
            });

            request.addEventListener('error', (evt) => {
                reject(request.error);
            })
        });
    }
}