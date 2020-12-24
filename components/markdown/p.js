import React from 'react';
import cx from 'classnames';
import { paragraph } from './markdown.module.scss';

const P = ({ children, className, ...rest }) => {
  const paragraphClasses = cx(className, paragraph);

  return (
    <p className={paragraphClasses} {...rest}>
      {children}
    </p>
  );
};

export default P;
