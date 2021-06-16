import { ThemeOptions } from '@material-ui/core';

/**
 * Глобальные стили страниц.
 */
const MuiFormControl: ThemeOptions = {
  overrides: {
    MuiFormControl: {
      root: {
        display: 'flex',
      },
    },
  },
};

export default MuiFormControl;
