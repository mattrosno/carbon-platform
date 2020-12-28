import { Column, Row } from 'carbon-components-react';
import { h6, h6Container } from './markdown.module.scss';

import { columnProps } from '../layout';
import cx from 'classnames';

const H6 = ({ children, className, ...rest }) => (
  <Row className={cx(className, h6Container)}>
    <Column {...columnProps}>
      <h6 className={h6} {...rest}>
        {children}
      </h6>
    </Column>
  </Row>
);

export default H6;
