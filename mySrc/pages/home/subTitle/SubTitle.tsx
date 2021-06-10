import React, { useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

interface Prosp {
  className?: string;
}

const SubTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubTitleStr = styled(animated.div)`
  font-size: 20rem;
  line-height: 30rem;
`;

const Component: React.FC<Prosp> = ({ className }) => {
  const { t } = useTranslation('home');

  const lineProps = useMemo(() => ({ from: { opacity: 0 }, to: { opacity: 1 }, config: { duration: 1500 } }), []);
  const line1Props = useSpring(lineProps);
  const line2Props = useSpring({ ...lineProps, delay: 500 });

  return (
    <SubTitle className={className}>
      <SubTitleStr style={line1Props}>{t('sub-title-1')}</SubTitleStr>
      <SubTitleStr style={line2Props}>{t('sub-title-2')}</SubTitleStr>
    </SubTitle>
  );
};

export default Component;
