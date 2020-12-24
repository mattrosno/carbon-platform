import AutolinkHeader from '../autolink-header';
import React from 'react';
import cx from 'classnames';
import { h2 } from './markdown.module.scss';

const H2 = ({ children, className, ...rest }) => (
  <AutolinkHeader className={cx(className, h2)} is="h2" {...rest}>
    {children}
  </AutolinkHeader>
);

export default H2;
