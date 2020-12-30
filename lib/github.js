import { Octokit } from '@octokit/core';
import cacheManager from 'cache-manager';
import fs from 'fs-extra';
import fsStore from 'cache-manager-fs-hash';
import imageExtensions from 'image-extensions';
import { libraryData } from '@/data/libraries';
import matter from 'gray-matter';
import { mdxComponents } from '@/components/mdx';
import path from 'path';
import rehypeUrls from 'rehype-urls';
import renderToString from 'next-mdx-remote/render-to-string';
import sizeOf from 'image-size';
import slugify from 'slugify';
import unwrapImages from 'remark-unwrap-images';
import unzipper from 'unzipper';

const IMAGE_PATH = './public/.carbon/';

const diskCache = cacheManager.caching({
  store: fsStore,
  options: {
    path: '.carbon',
    subdirs: true,
    ttl: 60 * 60 * 24 /* seconds */,
    zip: false,
  },
});

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

/**
 * TODO
 * @param {*} path
 * @param {*} contents
 */
const writeFile = async (path, contents) => {
  try {
    await fs.outputFile(IMAGE_PATH + path, contents);

    console.log('WRITE FILE', path);
  } catch (err) {
    console.error(err);
  }
};

/**
 * TODO
 * @param {*} dirPath
 * @param {*} url
 */
const mdxImgResolver = (dirPath, url, node) => {
  const extensions = new Set(imageExtensions);

  if (
    !url.host &&
    url.path &&
    extensions.has(path.extname(url.path).slice(1).toLowerCase())
  ) {
    const imgPath = decodeURIComponent(`/.carbon/${dirPath}/${url.path}`);

    if (node.tagName === 'img') {
      try {
        const dimensions = sizeOf(`${process.cwd()}/public${imgPath}`);

        node.properties.height = dimensions.height;
        node.properties.width = dimensions.width;
      } catch (err) {
        console.error(err);
      }
    }

    return imgPath;
  }
};

/**
 * TODO
 * @param {*} param0
 */
const getFilesCached = ({ owner, repo, ref }) => {
  console.log('GET CACHED FILES');

  return diskCache.wrap(`${owner}-${repo}-${ref}`, () => {
    return getFiles({ owner, repo, ref });
  });
};

/**
 * TODO
 * @param {*} param0
 */
const getFiles = async ({ owner, repo, ref }) => {
  console.log('GET FILES FROM API');

  const { data: buffer } = await octokit.request(
    'GET /repos/{owner}/{repo}/zipball/{ref}',
    {
      owner,
      repo,
      ref,
    }
  );

  const data = await unzipper.Open.buffer(Buffer.from(buffer));

  const bufferedFiles = await Promise.all(
    data.files.map((file) => {
      return file.buffer().then((buffered) => ({
        ...file,
        buffered,
      }));
    })
  );

  const extensions = new Set(imageExtensions);

  const imageFiles = bufferedFiles.filter((file) =>
    extensions.has(path.extname(file.path).slice(1).toLowerCase())
  );

  for (let file of imageFiles) {
    await writeFile(file.path, file.buffered);
  }

  return bufferedFiles;
};

/**
 * TODO
 * @param {*} name
 */
const getSlug = (name) => {
  return slugify(name, {
    lower: true,
    strict: true,
  });
};

/**
 * TODO
 */
export const getAllComponentSlugs = async () => {
  // Get files from all libraries
  const libraryPromises = [];

  for (let library of libraryData) {
    libraryPromises.push(getFilesCached(library));
  }

  const files = await Promise.all(libraryPromises);

  const allFiles = [].concat(...files);

  // Filter out anything that isn't a component
  const components = allFiles.filter((file) =>
    file.path.endsWith('carbon.json')
  );

  // Get carbon.json content and add the library of format
  // "[org-name]-[repo-name]-[commit-short-hash]"
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

const getComponentConfig = async (file) => {
  const config = JSON.parse(file.buffered.toString());

  return {
    ...config,
    library: file.path.split('/')[0],
  };
};

/**
 * TODO
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
        library.slug = component.path.split('/')[0];

        componentPromises.push(getComponentConfig(component));
      }
    }
  }

  const components = await Promise.all(componentPromises);

  return libraries.map((files, i) => {
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
 * TODO
 * @param {*} id
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
  const usageFile = allFiles.find(
    (file) =>
      file.path.startsWith(library) && file.path.endsWith(`${slug}/usage.mdx`)
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
