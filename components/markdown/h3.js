import { Column, Row } from 'carbon-components-react';
import { h3, h3Container } from './markdown.module.scss';

import AutolinkHeader from '../autolink-header';
import { columnProps } from '../layout';
import cx from 'classnames';

const H3 = ({ children, className, ...rest }) => (
  <Row className={cx(className, h3Container)} {...rest}>
    <Column {...columnProps}>
      <AutolinkHeader is="h3" className={h3}>
        {children}
      </AutolinkHeader>
    </Column>
  </Row>
);

export default H3;
