import {
  getAllComponentSlugs,
  getComponentData,
  getLibraryNavData,
} from '@/lib/github';
import { useContext, useEffect } from 'react';

import Head from 'next/head';
import { MarkdownContext } from '@/layouts/markdown';
import hydrate from 'next-mdx-remote/hydrate';
import { mdxComponents } from '@/components/mdx';

export const getStaticProps = async ({ params }) => {
  const componentData = await getComponentData(params.library, params.slug);
  const navData = await getLibraryNavData();

  return {
    props: {
      componentData,
      navData,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = await getAllComponentSlugs();

  return {
    paths,
    fallback: false,
  };
};

const Component = ({ componentData, navData }) => {
  const { setNavData } = useContext(MarkdownContext);

  useEffect(() => {
    setNavData(navData);
  }, [navData, setNavData]);

  const { frontMatter, source } = componentData;

  const content = hydrate(source, { components: mdxComponents });

  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
      </Head>
      {content}
    </>
  );
};

export default Component;
