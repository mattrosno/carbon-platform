import { Column, Row } from 'carbon-components-react';
import { MarkdownContext, columnProps } from '@/layouts/markdown';
import { useContext, useEffect } from 'react';

import { getLibraryNavData } from '@/lib/github';
import { h1 } from './pages.module.scss';

export const getStaticProps = async () => {
  const navData = await getLibraryNavData();

  return {
    props: {
      navData,
    },
  };
};

const Home = ({ navData }) => {
  const { setNavData } = useContext(MarkdownContext);

  useEffect(() => {
    setNavData(navData);
  }, [navData, setNavData]);

  return (
    <Row>
      <Column {...columnProps}>
        <h1 className={h1}>Home</h1>
      </Column>
    </Row>
  );
};

export default Home;
