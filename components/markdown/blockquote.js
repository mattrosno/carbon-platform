import { Column, Row } from 'carbon-components-react';
import { blockquote, blockquoteContainer } from './markdown.module.scss';

import { columnProps } from '../layout';
import cx from 'classnames';

const Blockquote = ({ className, children, ...rest }) => (
  <Row className={cx(className, blockquoteContainer)} {...rest}>
    <Column {...columnProps}>
      <blockquote className={blockquote}>
        {React.cloneElement(children, { noGrid: true })}
      </blockquote>
    </Column>
  </Row>
);

export default Blockquote;
