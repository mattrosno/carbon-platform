import AutolinkHeader from '../autolink-header';
import React from 'react';
import cx from 'classnames';
import { h1 } from './markdown.module.scss';

const H1 = ({ children, className, ...rest }) => (
  <AutolinkHeader is="h1" className={cx(h1, className)} {...rest}>
    {children}
  </AutolinkHeader>
);

export default H1;
