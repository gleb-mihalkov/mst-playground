import { createMuiTheme } from '@material-ui/core';
import merge from 'deepmerge';

import { MuiCssBaseline } from './MuiCssBaseline';

export const createTheme = () => {
  const options = merge({}, MuiCssBaseline);
  return createMuiTheme(options);
};
