import * as localforage from 'localforage';

export class StorageService {
  constructor() {
    localforage.config({
      driver: [
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE,
      ],
      name: 'storage',
      version: 1.0,
      storeName: 'Storage',
      description: '',
    });
  }
  getItem<T>(key: string): Promise<T | null> {
    return localforage.getItem<T>(key);
  }
  getItems(keys: string[]): Promise<any> {
    const promises = keys.map((item) => {
      return localforage.getItem(item);
    });

    return Promise.all(promises);
  }
  setItem<T = any>(key: string, data: T): Promise<T> {
    return localforage.setItem<T>(key, data);
  }
  removeItem(key: string): Promise<void> {
    return localforage.removeItem(key);
  }
  keys(): Promise<string[]> {
    return localforage.keys();
  }
  clear(): any {
    return localforage.clear();
  }
}

export const storage = new StorageService();
