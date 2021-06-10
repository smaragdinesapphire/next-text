import { useState, useCallback } from 'react';
import axios from 'axios';
import api from '../../../services/api.json';
import useTranslation from 'next-translate/useTranslation';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

interface ChangeLogData {
  id: string;
  title: string;
  contentHtml: string;
}
interface ChangeLogDatas {
  total: number;
  data: Array<ChangeLogData>;
}

interface ReturnObj {
  loading: boolean;
  changeLogs: ChangeLogDatas;
  fetchChangeLogs: (page: number) => void;
  cancel: () => void;
}

interface useChangeLog {
  (): ReturnObj;
}

const useChangeLog: useChangeLog = () => {
  const [changeLogs, setChangeLogs] = useState({ total: 0, data: [] });
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const fetchChangeLogs = useCallback((page: number) => {
    setLoading(true);
    axios
      .get(api.getChangeLog, {
        params: {
          page,
          pitem: 100,
        },
      })
      .then(response => setChangeLogs(response.data))
      .catch(e => {
        setChangeLogs({
          total: 0,
          data: [
            { title: t('common:error'), contentHtml: `<p>${t('message:try-again-later')}</p><p>${e.message}</p>` },
          ],
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const cancel = useCallback(() => source.cancel(), []);

  return { fetchChangeLogs, loading, changeLogs, cancel };
};

export default useChangeLog;
