import React from 'react';
import cx from 'classnames';
import { pageDescription } from './page-description.module.scss';

const PageDescription = ({ children, className, ...rest }) => (
  <section className={cx(pageDescription, className)} {...rest}>
    {children}
  </section>
);

export default PageDescription;
