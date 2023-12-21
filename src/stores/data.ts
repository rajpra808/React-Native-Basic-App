import {makeAutoObservable} from 'mobx';
import {hydrateStore, makePersistable, clearPersistedStore} from 'mobx-persist-store';

export class DataStore implements IStore {
  value:any = {};

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: DataStore.name,
      properties: ['value'],
    });
  }

  // Unified set methods
  set<T extends StoreKeysOf<DataStore>>(what: T, value: DataStore[T]) {
    (this as DataStore)[what] = value;
  }
  setMany<T extends StoreKeysOf<DataStore>>(obj: Record<T, DataStore[T]>) {
    for (const [k, v] of Object.entries(obj)) {
      this.set(k as T, v as DataStore[T]);
    }
  }

  // Hydration
  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };

  async clearStoredData() {
    console.log("*****Clearing*******")
    await clearPersistedStore(this);
  }
}
