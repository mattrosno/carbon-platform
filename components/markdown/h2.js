import { Column, Row } from 'carbon-components-react';
import { h2, h2Container } from './markdown.module.scss';

import AutolinkHeader from '@/components/autolink-header';
import { columnProps } from '@/layouts/markdown';
import cx from 'classnames';

const H2 = ({ children, className, noGrid, ...rest }) => {
  return noGrid ? (
    <h2 className={h2}>{children}</h2>
  ) : (
    <Row className={cx(className, h2Container)} {...rest}>
      <Column {...columnProps}>
        <AutolinkHeader is="h2" className={h2}>
          {children}
        </AutolinkHeader>
      </Column>
    </Row>
  );
};

export default H2;
