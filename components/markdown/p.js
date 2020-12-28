import { Column, Row } from 'carbon-components-react';
import { paragraph, paragraphContainer } from './markdown.module.scss';

import { columnProps } from '@/layouts/markdown';
import cx from 'classnames';

const P = ({ children, className, noGrid, ...rest }) => {
  if (noGrid) {
    return (
      <p className={paragraph} {...rest}>
        {children}
      </p>
    );
  }

  return (
    <Row className={cx(className, paragraphContainer)}>
      <Column {...columnProps}>
        <p className={paragraph} {...rest}>
          {children}
        </p>
      </Column>
    </Row>
  );
};

export default P;
