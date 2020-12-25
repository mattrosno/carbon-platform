import { list, listSmall, multipleColumns } from './anchor-links.module.scss';

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

const AnchorLinks = ({ children, small, className }) => {
  const isColumn = React.Children.count(children) > 6;

  const classNames = cx(list, className, {
    [listSmall]: small,
    [multipleColumns]: isColumn,
  });

  return (
    <ul className={classNames}>
      {React.Children.map(children, (link, i) => (
        <li key={i}>{link}</li>
      ))}
    </ul>
  );
};

AnchorLinks.propTypes = {
  children: PropTypes.node.isRequired,
  small: PropTypes.bool,
};

export default AnchorLinks;
