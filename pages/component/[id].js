import { getAllComponentIds, getComponentData } from '../../lib/github';

import Head from 'next/head';

export const getStaticProps = async ({ params }) => {
  const componentData = await getComponentData(params.id);

  return {
    props: {
      componentData,
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

const Component = ({ componentData }) => {
  return (
    <>
      <Head>
        <title>{componentData.title}</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: componentData.contentHtml }} />
    </>
  );
};

export default Component;
