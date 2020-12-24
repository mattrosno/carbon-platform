import {
  Abbr,
  Blockquote,
  H1,
  H2,
  H3,
  H4,
  H5,
  Li,
  Ol,
  P,
  Sup,
  Ul,
} from '../markdown';

import Link from '../link';
import PageTable from '../page-table';
import styles from './mdx.module.scss';

const Placeholder = ({ children }) => (
  <div className={styles.placeholder}>MDX GOES HERE</div>
);

export const mdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  p: P,
  ol: Ol,
  ul: Ul,
  li: Li,
  blockquote: Blockquote,
  code: ({ children }) => <Placeholder>{children}</Placeholder>,
  table: PageTable,
  a: Link,
  sup: Sup,
  abbr: Abbr,
  Accordion: ({ children }) => <Placeholder>{children}</Placeholder>,
  AccordionItem: ({ children }) => <Placeholder>{children}</Placeholder>,
  AnchorLink: ({ children }) => <Placeholder>{children}</Placeholder>,
  AnchorLinks: ({ children }) => <Placeholder>{children}</Placeholder>,
  ArtDirection: ({ children }) => <Placeholder>{children}</Placeholder>,
  ArticleCard: ({ children }) => <Placeholder>{children}</Placeholder>,
  Aside: ({ children }) => <Placeholder>{children}</Placeholder>,
  Caption: ({ children }) => <Placeholder>{children}</Placeholder>,
  Column: ({ children }) => <Placeholder>{children}</Placeholder>,
  ComponentDemo: ({ children }) => <Placeholder>{children}</Placeholder>,
  ComponentVariant: ({ children }) => <Placeholder>{children}</Placeholder>,
  DoDont: ({ children }) => <Placeholder>{children}</Placeholder>,
  DoDontExample: ({ children }) => <Placeholder>{children}</Placeholder>,
  DoDontRow: ({ children }) => <Placeholder>{children}</Placeholder>,
  FeatureCard: ({ children }) => <Placeholder>{children}</Placeholder>,
  FourOhFour: ({ children }) => <Placeholder>{children}</Placeholder>,
  GifPlayer: ({ children }) => <Placeholder>{children}</Placeholder>,
  Grid: ({ children }) => <Placeholder>{children}</Placeholder>,
  ImageCard: ({ children }) => <Placeholder>{children}</Placeholder>,
  InlineNotification: ({ children }) => <Placeholder>{children}</Placeholder>,
  MdxIcon: ({ children }) => <Placeholder>{children}</Placeholder>,
  PageDescription: ({ children }) => <Placeholder>{children}</Placeholder>,
  ResourceCard: ({ children }) => <Placeholder>{children}</Placeholder>,
  Row: ({ children }) => <Placeholder>{children}</Placeholder>,
  Tab: ({ children }) => <Placeholder>{children}</Placeholder>,
  Tabs: ({ children }) => <Placeholder>{children}</Placeholder>,
  Video: ({ children }) => <Placeholder>{children}</Placeholder>,
};
