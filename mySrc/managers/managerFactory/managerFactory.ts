import Database from '../../../submodules/jieKeys/mySrc/utils/database/Database';
import Store from './store/Store';
import upgradeMethod from './upgradeMethod/upgradeMethod';

export { Store };

const DB_NAME = 'COC7';

class ManagerFactory {
  private _db: Database;
  private _dbOnLine: boolean;

  constructor() {
    this._db = new Database({ name: DB_NAME, version: 1, upgradeMethod });
    this._dbOnLine = null;
  }

  openDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) reject({ type: 'support' });
      else {
        this._db
          .openDB()
          .then(() => (this._dbOnLine = true))
          .then(() => resolve())
          .catch(e => {
            this._dbOnLine = false;
            reject({ type: 'open', message: e.message });
          });
      }
    });
  }

  factory(storeName: string): Store {
    return this._dbOnLine ? new Store(storeName, this._db) : null;
  }
}

export default new ManagerFactory();
