import { FC } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import * as Yup from 'yup';
import memoizeOne from 'memoize-one';

import useFormik from 'hooks/useFormik';
import useStore from 'hooks/useStore';
import { observer } from 'mobx-react';

/**
 * Значения формы.
 */
interface Values {
  /**
   * Пароль.
   */
  password: string;

  /**
   * Подтверждение пароля.
   */
  passwordAgain: string;
}

/**
 * Возвращает схему валидации.
 */
const getSchema = memoizeOne(
  (): Yup.SchemaOf<Values> =>
    Yup.object().shape({
      password: Yup.string().required('Введите пароль'),

      passwordAgain: Yup.string()
        .required('Введите пароль повторно')
        .test({
          name: 'password_again',
          exclusive: true,
          message: 'Введённые пароли не совпадают',
          test(_, context) {
            return context.parent.password === context.parent.passwordAgain;
          },
        }),
    })
);

/**
 * Отображает форму ввода нового пароля на третьем шаге восстановления.
 */
const RecoveryPasswordForm: FC = () => {
  const store = useStore();

  const formik = useFormik<Values>({
    name: 'recoveryNewPassword',

    initialValues: {
      password: '',
      passwordAgain: '',
    },

    validationSchema: getSchema(),

    onSubmit(values) {
      store.recovery.submitPassword(values.password);
    },
  });

  return (
    <form {...formik.bindForm()}>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <TextField
            {...formik.bindTextField('password')}
            type="password"
            autoComplete="off"
            variant="outlined"
            placeholder=""
            label="Новый пароль"
          />
        </Grid>
        <Grid item md={12}>
          <TextField
            {...formik.bindTextField('passwordAgain')}
            type="password"
            autoComplete="off"
            variant="outlined"
            placeholder=""
            label="Повторите пароль"
          />
        </Grid>
        <Grid item md={12}>
          <Button
            {...formik.bindSubmitButton()}
            variant="contained"
            color="primary"
            disabled={store.recovery.pending}
          >
            Сохранить
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default observer(RecoveryPasswordForm);
