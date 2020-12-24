import AutolinkHeader from '../autolink-header';
import React from 'react';
import cx from 'classnames';
import { h3 } from './markdown.module.scss';

const H3 = ({ children, className, ...rest }) => (
  <AutolinkHeader is="h3" className={cx(className, h3)} {...rest}>
    {children}
  </AutolinkHeader>
);

export default H3;
