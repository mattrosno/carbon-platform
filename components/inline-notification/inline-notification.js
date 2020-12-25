import { InlineNotification as CarbonInlineNotification } from 'carbon-components-react';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import styles from './inline-notification.module.scss';

const InlineNotification = ({ children, className, kind = 'info' }) => (
  <div className={cx(styles.notification, className)}>
    <CarbonInlineNotification
      lowContrast
      hideCloseButton
      kind={kind}
      title=""
      subtitle={children}
    />
  </div>
);

InlineNotification.propTypes = {
  kind: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
};

export default InlineNotification;
