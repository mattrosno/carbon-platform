import {
  anchor,
  header,
  leftAnchor,
  rightAnchor,
} from './autolink-header.module.scss';

import { Link20 as Link } from '@carbon/icons-react';
import React from 'react';
import { breakpoints } from '@carbon/elements';
import cx from 'classnames';
import slugify from 'slugify';
import useMedia from 'use-media';

const Anchor = ({ id, string, position }) => {
  const anchorClasses = cx(anchor, {
    [leftAnchor]: position === 'left',
    [rightAnchor]: position === 'right',
  });

  return (
    <a
      className={anchorClasses}
      href={`#${id}`}
      aria-label={`${string} permalink`}>
      <Link />
    </a>
  );
};

const AutolinkHeader = ({ is: Component, className, ...props }) => {
  const isMobile = useMedia({ maxWidth: breakpoints.md.width });

  const string = React.Children.map(
    props.children,
    (child) => (child.props ? child.props.children : child) // handle bold/italic words
  ).join('');

  const id = `${slugify(string, { lower: true })}`;

  const anchorPosition = () => (isMobile ? 'right' : 'left');

  return (
    <Component className={cx(header, className)} {...props} id={id}>
      {props.children}
      <Anchor id={id} string={string} position={anchorPosition()} />
    </Component>
  );
};

AutolinkHeader.defaultProps = { is: 'h2' };

export default AutolinkHeader;
