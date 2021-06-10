import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import useTranslation from 'next-translate/useTranslation';
import ButtonBase from '@material-ui/core/ButtonBase';

const ClickStart = styled(animated.span)`
  overflow: hidden;
  white-space: nowrap;
  font-size: 32rem;
`;

const Option = styled(ButtonBase)`
  border-radius: 32rem;
  color: ${props => (props.disabled ? '#625F5F' : '#B6B6B6')};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  overflow: hidden;
  white-space: nowrap;
  font-size: 28rem;
  padding: 8rem;
  &:hover {
    color: ${props => (props.disabled ? '#625F5F' : 'white')};
  }
`;

type ModeType = 'tip' | 'menu';

type OptionType = 'new' | 'load' | 'option';

interface Props {
  className?: string;
  mode: ModeType;
  disableLoad: boolean;
  onSelected: (option: OptionType) => void;
}

interface MenuOption {
  text: string;
  value: OptionType;
  disable?: boolean;
}

const Options = styled.div`
  padding: 8rem 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const Component: React.FC<Props> = ({ className, mode, disableLoad, onSelected }) => {
  const [flip, set] = useState(false);
  const { t } = useTranslation('home');
  const clickStartProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
    reverse: flip,
    delay: 200,
    onRest: () => set(!flip),
  });

  const menuOptions = useMemo<Array<MenuOption>>(
    () => [
      { text: t('new-character'), value: 'new' },
      { text: t('load-character'), value: 'load', disable: disableLoad },
      { text: t('options'), value: 'option' },
    ],
    [t, disableLoad]
  );

  return mode === 'tip' ? (
    <ClickStart className={className} style={clickStartProps}>
      {t('please-click')}
    </ClickStart>
  ) : (
    <Options>
      {menuOptions.map(({ text, value, disable }) => {
        return (
          <Option key={value} disabled={disable} onClick={() => onSelected(value)}>
            {text}
          </Option>
        );
      })}
    </Options>
  );
};

export default Component;
