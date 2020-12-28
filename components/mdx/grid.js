import { Column, Row } from 'carbon-components-react';

import { columnProps } from '../layout';
import cx from 'classnames';
import styles from './mdx.module.scss';

export const MdxRow = ({ children, className, ...rest }) => (
  <Row className={cx(className, styles.row)} {...rest}>
    {children}
  </Row>
);

export const MdxColumn = ({ children, className, ...rest }) => {
  const { colLg } = rest;

  // Temporary transformation until sample MDX doesn't assume 12 column grid
  const props = {
    ...columnProps,
    max: {
      ...columnProps.max,
      span: colLg === 12 ? 14 : columnProps.max.span,
    },
  };

  return (
    <Column className={className} {...props}>
      {children}
    </Column>
  );
};
