import { ThemeOptions } from '@material-ui/core';

/**
 * Глобальные стили для всех элементов форм.
 */
const MuiCssBaseline: ThemeOptions = {
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

export default MuiCssBaseline;
