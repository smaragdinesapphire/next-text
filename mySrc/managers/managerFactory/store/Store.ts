import Database from '../../../../submodules/jieKeys/mySrc/utils/database/Database';

type Key = number | string;

class Store {
  private _name: string;
  private _db: Database;

  constructor(name: string, db: Database) {
    this._name = name;
    this._db = db;
  }

  set(data: unknown): Promise<void> {
    return this._db.set(this._name, data);
  }

  get(key: Key): Promise<unknown> {
    return this._db.get(this._name, key);
  }

  getAll(): Promise<Array<unknown>> {
    return this._db.getAll(this._name);
  }

  has(key: Key): Promise<boolean> {
    return this._db.has(this._name, key);
  }

  delete(key: Key): Promise<void> {
    return this._db.delete(this._name, key);
  }

  clear(): Promise<void> {
    return this._db.clear(this._name);
  }
}

export default Store;
