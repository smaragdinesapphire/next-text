import React from 'react';
import {
  Button as MuiButton,
  Dialog as MuiDialog,
  DialogTitle as MuiDialogTitle,
  Slide,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import useTranslation from 'next-translate/useTranslation';
import styled from 'styled-components';
import classnames from 'classnames';

interface Props {
  className?: string;
  title?: React.ReactNode;
  open: boolean;
  dialogActions?: React.ReactNode;
  onClose: () => void;
}

const Dialog = styled(MuiDialog)`
  .MuiDialog-paper {
    background-image: url('./backgrounds/background_480x200.png');
  }
`;

interface DialogTitle {
  hasTitle: boolean;
}
const DialogTitle = styled(MuiDialogTitle)<DialogTitle>`
  margin: 0;
  padding: ${props => (props.hasTitle ? '20rem 16rem 16rem' : '20rem 0rem 0rem')};
  font-size: 30rem;
  line-height: 30rem;
`;

const DialogContent = styled(MuiDialogContent)`
  margin: 0;
  padding: 0 16rem;
`;

const DialogActions = styled(MuiDialogActions)`
  margin: 0;
  padding: 16rem 16rem 20rem;
  display: flex;
  justify-content: center;
`;

const Button = styled(MuiButton)`
  width: 110rem;
  height: 30rem;
  padding: 0 8rem;
  border-color: #707070;
  border-width: 1rem;

  &:hover {
    border-color: white;
  }
  .MuiButton-label {
    font-size: 20rem;
    line-height: 30rem;
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    &:hover {
      color: white;
    }
  }
`;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Component: React.FC<Props> = ({ className, title, open, children, dialogActions, onClose }) => {
  const { t } = useTranslation('common');
  const hasTitle = title !== null && title !== undefined;

  const prefixCls = 'dialog';

  return (
    <Dialog className={classnames(className, prefixCls)} TransitionComponent={Transition} onClose={onClose} open={open}>
      <DialogTitle className={`${prefixCls}__title`} hasTitle={hasTitle} disableTypography>
        {title}
      </DialogTitle>
      <DialogContent className={`${prefixCls}__context`}>{children}</DialogContent>
      <DialogActions className={`${prefixCls}__actions`}>
        {dialogActions ? (
          dialogActions
        ) : (
          <Button onClick={onClose} variant="outlined">
            {t('close')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Component;
