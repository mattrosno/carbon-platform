import { Column, Row } from 'carbon-components-react';
import { h2, h2Container } from './markdown.module.scss';

import AutolinkHeader from '../autolink-header';
import { columnProps } from '../layout';
import cx from 'classnames';

const H2 = ({ children, className, ...rest }) => (
  <Row className={cx(className, h2Container)}>
    <Column {...columnProps}>
      <AutolinkHeader is="h2" className={h2} {...rest}>
        {children}
      </AutolinkHeader>
    </Column>
  </Row>
);

export default H2;
