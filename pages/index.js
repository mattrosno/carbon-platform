import Layout from '../components/layout';
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
  return <Layout navData={navData}>Home page</Layout>;
};

export default Home;
