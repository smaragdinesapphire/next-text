import { UpgradeMethod } from '../../../../submodules/jieKeys/mySrc/utils/database/Database';

const upgradeMethod: UpgradeMethod = e => {
  if (e.oldVersion < 1) {
    // config
    (<IDBRequest>e.target).result.createObjectStore('config', { keyPath: 'id', autoIncrement: true });
  }
};

export default upgradeMethod;
