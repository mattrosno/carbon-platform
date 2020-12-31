export default async (req, res) => {
  // TODO where to generate and share preview token?
  if (req.query.secret !== '1234') {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const { org, repo, ref } = req.query;

  if (!org || !repo || !ref) {
    return res.status(401).json({ message: 'Invalid parameters' });
  }

  // TODO check to make sure the library is valid

  // const library = await getLibraryBySlug(req.query.slug);

  // if (!library) {
  //   return res.status(401).json({ message: 'Invalid library' });
  // }

  // Enable preview mode by setting the cookies
  res.setPreviewData({
    org,
    repo,
    ref,
  });

  // Redirect to the path for the library
  res.redirect(`/${org}-${repo}-${ref}`);
};
