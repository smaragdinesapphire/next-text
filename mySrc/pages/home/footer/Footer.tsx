import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { version } from '../../../../package.json';
import useTranslation from 'next-translate/useTranslation';
import ButtonBase from '@material-ui/core/ButtonBase';

const Footer = styled.footer`
  width: 100%;
  height: 40rem;
  line-height: 40rem;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
`;

const Text = styled.span`
  font-size: 15rem;
  color: #707070;
`;

const Title = styled(Text)`
  margin-right: 4rem;
`;

const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VersionBlock = styled(ButtonBase)`
  font-size: 15rem;
  height: 100%;
  padding: 0 8rem;
  display: flex;
  align-items: center;
  position: absolute;
  right: 10rem;
  color: #707070;

  &:hover {
    color: white;
  }
`;

interface Props {
  className?: string;
  onVersionClick: MouseEventHandler;
}

const Component: React.FC<Props> = ({ className, onVersionClick }) => {
  const { t } = useTranslation('home');
  return (
    <Footer className={className}>
      <Block>
        <Title>{t('ref')}:</Title>
        <Text onClick={e => e.stopPropagation()}>
          <a href="http://coctrpg.tiddlyspot.com/" target="_blank" rel="noreferrer">
            洪偉的跑團工具
          </a>
        </Text>
      </Block>
      <VersionBlock onClick={onVersionClick}>{`${t('version')}: ${version}`}</VersionBlock>
    </Footer>
  );
};

export default Component;
