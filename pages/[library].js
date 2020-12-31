import { Column, Row } from 'carbon-components-react';
import { MarkdownContext, columnProps } from '@/layouts/markdown';
import {
  getAllLibrarySlugs,
  getLibraryData,
  getLibraryNavData,
} from '@/lib/github';
import { useContext, useEffect } from 'react';

import { h1 } from './pages.module.scss';

export const getStaticProps = async ({ params, preview, previewData }) => {
  const libraries = preview
    ? [
        {
          org: previewData.org,
          repo: previewData.repo,
          ref: previewData.ref,
        },
      ]
    : null;

  // Call before getLibraryData as this primes the cache
  const navData = await getLibraryNavData(libraries);

  const libraryData = await getLibraryData(params.library);

  return {
    props: {
      libraryData,
      navData,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = await getAllLibrarySlugs();

  return {
    paths,
    fallback: false,
  };
};

const Library = ({ libraryData, navData }) => {
  const { setNavData } = useContext(MarkdownContext);

  useEffect(() => {
    setNavData(navData);
  }, [navData, setNavData]);

  return (
    <Row>
      <Column {...columnProps}>
        <h1 className={h1}>
          {libraryData.name} {libraryData.version}
        </h1>
      </Column>
    </Row>
  );
};

export default Library;
