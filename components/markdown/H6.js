import React from 'react';
import cx from 'classnames';
import { h6 } from './markdown.module.scss';

const H6 = ({ children, className, ...rest }) => (
  <h6 className={cx(className, h6)} {...rest}>
    {children}
  </h6>
);

export default H6;
