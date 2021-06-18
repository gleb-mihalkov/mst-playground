import { FC, PropsWithChildren } from 'react';
import { FormHelperText, makeStyles, Theme } from '@material-ui/core';

/**
 * Свойства компонента отображения проверки силы пароля.
 */
type Props = PropsWithChildren<{
  /**
   * Статус проверки: `true` - пройдена, `false` - не пройдена, `undefined -
   * не проводилась.
   */
  status?: boolean;
}>;

/**
 * Возвращает коллекцию стилей.
 */
const usePasswordHintStyles = makeStyles<Theme, Props>((theme) => ({
  root: (props) => {
    let color: string;

    if (props.status == null) {
      color = theme.palette.text.secondary;
    } else if (props.status) {
      color = theme.palette.success.main;
    } else {
      color = theme.palette.error.main;
    }

    return { color };
  },
}));

/**
 * Отображает подсказку о сложности пароля.
 */
const RecoveryPasswordFormHint: FC<Props> = (props) => {
  const classes = usePasswordHintStyles(props);

  let prefix: string;

  if (props.status == null) {
    prefix = '⊝';
  } else if (props.status) {
    prefix = '⦿';
  } else {
    prefix = '⮾';
  }

  return (
    <FormHelperText error={false} className={classes.root}>
      {prefix} {props.children}
    </FormHelperText>
  );
};

export default RecoveryPasswordFormHint;
