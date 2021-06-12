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
import { Button } from '@material-ui/core';

interface HandleContextMenu {
  (e: MouseEvent): void;
}

const Container = styled.div`
  width: 1280rem;
  height: 720rem;
  overflow: hidden;
`;

const theme = createMuiTheme(themeConfig);

/**
 * The BeforeInstallPromptEvent is fired at the Window.onbeforeinstallprompt handler
 * before a user is prompted to "install" a web site to a home screen on mobile.
 *
 * @deprecated Only supported on Chrome and Android Webview.
 */
interface BeforeInstallPromptEvent extends Event {
  /**
   * Returns an array of DOMString items containing the platforms on which the event was dispatched.
   * This is provided for user agents that want to present a choice of versions to the user such as,
   * for example, "web" or "play" which would allow the user to chose between a web version or
   * an Android version.
   */
  readonly platforms: Array<string>;

  /**
   * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
   */
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;

  /**
   * Allows a developer to show the install prompt at a time of their own choosing.
   * This method returns a Promise.
   */
  prompt(): Promise<void>;
}

function openCreatePostModal(installEvent: BeforeInstallPromptEvent, setInstallEvent): void {
  if (installEvent) {
    installEvent.prompt();
    installEvent.userChoice.then(function (choiceResult) {
      console.log(choiceResult.outcome);
      if (choiceResult.outcome == 'dismissed') console.log('使用者取消安裝');
      else console.log('使用者安裝');
    });
    setInstallEvent(null);
  }
}

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [DBLoading, setDBLoading] = useState(true);
  const [showDBOpenFail, setShowDBOpenFail] = useState(false);
  const [showNoSupportDB, setShowNoSupportDB] = useState(false);
  const [installEvent, setInstallEvent] = useState(null);

  useEffect(() => {
    const handleContextMenu: HandleContextMenu = e => e.preventDefault();
    window.addEventListener('contextmenu', handleContextMenu);
    autoRestBaseUnit.start();
    window.addEventListener('beforeinstallprompt', event => {
      // Prevent Chrome <= 67 from automatically showing the prompt
      event.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallEvent(event);
      return false;
    });
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
                <Button onClick={() => openCreatePostModal(installEvent, setInstallEvent)}>Click</Button>
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
