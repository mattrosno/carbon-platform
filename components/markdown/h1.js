import { Column, Row } from 'carbon-components-react';
import { h1, h1Container } from './markdown.module.scss';

import AutolinkHeader from '../autolink-header';
import { columnProps } from '../layout';
import cx from 'classnames';

const H1 = ({ children, className, ...rest }) => (
  <Row className={cx(className, h1Container)}>
    <Column {...columnProps}>
      <AutolinkHeader is="h1" className={h1} {...rest}>
        {children}
      </AutolinkHeader>
    </Column>
  </Row>
);

export default H1;
