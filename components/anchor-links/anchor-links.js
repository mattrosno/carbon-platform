import { Column, Row } from 'carbon-components-react';
import {
  list,
  listContainer,
  listSmall,
  multipleColumns,
} from './anchor-links.module.scss';

import PropTypes from 'prop-types';
import React from 'react';
import { columnProps } from '../layout';
import cx from 'classnames';

const AnchorLinks = ({ children, small, className }) => {
  const isColumn = React.Children.count(children) > 6;

  const classNames = cx(list, {
    [listSmall]: small,
    [multipleColumns]: isColumn,
  });

  return (
    <Row className={cx(listContainer, className)}>
      <Column {...columnProps}>
        <ul className={classNames}>
          {React.Children.map(children, (link, i) => (
            <li key={i}>{link}</li>
          ))}
        </ul>
      </Column>
    </Row>
  );
};

AnchorLinks.propTypes = {
  children: PropTypes.node.isRequired,
  small: PropTypes.bool,
};

export default AnchorLinks;
