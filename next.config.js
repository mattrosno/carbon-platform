const path = require('path');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
});
