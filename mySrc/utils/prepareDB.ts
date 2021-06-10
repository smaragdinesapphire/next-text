import managerFactory from '../managers/managerFactory/managerFactory';
import configManager from '../managers/configManager/configManager';

const MANAGERS = [configManager];

const allManagerLoad = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    Promise.all(MANAGERS.map(manager => manager.load()))
      .then(() => {
        resolve();
      })
      .catch(e => {
        reject({ type: 'load', message: e.massage });
      });
  });
};

const prepareDB = async (): Promise<void> => {
  await managerFactory.openDB();
  await allManagerLoad();
};

export default prepareDB;
