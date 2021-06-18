import { FC } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import * as Yup from 'yup';
import memoize from 'memoize-one';

import PhoneHelper from 'helpers/PhoneHelper';
import useFormik from 'hooks/useFormik';
import withInputMask from 'hocs/withInputMask';
import useStore from 'hooks/useStore';
import { observer } from 'mobx-react';

const PhoneField = withInputMask(TextField);

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
  const store = useStore();

  const formik = useFormik({
    name: 'recoveryPhone',
    validateOnSchemaChange: true,

    initialValues: {
      phone: '',
    },

    validationSchema: getSchema(store.recovery.isRequestsLimitExceeded),

    onSubmit(values) {
      const phone = PhoneHelper.parseDisplay(values.phone);
      store.recovery.submitPhone(phone);
    },
  });

  return (
    <form {...formik.bindForm()}>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <PhoneField
            {...formik.bindTextField('phone')}
            variant="outlined"
            label="Номер телефона"
            placeholder="+7 000 000-00-00"
            mask={PhoneHelper.MASK}
            type="tel"
            inputMode="numeric"
          />
        </Grid>
        <Grid item md={12}>
          <Button
            {...formik.bindSubmitButton()}
            variant="contained"
            color="primary"
            disabled={store.recovery.pending}
          >
            Отправить
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default observer(RecoveryPhoneForm);
