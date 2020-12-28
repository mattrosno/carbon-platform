import { Column, Row } from 'carbon-components-react';
import { h5, h5Container } from './markdown.module.scss';

import { columnProps } from '@/layouts/markdown';
import cx from 'classnames';

const H5 = ({ children, className, noGrid, ...rest }) => {
  return noGrid ? (
    <h5 className={h5}>{children}</h5>
  ) : (
    <Row className={cx(className, h5Container)} {...rest}>
      <Column {...columnProps}>
        <h5 className={h5}>{children}</h5>
      </Column>
    </Row>
  );
};

export default H5;
