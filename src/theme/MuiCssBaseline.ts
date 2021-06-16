import { ThemeOptions } from '@material-ui/core';

export const MuiCssBaseline: ThemeOptions = {
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
        },
        '#__next': {
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
  },
};
