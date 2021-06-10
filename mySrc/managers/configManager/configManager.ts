import managerFactory, { Store } from '../managerFactory/managerFactory';
import { CONFIG } from '../../constants';
import { version } from '../../../package.json';
import { convertString2Arr, compareVersionArr } from '../../utils/versionUnits';

interface Config {
  id: 0;
  showChangeLog: boolean;
  version: string;
}

const DEFAULT_CONFIG: Config = {
  id: 0,
  showChangeLog: true,
  version,
};

class ConfigManager {
  private _store: Store;
  private _config: Config;

  constructor() {
    this._config = null;
    this._store = null;
  }

  static checkNewVersion = (current: string, prev: string): boolean => {
    const versions = [current, prev];
    const [currArr, prevArr] = versions.map(version => convertString2Arr(version));
    return compareVersionArr(currArr, prevArr) === -1;
  };

  load(): Promise<void> {
    this._store = managerFactory.factory(CONFIG);
    return new Promise((resolve, reject) => {
      this._store
        .get(0)
        .then((config: Config) => (this._config = { ...DEFAULT_CONFIG, ...config }))
        .then(
          () =>
            (this._config = {
              ...this._config,
              showChangeLog:
                this._config.showChangeLog ||
                ConfigManager.checkNewVersion(DEFAULT_CONFIG.version, this._config.version),
              version: DEFAULT_CONFIG.version,
            })
        )
        .then(() => resolve())
        .catch(e => reject(e));
    });
  }

  getKeepShow(): boolean {
    return this._config.showChangeLog;
  }

  setKeepShow(value: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      const config = {
        ...this._config,
        showChangeLog: value,
      };
      this._store
        .set(config)
        .then(() => {
          this._config = config;
        })
        .then(() => resolve())
        .catch(e => reject(e));
    });
  }
}

export default new ConfigManager();
