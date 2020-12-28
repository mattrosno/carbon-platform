import { Column, Row } from 'carbon-components-react';
import { h3, h3Container } from './markdown.module.scss';

import AutolinkHeader from '@/components/autolink-header';
import { columnProps } from '@/layouts/markdown';
import cx from 'classnames';

const H3 = ({ children, className, noGrid, ...rest }) => {
  return noGrid ? (
    <h3 className={h3}>{children}</h3>
  ) : (
    <Row className={cx(className, h3Container)} {...rest}>
      <Column {...columnProps}>
        <AutolinkHeader is="h3" className={h3}>
          {children}
        </AutolinkHeader>
      </Column>
    </Row>
  );
};

export default H3;
