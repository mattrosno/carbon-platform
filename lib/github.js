import { getComponentConfig, getFilesCached } from './file-cache';
import { getSlug, mdxImgResolver } from './mdx';

import { libraryData } from '@/data/libraries';
import matter from 'gray-matter';
import { mdxComponents } from '@/components/mdx';
import rehypeUrls from 'rehype-urls';
import renderToString from 'next-mdx-remote/render-to-string';
import unwrapImages from 'remark-unwrap-images';

/**
 * Get component slugs so we can populate static paths.
 */
export const getAllComponentSlugs = async () => {
  // Get files from all libraries
  const libraryPromises = [];

  for (let library of libraryData) {
    libraryPromises.push(getFilesCached(library));
  }

  const files = await Promise.all(libraryPromises);

  const allFiles = [].concat(...files);

  // Filter out anything that isn't a component for now
  const components = allFiles.filter((file) =>
    file.path.endsWith('carbon.json')
  );

  // Get carbon.json content and add the library slug
  const componentConfigs = await Promise.all(
    components.map((component) => {
      const config = JSON.parse(component.buffered.toString());

      return {
        ...config,
        library: component.path.split('/')[0],
      };
    })
  );

  return componentConfigs.map((component) => ({
    params: {
      library: component.library,
      slug: getSlug(component.name),
    },
  }));
};

/**
 * Get all data needed to populate the side navigation. Ideally, this comes
 * from and endpoint but we'll hardcode it for now.
 */
export const getLibraryNavData = async () => {
  const libraryPromises = [];

  for (let library of libraryData) {
    libraryPromises.push(getFilesCached(library));
  }

  const libraries = await Promise.all(libraryPromises);

  const componentPromises = [];

  for (let library of libraries) {
    for (let component of library) {
      if (component.path.endsWith('carbon.json')) {
        // Save the library slug so we can filter components later
        library.slug = component.path.split('/')[0];

        componentPromises.push(getComponentConfig(component));
      }
    }
  }

  const components = await Promise.all(componentPromises);

  return libraries.map((files, i) => {
    // Default to hardcoded data, override with package.json data if possible
    let name = libraryData[i].repo;
    let version = libraryData[i].ref;

    const packageJson = files.find((file) => {
      return (
        file.path.split('/').length === 2 && file.path.endsWith('package.json')
      );
    });

    if (packageJson) {
      const packageJsonContent = JSON.parse(packageJson.buffered.toString());

      if (packageJsonContent.carbon) {
        name = packageJsonContent.carbon.name;
        version = packageJsonContent.version;
      }
    }

    return {
      name,
      version,
      components: components
        .filter((c) => c.library === files.slug)
        .map((c) => ({
          library: c.library,
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
  // Get files from all libraries, this could be optimized
  const libraryPromises = [];

  for (let lib of libraryData) {
    libraryPromises.push(getFilesCached(lib));
  }

  const files = await Promise.all(libraryPromises);

  const allFiles = [].concat(...files);

  // Only render the usage file for this demo
  const usageFile = allFiles.find((file) => {
    return (
      file.path.startsWith(library) && file.path.endsWith(`${slug}/usage.mdx`)
    );
  });

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
