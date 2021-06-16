import { FC } from 'react';
import { Box, makeStyles, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: '1 1 auto',
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
  },

  container: {
    display: 'flex',
    justifyContent: 'center',
  },

  content: {
    maxWidth: theme.spacing(2 * 30),
    width: '100%',
  },
}));

/**
 * Отображает обрамление страницы в разделе входа в систему.
 */
const LoginLayout: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Container className={classes.container}>
        <Box className={classes.content}>{children}</Box>
      </Container>
    </Box>
  );
};

export default LoginLayout;
