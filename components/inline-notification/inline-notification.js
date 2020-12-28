import {
  InlineNotification as CarbonInlineNotification,
  Column,
  Row,
} from 'carbon-components-react';

import PropTypes from 'prop-types';
import React from 'react';
import { columnProps } from '../layout';
import cx from 'classnames';
import styles from './inline-notification.module.scss';

const InlineNotification = ({ children, className, kind = 'info' }) => (
  <Row className={cx(styles.notification, className)}>
    <Column {...columnProps}>
      <CarbonInlineNotification
        lowContrast
        hideCloseButton
        kind={kind}
        title=""
        subtitle={React.cloneElement(children, { noGrid: true })}
      />
    </Column>
  </Row>
);

InlineNotification.propTypes = {
  kind: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
};

export default InlineNotification;
