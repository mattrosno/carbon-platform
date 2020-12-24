import { Link as CarbonLink } from 'carbon-components-react';
import React from 'react';
import cx from 'classnames';
import { link } from './link.module.scss';

const Link = ({ className, ...rest }) => (
  <CarbonLink {...rest} className={cx(className, link)} />
);

export default Link;
