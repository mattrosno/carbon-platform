import React from 'react';
import cx from 'classnames';
import { link } from './anchor-links.module.scss';
import slugify from 'slugify';

const AnchorLink = ({ to, children, className }) => {
  const href = to || `#${slugify(children, { lower: true })}`;

  return (
    <a className={cx(link, className)} href={href}>
      {children}
    </a>
  );
};

export default AnchorLink;
