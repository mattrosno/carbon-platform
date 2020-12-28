import { Column, Row } from 'carbon-components-react';

import { columnProps } from '@/layouts/markdown';
import cx from 'classnames';
import { list } from './markdown.module.scss';

const Ul = ({ children, nested, className, ...rest }) => {
  const classNames = cx('bx--list--unordered', {
    'bx--list--nested': nested,
  });

  return (
    <Row className={cx(list, className)}>
      <Column {...columnProps}>
        <ul className={classNames} {...rest}>
          {children}
        </ul>
      </Column>
    </Row>
  );
};

export default Ul;
