import { Column, Row } from 'carbon-components-react';
import { h6, h6Container } from './markdown.module.scss';

import { columnProps } from '../layout';
import cx from 'classnames';

const H6 = ({ children, className, noGrid, ...rest }) => {
  return noGrid ? (
    <h6 className={h6}>{children}</h6>
  ) : (
    <Row className={cx(className, h6Container)} {...rest}>
      <Column {...columnProps}>
        <h6 className={h6}>{children}</h6>
      </Column>
    </Row>
  );
};

export default H6;
