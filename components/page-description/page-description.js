import { Column, Row } from 'carbon-components-react';

import React from 'react';
import { columnProps } from '@/layouts/markdown';
import cx from 'classnames';
import { pageDescription } from './page-description.module.scss';

const PageDescription = ({ children, className, ...rest }) => (
  <Row className={cx(className, pageDescription)} {...rest}>
    <Column {...columnProps}>
      {React.Children.toArray(children).map((child) =>
        React.cloneElement(child, { noGrid: true })
      )}
    </Column>
  </Row>
);

export default PageDescription;
