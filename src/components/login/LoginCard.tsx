import { FC, PropsWithChildren, ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
} from '@material-ui/core';

/**
 * Свойства компонента.
 */
type Props = PropsWithChildren<{
  /**
   * Заголовок.
   */
  heading: string;

  /**
   * Действия в подвале карточки.
   */
  actions?: ReactNode;
}>;

/**
 * Отображает карточку, внутри которой в разделе входа обычно располагается
 * форма.
 */
const LoginCard: FC<Props> = ({ heading, actions, children }) => (
  <Card>
    <CardContent>
      <Typography variant="h5" component="h2" gutterBottom>
        {heading}
      </Typography>
      <Box>{children}</Box>
    </CardContent>
    {actions && <CardActions>{actions}</CardActions>}
  </Card>
);

export default LoginCard;
