import { Octokit } from '@octokit/core';
import cacheManager from 'cache-manager';
import fsStore from 'cache-manager-fs-hash';
import html from 'remark-html';
import matter from 'gray-matter';
import remark from 'remark';
import slugify from 'slugify';
import unzipper from 'unzipper';

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
      contentHtml: '<p>Component not found</p>',
      title: 'Not found',
    };
  }

  const usageFileContents = usageFile.buffered.toString();

  const matterResult = matter(usageFileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
};
