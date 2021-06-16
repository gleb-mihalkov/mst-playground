import { FC, ComponentPropsWithoutRef, forwardRef } from 'react';
import { Link as MuiLink } from '@material-ui/core';
import { default as NextLink } from 'next/link';

/**
 * Свойства компонента.
 */
type Props = ComponentPropsWithoutRef<typeof MuiLink> & {
  /**
   * Ссылка для проброса в компонент.
   */
  muiRef: any;
};

/**
 * Отображает ссылку, привязанную к роутеру NextJS.
 */
const Link: FC<Props> = ({ href, muiRef, ...props }) => (
  <NextLink href={href}>
    <MuiLink {...props} ref={muiRef} />
  </NextLink>
);

export default forwardRef((props: Omit<Props, 'muiRef'>, ref) => (
  <Link {...props} muiRef={ref} />
));
