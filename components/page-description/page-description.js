import { Column, Row } from 'carbon-components-react';

import React from 'react';
import { columnProps } from '../layout';
import cx from 'classnames';
import { pageDescription } from './page-description.module.scss';

const PageDescription = ({ children, className, ...rest }) => (
  <Row className={cx(className, pageDescription)} {...rest}>
    <Column {...columnProps}>
      {React.cloneElement(children, { noGrid: true })}
    </Column>
  </Row>
);

export default PageDescription;
