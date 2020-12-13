import {
  getAllComponentIds,
  getComponentData,
  getComponentNavData,
} from '../../lib/github';

import Head from 'next/head';
import Layout from '../../components/layout';

export const getStaticProps = async ({ params }) => {
  const componentData = await getComponentData(params.id);
  const navData = await getComponentNavData();

  return {
    props: {
      componentData,
      navData,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = await getAllComponentIds();

  return {
    paths,
    fallback: false,
  };
};

const Component = ({ componentData, navData }) => {
  return (
    <Layout navData={navData}>
      <Head>
        <title>{componentData.title}</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: componentData.contentHtml }} />
    </Layout>
  );
};

export default Component;
