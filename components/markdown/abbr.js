import React from 'react';
import { TooltipDefinition } from 'carbon-components-react';
import { abbr } from './markdown.module.scss';
import cx from 'classnames';

const Abbr = ({ title, children, className }) => (
  <TooltipDefinition className={cx(abbr, className)} tooltipText={title}>
    {children}
  </TooltipDefinition>
);

export default Abbr;
