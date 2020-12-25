import { table, tableContainer } from './markdown.module.scss';

import PropTypes from 'prop-types';
import React from 'react';

const PageTable = ({ children }) => (
  <div className={tableContainer}>
    <table className={table}>{children}</table>
  </div>
);

export default PageTable;

PageTable.propTypes = {
  children: PropTypes.node,
};
