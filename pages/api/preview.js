import { deleteFiles, getFiles } from '@/lib/file-cache';

import { getLibrarySlug } from '@/lib/router';

/**
 * TODO: in our CLI preview mode that creates a library repo, somehow create a
 * token and validate it here.
 *
 * Get the library files here to validate the query parameters and make sure
 * there is data to render when we redirect.
 */
export default async (req, res) => {
  const { org, repo, ref, secret } = req.query;

  if (secret !== '1234') {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (!org || !repo || !ref) {
    return res.status(401).json({ message: 'Invalid parameters' });
  }

  // Remove old files to ensure a cache miss
  await deleteFiles(getLibrarySlug(org, repo, ref));

  // Validate the library
  const previewFiles = await getFiles({
    org,
    repo,
    ref,
  });

  if (!previewFiles || !previewFiles.length) {
    return res.status(401).json({ message: 'Invalid library' });
  }

  // Enable preview mode by setting the cookies
  res.setPreviewData({
    org,
    repo,
    ref,
  });

  // Redirect to the path for the library
  res.redirect(`/${getLibrarySlug(org, repo, ref)}`);
};
