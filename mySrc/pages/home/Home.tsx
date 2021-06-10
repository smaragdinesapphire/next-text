import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import OriginFooter from './footer/Footer';
import OriginSubTitle from './subTitle/SubTitle';
import ClickStart from './clickStart/ClickStart';
import ChangeLogDialog from './changeLogDialog/ChangeLogDialog';
import useChangeLog from './useChangeLog/useChangeLog';
import useConfig from './useConfig/useConfig';
import Image from 'next/image';

interface Props {
  DBLoading: boolean;
}

const Home = styled.main`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.div`
  position: relative;
  margin-top: 150rem;
  width: 880rem;
  height: 240rem;
`;

const Footer = styled(OriginFooter)`
  position: absolute;
  bottom: 0;
`;
const SubTitle = styled(OriginSubTitle)`
  position: relative;
  margin-top: 30rem;
`;
const ClickStartContainer = styled.div`
  height: 200rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type ModeType = 'tip' | 'menu';

const HomePage: React.FC<Props> = ({ DBLoading }) => {
  const [showVersionDialog, setShowVersionDialog] = useState<boolean | null>(null);
  const [mode, setMode] = useState<ModeType>('tip');
  const [page, setPage] = useState(1);
  const { fetchChangeLogs, loading, cancel, changeLogs } = useChangeLog();
  const { keepShow, setKeepShow, processing, error } = useConfig(DBLoading);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const handleVersionClick = useCallback(e => {
    e.stopPropagation();
    setPage(1);
    setShowVersionDialog(true);
  }, []);

  const handleClick = useCallback(() => setMode('menu'), []);
  const handleSelected = useCallback(selected => {
    console.log(selected);
  }, []);
  const handleOk = useCallback(value => setKeepShow(value), []);
  const handleCloseVersionDialog = useCallback(() => {
    if (processing) return undefined;
    setShowErrorMessage(false);
    setShowVersionDialog(false);
  }, [processing]);
  useEffect(() => {
    if (showVersionDialog) fetchChangeLogs(page);
    return () => cancel();
  }, [page, showVersionDialog, fetchChangeLogs, cancel]);

  useEffect(() => {
    if (keepShow !== null && showVersionDialog === null) setShowVersionDialog(keepShow);
  }, [keepShow]);

  useEffect(() => {
    if (processing === false) {
      if (error && showVersionDialog === false) setShowErrorMessage(true);
      else if (showVersionDialog === true) {
        setShowErrorMessage(false);
        setShowVersionDialog(false);
      }
    }
  }, [processing, error]);

  return (
    <>
      <Home onClick={handleClick}>
        <Image src="/backgrounds/background.jpg" alt="Background" layout="fill" loading="eager" quality={100} />
        <Logo>
          <Image src="/icons/LOGO.png" alt="Logo" layout="fill" loading="eager" />
        </Logo>
        <SubTitle />
        {DBLoading === false && (
          <>
            <ClickStartContainer>
              <ClickStart mode={mode} disableLoad onSelected={handleSelected} />
            </ClickStartContainer>
            <Footer onVersionClick={handleVersionClick} />
          </>
        )}
      </Home>
      <ChangeLogDialog
        processing={processing}
        disableKeepShow={keepShow === false}
        open={showVersionDialog === true}
        page={page}
        totalLogs={changeLogs.total}
        changeLogDatas={changeLogs.data}
        loading={loading}
        showErrorMessage={showErrorMessage}
        onPageChange={newPage => setPage(newPage)}
        onClose={handleCloseVersionDialog}
        onOk={handleOk}
      />
    </>
  );
};

export default HomePage;
