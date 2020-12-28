import { Column, Row } from 'carbon-components-react';
import { h1, h1Container } from './markdown.module.scss';

import AutolinkHeader from '@/components/autolink-header';
import { columnProps } from '@/layouts/markdown';
import cx from 'classnames';

const H1 = ({ children, className, noGrid, ...rest }) => {
  return noGrid ? (
    <h1 className={h1}>{children}</h1>
  ) : (
    <Row className={cx(className, h1Container)} {...rest}>
      <Column {...columnProps}>
        <AutolinkHeader is="h1" className={h1}>
          {children}
        </AutolinkHeader>
      </Column>
    </Row>
  );
};

export default H1;
