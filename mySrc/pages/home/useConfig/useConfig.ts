import { useContext, useState, useEffect, useCallback } from 'react';
import ManagerContext from '../../../contexts/ManagerContext';

interface Error {
  message: string;
  type: 'setKeepShow';
}

interface UseConfig {
  keepShow: boolean;
  setKeepShow: (value: boolean) => void;
  error: Error;
  processing: boolean;
}

const useConfig = (DBLoading: boolean): UseConfig => {
  const { configManager } = useContext(ManagerContext);
  const [keepShowState, setKeepShowState] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (DBLoading === false) setKeepShowState(configManager.getKeepShow());
  }, [DBLoading]);

  const setKeepShow = useCallback(value => {
    setProcessing(true);
    configManager
      .setKeepShow(value)
      .then(() => setKeepShowState(value))
      .then(() => setError(null))
      .catch(e =>
        setError({
          type: 'setKeepShow',
          message: e.message,
        })
      )
      .finally(() => setProcessing(false));
  }, []);

  return { keepShow: keepShowState, setKeepShow, error, processing };
};

export default useConfig;
