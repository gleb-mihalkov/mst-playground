import { FC } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import * as Yup from 'yup';
import { observer } from 'mobx-react';

import useFormik from 'hooks/useFormik';
import useStore from 'hooks/useStore';

/**
 * Значения формы.
 */
type Values = {
  /**
   * Имя пользователя.
   */
  username: string;

  /**
   * Пароль пользователя.
   */
  password: string;
};

/**
 * Схема валидации формы.
 */
const schema = Yup.object().shape({
  username: Yup.string().required('Введите имя пользователя'),
  password: Yup.string().required('Введите пароль'),
});

/**
 * Отображает форму ввода реквизитов пользователя для входа в систему.
 */
const LoginCredentialsForm: FC = () => {
  const store = useStore();

  const formik = useFormik<Values>({
    name: 'loginCredentials',

    initialValues: {
      username: '',
      password: '',
    },

    validationSchema: schema,

    onSubmit(values) {
      store.login.submitCredentials(values.username, values.password);
    },
  });

  return (
    <form {...formik.bindForm()}>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <TextField
            {...formik.bindInput('username')}
            variant="outlined"
            label="Имя пользователя"
            autoComplete="username"
          />
        </Grid>
        <Grid item md={12}>
          <TextField
            {...formik.bindInput('password')}
            variant="outlined"
            label="Пароль"
            type="password"
            autoComplete="current-password"
          />
        </Grid>
        <Grid item md={12}>
          <Button
            {...formik.bindSubmitButton()}
            variant="contained"
            color="primary"
            disabled={store.login.pending}
          >
            Войти
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default observer(LoginCredentialsForm);
