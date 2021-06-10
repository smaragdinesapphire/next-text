import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import styled from 'styled-components';
import { StylesProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import autoRestBaseUnit from '../mySrc/utils/autoRestBaseUnit';
import themeConfig from '../mySrc/configs/themeConfig';
import Alert from '../mySrc/components/common/alert/Alert';
import useTranslation from 'next-translate/useTranslation';
import prepareDB from '../mySrc/utils/prepareDB';
import ManagerContext, { managers } from '../mySrc/contexts/ManagerContext';
import '../styles/globals.scss';

interface HandleContextMenu {
  (e: MouseEvent): void;
}

const Container = styled.div`
  width: 1280rem;
  height: 720rem;
  overflow: hidden;
`;

const theme = createMuiTheme(themeConfig);

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [DBLoading, setDBLoading] = useState(true);
  const [showDBOpenFail, setShowDBOpenFail] = useState(false);
  const [showNoSupportDB, setShowNoSupportDB] = useState(false);

  useEffect(() => {
    const handleContextMenu: HandleContextMenu = e => e.preventDefault();
    window.addEventListener('contextmenu', handleContextMenu);
    autoRestBaseUnit.start();
    return () => {
      autoRestBaseUnit.stop();
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  useEffect(() => {
    prepareDB()
      .then(() => setDBLoading(false))
      .catch(({ type }) => {
        switch (type) {
          case 'open':
          case 'load':
            setShowDBOpenFail(true);
            break;
          case 'support':
            setShowNoSupportDB(true);
            break;
        }
      });
  }, []);

  const { t } = useTranslation();
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>COC7 工具</title>
        <meta
          name="description"
          content="Author: KingJ, Description: The tool of the TRPG call of cthulhu 7. 作者: KingJ, 敘述: TRPG - 克蘇魯的呼喚 7版輔助工具"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <ManagerContext.Provider value={managers}>
            <CssBaseline>
              <Container>
                <Component {...pageProps} DBLoading={DBLoading} />
              </Container>
              <Alert
                open={showDBOpenFail}
                title={t('common:warning')}
                content={t('message:db-open-fail')}
                onClose={() => window.location.reload()}
              />
              <Alert
                open={showNoSupportDB}
                title={t('common:warning')}
                content={t('message:db-no-support')}
                buttons={() => {
                  return null;
                }}
              />
            </CssBaseline>
          </ManagerContext.Provider>
        </StylesProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
