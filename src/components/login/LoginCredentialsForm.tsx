import { FC } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  Tooltip,
} from '@material-ui/core';
import * as Yup from 'yup';
import { observer } from 'mobx-react';
import memoize from 'memoize-one';

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
 * @param badUsername Неверное имя, которое ввёл пользователь при предыдущей
 * отправке.
 * @param badPassword Неверный пароль, кототорый ввёл пользователь при
 * предыдущей отправке.
 */
const getSchema = memoize(
  (badUsername?: string, badPassword?: string): Yup.SchemaOf<Values> =>
    Yup.object().shape({
      password: Yup.string().required('Введите пароль'),

      username: Yup.string()
        .required('Введите имя пользователя')
        .test({
          name: 'bad_credentials',
          message: 'Неверное имя пользователя или пароль',
          exclusive: true,
          test(_, context) {
            return (
              context.parent.password !== badPassword ||
              context.parent.username !== badUsername
            );
          },
        }),
    })
);

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

    validateOnSchemaChange: true,

    validationSchema: getSchema(
      store.login.badUsername,
      store.login.badPassword
    ),

    onSubmit(values) {
      store.login.submitCredentials(values.username, values.password);
    },
  });

  return (
    <form {...formik.bindForm()}>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <TextField
            {...formik.bindTextField('username')}
            variant="outlined"
            label="Имя пользователя"
            autoComplete="username"
          />
        </Grid>
        <Grid item md={12}>
          <TextField
            {...formik.bindTextField('password')}
            variant="outlined"
            label="Пароль"
            type="password"
            autoComplete="current-password"
          />
        </Grid>
        <Grid item md={12}>
          <Tooltip title="Реквизиты: admin / 1234">
            <Button
              {...formik.bindSubmitButton()}
              variant="contained"
              color="primary"
              disabled={store.login.pending}
            >
              Войти
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </form>
  );
};

export default observer(LoginCredentialsForm);
