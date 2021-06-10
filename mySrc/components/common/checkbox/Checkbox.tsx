import styled from 'styled-components';
import { Checkbox as MuiCheckBox, FormControlLabel as MuiFormControlLabel } from '@material-ui/core';
import { CheckboxProps } from '@material-ui/core/Checkbox';

const Checkbox = styled(MuiCheckBox)`
  padding: 8rem;
  .MuiSvgIcon-root {
    font-size: 20rem;
  }
`;

const FormControlLabel = styled(MuiFormControlLabel)`
  .MuiFormControlLabel {
    &-label {
      font-size: 18rem;
    }
    &-root {
      margin-left: 8rem;
    }
  }
  .Mui-disabled {
    color: #625f5f;
  }
`;

interface Props extends CheckboxProps {
  label?: string | number;
  disabled?: boolean;
}

const Component: React.FC<Props> = props => {
  const { disabled = false, label, ...checkboxProps } = props;
  return <FormControlLabel disabled={disabled} control={<Checkbox {...checkboxProps} />} label={label} />;
};
export default Component;
