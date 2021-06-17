import { FC } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import * as Yup from 'yup';
import memoize from 'memoize-one';
import useFormik from 'hooks/useFormik';

/**
 * Значения формы.
 */
interface Values {
  /**
   * Номер телефона.
   */
  phone: string;
}

/**
 * Возвращает схему валидации формы.
 * @param isTriesExceeded Указывает, что в текущий момент превышен лимит
 * отправки кодов подтверждения.
 */
const getSchema = memoize(
  (isTriesExceeded: boolean): Yup.SchemaOf<Values> =>
    Yup.object().shape({
      phone: Yup.string()
        .required('Введите номер телефона')
        .phone('Неверный формат номера телефона')
        .test({
          name: 'tries_exceeded',
          exclusive: true,
          message:
            'Превышен лимит отправки кодов подтверждения. Повторите попытку позже',
          test() {
            return !isTriesExceeded;
          },
        }),
    })
);

/**
 * Отображает форму ввода телефона на первом шаге восстановления пароля.
 */
const RecoveryPhoneForm: FC = () => {
  const formik = useFormik({
    name: 'recoveryPhone',
    validateOnSchemaChange: true,

    initialValues: {
      phone: '',
    },

    validationSchema: getSchema(false),
  });

  return (
    <form {...formik.bindForm()}>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <TextField
            {...formik.bindTextField('phone')}
            variant="outlined"
            label="Номер телефона"
            placeholder="+7 000 000-00-00"
            type="tel"
            inputMode="numeric"
          />
        </Grid>
        <Grid item md={12}>
          <Button
            {...formik.bindSubmitButton()}
            variant="contained"
            color="primary"
          >
            Отправить
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default RecoveryPhoneForm;
