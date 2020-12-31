export default (req, res) => {
  // Clear the preview mode cookies
  res.clearPreviewData();

  // Go home
  res.redirect('/');
};
