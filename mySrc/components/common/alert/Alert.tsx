import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';

interface Props {
  open: boolean;
  title?: React.ReactNode;
  content: React.ReactNode;
  buttons?: (node: React.ReactNode) => React.ReactNode;
  onClose?: () => void;
}

const Alert: React.FC<Props> = ({ open, title, content, buttons, onClose }) => {
  const { t } = useTranslation('common');

  const defaultButtons = (
    <Button onClick={onClose} color="primary">
      {t('ok')}
    </Button>
  );
  const actions = typeof buttons === 'function' ? buttons(defaultButtons) : defaultButtons;

  return (
    <Dialog open={open}>
      <DialogTitle>{title ? title : t('warning')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};

export default Alert;
