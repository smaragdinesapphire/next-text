import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

interface Props {
  className?: string;
  title: React.ReactNode;
}

const Log = styled.div`
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 24rem;
  }
`;

const LogTitle = styled.div`
  width: 90%;
  font-size: 20rem;
  padding-bottom: 3rem;
  margin-bottom: 16rem;
  border-bottom: 1rem solid #eaecef;
`;

const LogContent = styled.div`
  width: 100%;
`;

const Component: React.FC<Props> = ({ className, title, children }) => {
  const prefixCls = 'log';

  return (
    <Log className={classnames(prefixCls, className)}>
      <LogTitle className={`${prefixCls}__title`}>{title}</LogTitle>
      <LogContent className={`${prefixCls}__content`}>{children}</LogContent>
    </Log>
  );
};

export default Component;
