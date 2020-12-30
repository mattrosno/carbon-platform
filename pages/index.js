import { useContext, useEffect } from 'react';

import { MarkdownContext } from '@/layouts/markdown';
import { getLibraryNavData } from '@/lib/github';

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
    <>
      <h1>Home page</h1>
    </>
  );
};

export default Home;
