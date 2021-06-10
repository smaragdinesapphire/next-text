import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import PageFrame from '../../mySrc/components/common/pageFrame/PageFrame';

const Base: React.FunctionComponent<null> = () => {
  const { t } = useTranslation('base');
  return (
    <PageFrame prevUrl="/">
      <div>
        <h1>{t('base')}</h1>
        <p>{t('content')}</p>
      </div>
    </PageFrame>
  );
};

export default Base;
