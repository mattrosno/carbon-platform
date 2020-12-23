import { Octokit } from '@octokit/core';
import cacheManager from 'cache-manager';
import fs from 'fs';
import fsStore from 'cache-manager-fs-hash';
import imageExtensions from 'image-extensions';
import matter from 'gray-matter';
import { mdxComponents } from './mdx';
import mkdirp from 'mkdirp';
import path from 'path';
import rehypeUrls from 'rehype-urls';
import renderToString from 'next-mdx-remote/render-to-string';
import slugify from 'slugify';
import unzipper from 'unzipper';

const IMAGE_PATH = './public/.carbon/';
const TEST_REPO = {
  owner: 'mattrosno',
  repo: 'carbon-library-common',
};

const diskCache = cacheManager.caching({
  store: fsStore,
  options: {
    path: '.carbon',
    subdirs: true,
    ttl: 60 * 60 /* seconds */,
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
const writeFile = (path, contents) => {
  const dirPath = path.split('/').slice(0, -1).join('/');

  mkdirp(IMAGE_PATH + dirPath).then((made) => {
    if (made) console.log('MADE DIRECTORY ', made);

    fs.writeFile(IMAGE_PATH + path, contents, (err) => {
      if (err) throw err;
      console.log('SUCCESSFULL WRITE', path);
    });
  });
};

/**
 * TODO
 * @param {*} dirPath
 * @param {*} url
 */
const changeUrls = (dirPath, url) => {
  const extensions = new Set(imageExtensions);

  if (
    !url.host &&
    url.path &&
    extensions.has(path.extname(url.path).slice(1).toLowerCase())
  ) {
    return `/.carbon/${dirPath}/${url.path}`;
  }
};

/**
 * TODO
 * @param {*} param0
 */
const getFilesCached = ({ owner, repo }) => {
  console.log('GET CACHED FILES');

  return diskCache.wrap(`${owner}_${repo}`, () => {
    return getFiles({ owner, repo });
  });
};

/**
 * TODO
 * @param {*} param0
 */
const getFiles = async ({ owner, repo }) => {
  console.log('GET FILES FROM API');

  const { data: buffer } = await octokit.request(
    'GET /repos/{owner}/{repo}/zipball/{ref}',
    {
      owner,
      repo,
    }
  );

  const { files } = await unzipper.Open.buffer(Buffer.from(buffer));

  const bufferedFiles = await Promise.all(
    files.map((file) => {
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
    console.log('WRITE START', file.path);
    writeFile(file.path, file.buffered);
    console.log('WRITE END', file.path);
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
export const getAllComponentIds = async () => {
  const files = await getFilesCached(TEST_REPO);

  const components = files.filter((file) => file.path.endsWith('carbon.json'));

  const componentConfigs = await Promise.all(
    components.map((component) => {
      return JSON.parse(component.buffered.toString());
    })
  );

  return componentConfigs.map((component) => ({
    params: {
      id: getSlug(component.name),
    },
  }));
};

/**
 * TODO
 */
export const getComponentNavData = async () => {
  const files = await getFilesCached(TEST_REPO);

  const components = files.filter((file) => file.path.endsWith('carbon.json'));

  const componentConfigs = await Promise.all(
    components.map((component) => {
      return JSON.parse(component.buffered.toString());
    })
  );

  return componentConfigs.map((component) => ({
    id: getSlug(component.name),
    name: component.name,
  }));
};

/**
 * TODO
 * @param {*} id
 */
export const getComponentData = async (id) => {
  const files = await getFilesCached(TEST_REPO);

  const usageFile = files.find((file) => file.path.endsWith(`${id}/usage.mdx`));

  if (!usageFile) {
    return {
      id,
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
      remarkPlugins: [],
      rehypePlugins: [[rehypeUrls, changeUrls.bind(null, dirPath)]],
    },
    scope: data,
  });

  return {
    id,
    source: mdxSource,
    frontMatter: data,
  };
};
