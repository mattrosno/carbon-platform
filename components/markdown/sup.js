import React from 'react';
import cx from 'classnames';
import { sup } from './markdown.module.scss';

const Sup = ({ children, className, ...rest }) => (
  <sup className={cx(className, sup)} {...rest}>
    {children}
  </sup>
);

export default Sup;
