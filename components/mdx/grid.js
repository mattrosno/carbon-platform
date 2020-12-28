import { Column, Row } from 'carbon-components-react';

import React from 'react';
import { columnProps } from '../layout';
import cx from 'classnames';
import styles from './mdx.module.scss';

export const MdxRow = ({ children, className,  ...rest }) => (
  <Row className={cx(className, styles.row)} {...rest}>
    {React.Children.toArray(children).map((child) =>
      React.cloneElement(child, { noGrid: true })
    )}
  </Row>
);

export const MdxColumn = ({ children, className, ...rest }) => {
  const { colSm, colMd, colLg } = rest;

  // Temporary transformation until sample MDX doesn't assume 12 column grid
  let props = {
    ...columnProps,
  };

  if (colSm === 2) {
    props = {
      ...props,
      sm: {
        ...props.sm,
        span: 2,
      },
    };
  }

  if (colMd === 4) {
    props = {
      ...props,
      md: {
        ...props.md,
        span: 2,
      },
    };
  }

  if (colLg === 4) {
    props = {
      ...props,
      lg: {
        ...props.lg,
        span: 5,
      },
      xlg: {
        ...props.xlg,
        span: 4,
      },
      max: {
        ...props.max,
        span: 3,
      },
    };
  } else if (colLg === 12) {
    props = {
      ...props,
      lg: {
        ...props.lg,
        span: 14,
      },
      xlg: {
        ...props.xlg,
        span: 14,
      },
      max: {
        ...props.max,
        span: 14,
      },
    };
  }

  return (
    <Column className={className} {...props}>
      {React.Children.toArray(children).map((child) =>
        React.cloneElement(child, { noGrid: true })
      )}
    </Column>
  );
};
