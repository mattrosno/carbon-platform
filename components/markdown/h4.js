import { Column, Row } from 'carbon-components-react';
import { h4, h4Container } from './markdown.module.scss';

import { columnProps } from '../layout';
import cx from 'classnames';

const H4 = ({ children, className, ...rest }) => (
  <Row className={cx(className, h4Container)}>
    <Column {...columnProps}>
      <h4 className={h4} {...rest}>
        {children}
      </h4>
    </Column>
  </Row>
);

export default H4;
