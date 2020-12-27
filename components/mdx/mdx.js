import {
  Abbr,
  Anchor,
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
  Table,
  Ul,
} from '../markdown';
import { AnchorLink, AnchorLinks } from '../anchor-links';

import Image from 'next/image';
import InlineNotification from '../inline-notification';
import PageDescription from '../page-description';
import styles from './mdx.module.scss';

const Placeholder = ({ name }) => (
  <p className={styles.placeholder}>{name} MDX</p>
);

const ColRow = ({ children, className }) => (
  <p className={className}>{children}</p>
);

const Img = ({ alt, height, src, width }) => (
  <Image
    alt={alt}
    height={height}
    layout="responsive"
    src={src}
    width={width}
  />
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
  code: ({ children }) => <Placeholder name="Code">{children}</Placeholder>,
  table: Table,
  a: Anchor,
  sup: Sup,
  abbr: Abbr,
  img: Img,
  Accordion: ({ children }) => (
    <Placeholder name="Accordion">{children}</Placeholder>
  ),
  AccordionItem: ({ children }) => (
    <Placeholder name="AccordionItem">{children}</Placeholder>
  ),
  AnchorLink,
  AnchorLinks,
  ArtDirection: ({ children }) => (
    <Placeholder name="ArtDirection">{children}</Placeholder>
  ),
  ArticleCard: ({ children }) => (
    <Placeholder name="ArticleCard">{children}</Placeholder>
  ),
  Aside: ({ children }) => <Placeholder name="Aside">{children}</Placeholder>,
  Caption: ({ children }) => (
    <Placeholder name="Caption">{children}</Placeholder>
  ),
  Column: ColRow,
  ComponentDemo: ({ children }) => (
    <Placeholder name="ComponentDemo">{children}</Placeholder>
  ),
  ComponentVariant: ({ children }) => (
    <Placeholder name="ComponentVariant">{children}</Placeholder>
  ),
  DoDont: ({ children }) => <Placeholder name="DoDont">{children}</Placeholder>,
  DoDontExample: ({ children }) => (
    <Placeholder name="DoDontExample">{children}</Placeholder>
  ),
  DoDontRow: ({ children }) => (
    <Placeholder name="DoDontRow">{children}</Placeholder>
  ),
  FeatureCard: ({ children }) => (
    <Placeholder name="FeatureCard">{children}</Placeholder>
  ),
  FourOhFour: ({ children }) => (
    <Placeholder name="FourOhFour">{children}</Placeholder>
  ),
  GifPlayer: ({ children }) => (
    <Placeholder name="GifPlayer">{children}</Placeholder>
  ),
  Grid: ({ children }) => <Placeholder name="Grid">{children}</Placeholder>,
  ImageCard: ({ children }) => (
    <Placeholder name="ImageCard">{children}</Placeholder>
  ),
  InlineNotification,
  MdxIcon: ({ children }) => (
    <Placeholder name="MdxIcon">{children}</Placeholder>
  ),
  PageDescription,
  ResourceCard: ({ children }) => (
    <Placeholder name="ResourceCard">{children}</Placeholder>
  ),
  Row: ColRow,
  Tab: ({ children }) => <Placeholder name="Tab">{children}</Placeholder>,
  Tabs: ({ children }) => <Placeholder name="Tabs">{children}</Placeholder>,
  Video: ({ children }) => <Placeholder name="Video">{children}</Placeholder>,
};
