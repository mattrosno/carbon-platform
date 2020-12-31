import {
  getComponentConfig,
  getFiles,
  getFilesFromSlug,
  getPackageJson,
} from './file-cache';
import { getSlug, mdxImgResolver } from './mdx';

import matter from 'gray-matter';
import { mdxComponents } from '@/components/mdx';
import rehypeUrls from 'rehype-urls';
import renderToString from 'next-mdx-remote/render-to-string';
import { staticLibraryData } from '@/data/libraries';
import unwrapImages from 'remark-unwrap-images';

/**
 * Get component slugs so we can populate static paths.
 */
export const getAllComponentSlugs = async () => {
  // Get files from all libraries
  const libraryPromises = [];

  for (let library of staticLibraryData) {
    libraryPromises.push(getFiles(library));
  }

  const files = await Promise.all(libraryPromises);

  const allFiles = [].concat(...files);

  // Filter out anything that isn't a component for now
  const components = allFiles.filter((file) =>
    file.path.endsWith('carbon.json')
  );

  const componentPromises = [];

  for (let component of components) {
    if (component.path.endsWith('carbon.json')) {
      componentPromises.push(getComponentConfig(component));
    }
  }

  const componentConfigs = await Promise.all(componentPromises);

  return componentConfigs.map((component) => ({
    params: {
      library: component.librarySlug,
      slug: getSlug(component.name),
    },
  }));
};

/**
 * Get library slugs so we can populate static paths.
 */
export const getAllLibrarySlugs = async () => {
  return staticLibraryData.map((library) => ({
    params: {
      library: `${library.org}-${library.repo}-${library.ref}`,
    },
  }));
};

/**
 * Get all data needed to populate the side navigation. Ideally, this comes
 * from and endpoint but we'll hardcode it for now.
 */
export const getLibraryNavData = async (previewLibraryData) => {
  const libraryData = previewLibraryData || staticLibraryData;
  const libraryPromises = [];

  for (let library of libraryData) {
    libraryPromises.push(getFiles(library));
  }

  const libraries = await Promise.all(libraryPromises);

  const componentPromises = [];

  for (let library of libraries) {
    for (let component of library) {
      if (component.path.endsWith('carbon.json')) {
        componentPromises.push(getComponentConfig(component));
      }
    }
  }

  const componentConfigs = await Promise.all(componentPromises);

  return libraries.map((files, i) => {
    // Default to hardcoded data, override with package.json data if possible
    let name = libraryData[i].repo;
    let version = libraryData[i].ref;

    const packageJson = getPackageJson(files);

    if (packageJson.carbon) {
      name = packageJson.carbon.name;
      version = packageJson.version;
    }

    return {
      name,
      version,
      components: componentConfigs
        .filter((c) => c.librarySlug === files[0].librarySlug)
        .map((c) => ({
          library: c.librarySlug,
          slug: getSlug(c.name),
          name: c.name,
        })),
    };
  });
};

/**
 * Get the component data needed to render a component page.
 */
export const getComponentData = async (library, slug) => {
  const files = await getFilesFromSlug(library);

  // Only render the usage file for this demo
  const usageFile = files.find((file) =>
    file.path.endsWith(`${slug}/usage.mdx`)
  );

  if (!usageFile) {
    return {
      library,
      slug,
      source: '<p>Component not found.</p>',
      frontMatter: {
        title: 'Not found',
      },
    };
  }

  const usageFileSource = usageFile.buffered.toString();

  const { content, data } = matter(usageFileSource);

  const dirPath = usageFile.path.split('/').slice(0, -1).join('/');

  const mdxSource = await renderToString(content, {
    components: mdxComponents,
    mdxOptions: {
      remarkPlugins: [unwrapImages],
      rehypePlugins: [[rehypeUrls, mdxImgResolver.bind(null, dirPath)]],
    },
    scope: data,
  });

  return {
    library,
    slug,
    source: mdxSource,
    frontMatter: data,
  };
};

/**
 * Get the library data needed to render a library page.
 */
export const getLibraryData = async (library) => {
  const files = await getFilesFromSlug(library);

  if (!files || !files.length) {
    return {
      name: 'Library not found',
    };
  }

  const packageJson = getPackageJson(files);

  return packageJson.carbon
    ? {
        name: packageJson.carbon.name,
        version: packageJson.version,
      }
    : {
        name: 'Library package.json not found',
      };
};
