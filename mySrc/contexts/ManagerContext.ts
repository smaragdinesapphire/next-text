import React from 'react';

import configManager from '../managers/configManager/configManager';

const managers = {
  configManager,
};

const ManagerContext = React.createContext(managers);

export { managers };
export default ManagerContext;
