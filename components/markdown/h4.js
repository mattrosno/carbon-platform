import { Column, Row } from 'carbon-components-react';
import { h4, h4Container } from './markdown.module.scss';

import { columnProps } from '../layout';
import cx from 'classnames';

const H4 = ({ children, className, noGrid, ...rest }) => {
  return noGrid ? (
    <h4 className={h4}>{children}</h4>
  ) : (
    <Row className={cx(className, h4Container)} {...rest}>
      <Column {...columnProps}>
        <h4 className={h4}>{children}</h4>
      </Column>
    </Row>
  );
};

export default H4;
