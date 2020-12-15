import {
  getAllComponentIds,
  getComponentData,
  getComponentNavData,
} from '../../lib/github';
import { useContext, useEffect } from 'react';

import Head from 'next/head';
import { LayoutContext } from '../../components/layout';
import hydrate from 'next-mdx-remote/hydrate';
import { mdxComponents } from '../../lib/mdx';

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
  const { setNavData } = useContext(LayoutContext);

  useEffect(() => {
    setNavData(navData);
  }, [navData, setNavData]);

  const { title, contentMdx } = componentData;

  const content = hydrate(contentMdx, { components: mdxComponents });

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {content}
    </>
  );
};

export default Component;
