const path = require('path');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

const sassResources = `
  $css--font-face: true;
  $css--helpers: true;
  $css--body: true;
  $css--reset: true;
  $css--default-type: true;
  $css--plex: true;
  $feature-flags: (
    enable-css-custom-properties: true,
    grid-columns-16: true,
  );

  @import 'carbon-components/scss/globals/scss/layout';
  @import 'carbon-components/scss/globals/scss/typography.scss';
`;

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  sassOptions: {
    additionalData: sassResources,
    includePaths: [path.join(__dirname, 'styles')],
  },
});
