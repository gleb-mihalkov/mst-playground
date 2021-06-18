import { FC, PropsWithChildren } from 'react';
import { observer } from 'mobx-react';
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@material-ui/core';
import * as Yup from 'yup';
import memoizeOne from 'memoize-one';

import useFormik from 'hooks/useFormik';
import useStore from 'hooks/useStore';
import PasswordHelper from 'helpers/PasswordHelper';
import PasswordStrength from 'consts/PasswordStrength';
import RecoveryPasswordFormHint from './RecoveryPasswordFormHint';

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

  /**
   * Фальшивое поле для проверки условия "как минимум одна буква".
   */
  fakeOneLetter: string;

  /**
   * Фальшивое поле для провеки условия "как минимум одна цифра".
   */
  fakeOneDigit: string;

  /**
   * Фальшивое поле для показа условия "минимальная длина".
   */
  fakeLength: string;
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

      fakeOneLetter: Yup.string().test({
        name: 'one_letter',
        exclusive: true,
        message: 'true',
        test(_, context) {
          const { password = '' } = context.parent;
          return PasswordHelper.checkStrength(password)[
            PasswordStrength.ONE_LETTER
          ];
        },
      }),

      fakeOneDigit: Yup.string().test({
        name: 'one_digit',
        exclusive: true,
        message: 'true',
        test(_, context) {
          const { password = '' } = context.parent;
          return PasswordHelper.checkStrength(password)[
            PasswordStrength.ONE_DIGIT
          ];
        },
      }),

      fakeLength: Yup.string().test({
        name: 'one_length',
        exclusive: true,
        message: 'true',
        test(_, context) {
          const { password = '' } = context.parent;
          return PasswordHelper.checkStrength(password)[
            PasswordStrength.LENGTH
          ];
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
      fakeOneLetter: '',
      fakeOneDigit: '',
      fakeLength: '',
    },

    initialTouched: {
      fakeOneLetter: true,
      fakeOneDigit: true,
      fakeLength: true,
    },

    validationSchema: getSchema(),

    onSubmit(values) {
      store.recovery.submitPassword(values.password);
    },
  });

  function getHintStatus(name: keyof Values) {
    const value = formik.valueOf('password');
    const error = formik.errorOf(name);

    if (!value) {
      return undefined;
    }

    return !error;
  }

  return (
    <form {...formik.bindForm()}>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <FormControl
            {...formik.bindFormControl('password')}
            variant="outlined"
          >
            <InputLabel {...formik.bindInputLabel('password')}>
              Новый пароль
            </InputLabel>
            <OutlinedInput
              {...formik.bindInput('password')}
              type="password"
              autoComplete="off"
              placeholder=""
              label="Новый пароль"
            />
            <FormHelperText>{formik.errorOf('password')}</FormHelperText>
            <RecoveryPasswordFormHint status={getHintStatus('fakeOneLetter')}>
              Пароль содержит как минимум одну букву
            </RecoveryPasswordFormHint>
            <RecoveryPasswordFormHint status={getHintStatus('fakeOneDigit')}>
              Пароль содержит как минимум одну цифру
            </RecoveryPasswordFormHint>
            <RecoveryPasswordFormHint status={getHintStatus('fakeLength')}>
              Длина пароля не менее шести символов
            </RecoveryPasswordFormHint>
          </FormControl>
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
