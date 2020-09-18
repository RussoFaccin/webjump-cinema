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
        this._isReady = false;
        
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
        this._idb = new Promise((resolve, reject) => {
            const openRequest = indexedDB.open(dbName);

            openRequest.addEventListener('success', () => {
                this._idb = openRequest.result;
                this._isReady = true;
                resolve(true);
            });
    
            openRequest.addEventListener('error', (err) => {
                console.error('Unable to open IDB', err);
                reject(err);
            });
    
            openRequest.addEventListener('upgradeneeded', () => {
                this._idb = openRequest.result;
                this._isReady = true;
    
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
        await this._idb;

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
        await this._idb;
        
        // Clear previous data
        this._idb.transaction(STORE_LIST.get(storeKey), 'readwrite')
            .objectStore(STORE_LIST.get(storeKey))
            .clear();

        // put data
        data.forEach((entry) => {
            this._idb.transaction(STORE_LIST.get(storeKey), 'readwrite')
                .objectStore(STORE_LIST.get(storeKey))
                .put(new Movie(entry));
        });
    }
}