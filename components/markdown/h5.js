import { Column, Row } from 'carbon-components-react';
import { h5, h5Container } from './markdown.module.scss';

import { columnProps } from '../layout';
import cx from 'classnames';

const H5 = ({ children, className, ...rest }) => (
  <Row className={cx(className, h5Container)}>
    <Column {...columnProps}>
      <h5 className={h5} {...rest}>
        {children}
      </h5>
    </Column>
  </Row>
);

export default H5;
