import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import Dialog from '../../../components/common/dialog/Dialog';
import Logs, { ChangeLogData } from './logs/Logs';
import Checkbox from '../../../components/common/checkbox/Checkbox';

interface Props {
  disableKeepShow: boolean;
  open: boolean;
  page: number;
  totalLogs: number;
  changeLogDatas: Array<ChangeLogData>;
  loading: boolean;
  processing: boolean;
  showErrorMessage: boolean;
  onPageChange: (pageNum: number) => void;
  onClose: () => void;
  onOk: (keepShow: boolean) => void;
}

const CheckBoxArea = styled.div`
  display: flex;
  align-items: center;
`;

const ErrorMessage = styled.span`
  color: red;
`;

const ChangeLogDialog: React.FC<Props> = ({
  disableKeepShow = false,
  open,
  page,
  totalLogs,
  loading,
  processing,
  changeLogDatas,
  showErrorMessage,
  onPageChange,
  onOk,
  onClose,
}) => {
  const { t } = useTranslation('home');
  const [keepShow, setKeepShow] = useState(disableKeepShow);
  const dialogActions = useMemo(
    () => (
      <Button disabled={processing} onClick={() => onOk(keepShow)} variant="outlined">
        {t('common:ok')}
      </Button>
    ),
    [onOk, t, keepShow, processing]
  );
  useEffect(() => {
    if (open) setKeepShow(disableKeepShow === false);
  }, [open, disableKeepShow]);
  return (
    <Dialog title={t('change-log-dialog-title')} onClose={onClose} dialogActions={dialogActions} open={open}>
      <Logs
        disabled={processing}
        totalLogs={totalLogs}
        page={page}
        changeLogDatas={changeLogDatas}
        loading={loading}
        onPageChange={onPageChange}
      />
      <CheckBoxArea>
        <Checkbox
          disabled={processing}
          label={t('display-after-update')}
          checked={keepShow === false}
          onChange={() => setKeepShow(prev => !prev)}
        />
      </CheckBoxArea>
      {showErrorMessage && <ErrorMessage>{t('message:try-again-later')}</ErrorMessage>}
    </Dialog>
  );
};

export default ChangeLogDialog;
