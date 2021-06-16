import { createMuiTheme, ThemeOptions } from '@material-ui/core';
import merge from 'deepmerge';

import MuiFormControl from './MuiFormControl';
import MuiCssBaseline from './MuiCssBaseline';

export default function createTheme() {
  let options: ThemeOptions = {};

  options = merge(options, MuiCssBaseline);
  options = merge(options, MuiFormControl);

  return createMuiTheme(options);
}
