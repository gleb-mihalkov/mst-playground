import { FC } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import * as Yup from 'yup';
import memoizeOne from 'memoize-one';

import withInputMask from 'hocs/withInputMask';
import useFormik from 'hooks/useFormik';
import CodeHelper from 'helpers/CodeHelper';
import useStore from 'hooks/useStore';

const CodeField = withInputMask(TextField);

/**
 * Значения формы.
 */
interface Values {
  /**
   * Код подтверждения.
   */
  code: string;
}

/**
 * Возвращает схему валидации.
 * @param isTriesExceeded Указывает, что количество попыток ввода кода
 * исчерпано.
 */
const getSchema = memoizeOne(
  (isTriesExceeded?: boolean): Yup.SchemaOf<Values> =>
    Yup.object().shape({
      code: Yup.string()
        .required('Введите код подтверждения')
        .code('Неверный формат кода подтверждения')
        .test({
          name: 'tries_exceeded',
          exclusive: true,
          message: 'Превышено количество попыток ввода. Попробуйте позже',
          test() {
            return !isTriesExceeded;
          },
        }),
    })
);

/**
 * Отображает форму ввода кода подтверждения смены пароля.
 */
const RecoveryCodeForm: FC = () => {
  const store = useStore();

  const formik = useFormik({
    name: 'recoveryCode',
    validateOnSchemaChange: true,

    initialValues: {
      code: '',
    },

    validationSchema: getSchema(store.recovery.isTriesExceeded),

    onSubmit(values) {
      const code = CodeHelper.parseDisplay(values.code);
      store.recovery.submitCode(code);
    },
  });

  return (
    <form {...formik.bindForm()}>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <CodeField
            {...formik.bindTextField('code')}
            variant="outlined"
            mask={CodeHelper.MASK}
            label="Код подтверждения из СМС"
            placeholder="000 000"
          />
        </Grid>
        <Grid item>
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

export default RecoveryCodeForm;
