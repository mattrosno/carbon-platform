import { Octokit } from '@octokit/core';
import html from 'remark-html';
import matter from 'gray-matter';
import remark from 'remark';
import slugify from 'slugify';
import unzipper from 'unzipper';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const repo = {
  owner: 'mattrosno',
  repo: 'carbon-library-common',
};

// Makeshift repository archive cache
let fileCache = null;

// Makeshift to get the repository archive only once, default branch
const getFiles = async () => {
  if (fileCache) {
    console.log('CACHE HIT');
    return fileCache;
  }

  console.log('FETCHING FILES');

  const { data: buffer } = await octokit.request(
    'GET /repos/{owner}/{repo}/zipball/{ref}',
    {
      ...repo,
    }
  );

  const { files } = await unzipper.Open.buffer(Buffer.from(buffer));

  fileCache = files;

  return fileCache;
};

export const getAllComponentIds = async () => {
  // // Get tree SHA for last commit in default branch
  // const {
  //   data: [{ commit }],
  // } = await octokit.request('GET /repos/{owner}/{repo}/commits', {
  //   ...repo,
  // });

  // // Get recursive tree for that branch
  // const {
  //   data: { tree },
  // } = await octokit.request('/repos/{owner}/{repo}/git/trees/{tree_sha}', {
  //   ...repo,
  //   tree_sha: commit.tree.sha,
  //   recursive: '1',
  // });

  const files = await getFiles();

  const components = files.filter((file) => file.path.endsWith('carbon.json'));

  const componentConfigs = await Promise.all(
    components.map((component) => {
      return component.buffer().then((file) => JSON.parse(file.toString()));
    })
  );

  return componentConfigs.map((component) => ({
    params: {
      id: slugify(component.name, {
        lower: true,
        strict: true,
      }),
    },
  }));
};

export const getComponentNavData = async () => {
  const files = await getFiles();

  const components = files.filter((file) => file.path.endsWith('carbon.json'));

  const componentConfigs = await Promise.all(
    components.map((component) => {
      return component.buffer().then((file) => JSON.parse(file.toString()));
    })
  );

  return componentConfigs.map((component) => ({
    id: slugify(component.name, {
      lower: true,
      strict: true,
    }),
    name: component.name,
  }));
};

export const getComponentData = async (id) => {
  const files = await getFiles();

  const usageFile = files.find((file) => file.path.endsWith(`${id}/usage.mdx`));

  if (!usageFile) {
    return {
      id,
      contentHtml: '<p>Component not found</p>',
      title: 'Not found',
    };
  }

  const usageFileBuffer = await usageFile.buffer();

  const usageFileContents = usageFileBuffer.toString();

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
