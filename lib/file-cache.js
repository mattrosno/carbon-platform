import { CACHE_PATH, IMAGE_FULL_PATH } from '@/constants/config';

import { Octokit } from '@octokit/core';
import cacheManager from 'cache-manager';
import fs from 'fs-extra';
import fsStore from 'cache-manager-fs-hash';
import imageExtensions from 'image-extensions';
import unzipper from 'unzipper';

const diskCache = cacheManager.caching({
  store: fsStore,
  options: {
    path: CACHE_PATH,
    subdirs: true,
    ttl: 60 * 60 * 24 /* seconds */,
    zip: false,
  },
});

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

/**
 * Writes a file to disk. The Next.js Image component only works with images
 * that physically sit in the /public directory.
 */
const writeFile = async (path, contents) => {
  try {
    await fs.outputFile(`${IMAGE_FULL_PATH}/${path}`, contents);

    console.log('WRITE FILE', path);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Gets files from GitHub by requesting a repository archive at a specific
 * commit (tag). This should never be called directly. Use `getFilesCached`
 * instead.
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

  // Unzip the buffer
  const data = await unzipper.Open.buffer(Buffer.from(buffer));

  // Call buffer() on each file and save on a new 'buffered' property
  const bufferedFiles = await Promise.all(
    data.files.map((file) => {
      return file.buffer().then((buffered) => ({
        ...file,
        buffered,
      }));
    })
  );

  // Write all images to the /public directory
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
 * Get files from cache and if there is a cache miss, request the files. The
 * library slug is saved as "[org-name]-[repo-name]-[commit-short-hash]".
 */
export const getFilesCached = ({ owner, repo, ref }) => {
  console.log('GET CACHED FILES');

  return diskCache.wrap(`${owner}-${repo}-${ref}`, () => {
    return getFiles({ owner, repo, ref });
  });
};

/**
 * Parse a carbon.json file and add which library slug it came from.
 */
export const getComponentConfig = async (file) => {
  const config = JSON.parse(file.buffered.toString());

  return {
    ...config,
    library: file.path.split('/')[0],
  };
};
