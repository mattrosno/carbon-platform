import { Column, Row } from 'carbon-components-react';
import { table, tableContainer } from './markdown.module.scss';

import PropTypes from 'prop-types';
import { columnProps } from '../layout';

const PageTable = ({ children }) => (
  <Row className={tableContainer} narrow={true}>
    <Column {...columnProps}>
      <table className={table}>{children}</table>
    </Column>
  </Row>
);

export default PageTable;

PageTable.propTypes = {
  children: PropTypes.node,
};
