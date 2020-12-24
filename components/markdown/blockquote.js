import React from 'react';
import { blockquote } from './markdown.module.scss';
import cx from 'classnames';

const Blockquote = ({ className, ...rest }) => (
  <blockquote className={cx(className, blockquote)} {...rest} />
);

export default Blockquote;
