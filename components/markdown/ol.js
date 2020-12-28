import { Column, Row } from 'carbon-components-react';

import { columnProps } from '@/layouts/markdown';
import cx from 'classnames';
import { list } from './markdown.module.scss';

const Ol = ({ children, nested, start, className, ...rest }) => {
  const classNames = cx('bx--list--ordered--native', {
    'bx--list--nested': nested,
  });

  return (
    <Row className={cx(list, className)}>
      <Column {...columnProps}>
        <ol className={classNames} {...rest} start={`${start}`}>
          {children}
        </ol>
      </Column>
    </Row>
  );
};

export default Ol;
