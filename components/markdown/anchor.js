import { Link } from 'carbon-components-react';
import React from 'react';
import { anchor } from './markdown.module.scss';
import cx from 'classnames';

const Anchor = ({ className, ...rest }) => (
  <Link {...rest} className={cx(className, anchor)} />
);

export default Anchor;
