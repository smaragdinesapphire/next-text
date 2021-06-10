import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import styled from 'styled-components';

const Frame = styled.div`
  user-select: none;
`;

const Button = styled.div`
  border: 1px solid black;
  padding: 4px;
  background-color: yellow;
  position: fixed;
  bottom: 20px;
`;

const PrevButton = styled(Button)`
  left: 20px;
`;
const NextButton = styled(Button)`
  right: 20px;
`;

interface Props {
  nextUrl?: string;
  prevUrl?: string;
  children: React.ReactNode;
}

const PageFrame: React.FC<Props> = ({ nextUrl, prevUrl, children }) => {
  const { t } = useTranslation('common');
  const prefixCls = 'page-frame';
  return (
    <Frame className={prefixCls}>
      {children}
      {prevUrl && (
        <PrevButton className={`${prefixCls}__prev`}>
          <Link href={prevUrl}>{t('prev_page')}</Link>
        </PrevButton>
      )}
      {nextUrl && (
        <NextButton className={`${prefixCls}__next`}>
          <Link href={nextUrl}>{t('next_page')}</Link>
        </NextButton>
      )}
    </Frame>
  );
};

export default PageFrame;
