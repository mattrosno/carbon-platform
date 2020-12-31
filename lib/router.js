import slugify from 'slugify';

/**
 * Consistently slugify.
 */
export const getSlug = (name) => {
  return slugify(name, {
    lower: true,
    strict: true,
  });
};

/**
 * Create library slug given library config.
 */
export const getLibrarySlug = (org, repo, ref) => {
  return `${org}-${repo}-${ref}`;
};
