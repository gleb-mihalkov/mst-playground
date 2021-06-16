import { FC, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';

import createTheme from 'theme/createTheme';

/**
 * Предоставляет контекст темы для библиотеки Material UI. Сама тема
 * настраивается внутри каталога `src/theme`.
 */
const AppMaterialUiProvider: FC = ({ children }) => {
  const theme = useMemo(createTheme, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppMaterialUiProvider;
