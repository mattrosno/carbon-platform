import { useContext, useEffect } from 'react';

import { LayoutContext } from '../components/layout';
import { getComponentNavData } from '../lib/github';

export const getStaticProps = async () => {
  const navData = await getComponentNavData();

  return {
    props: {
      navData,
    },
  };
};

const Home = ({ navData }) => {
  const { setNavData } = useContext(LayoutContext);

  useEffect(() => {
    setNavData(navData);
  }, [navData, setNavData]);

  return <>Home page</>;
};

export default Home;
