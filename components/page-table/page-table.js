import PropTypes from 'prop-types';
import React from 'react';

const PageTable = ({children}) => (
  <div className="page-table__container">
    <table className="page-table">{children}</table>
  </div>
);

export default PageTable;

PageTable.propTypes = {
  children: PropTypes.node,
};
