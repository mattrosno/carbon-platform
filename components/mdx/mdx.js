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
} from '@/components/markdown';
import { AnchorLink, AnchorLinks } from '@/components/anchor-links';
import { Column, Row } from 'carbon-components-react';
import { MdxColumn, MdxRow } from './grid';

import ArtDirection from '@/components/art-direction';
import Img from './image';
import InlineNotification from '@/components/inline-notification';
import PageDescription from '@/components/page-description';
import { columnProps } from '@/layouts/markdown';
import cx from 'classnames';
import styles from './mdx.module.scss';

const Placeholder = ({ name }) => {
  return (
    <Row className={styles.placeholderContainer}>
      <Column {...columnProps}>
        <p className={styles.placeholder}>{name} MDX</p>
      </Column>
    </Row>
  );
};

const PlaceholderNoGrid = ({ name }) => {
  return (
    <p className={cx(styles.placeholderContainer, styles.placeholder)}>
      {name} MDX
    </p>
  );
};

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
  ArtDirection,
  ArticleCard: ({ children }) => (
    <Placeholder name="ArticleCard">{children}</Placeholder>
  ),
  Aside: ({ children }) => <Placeholder name="Aside">{children}</Placeholder>,
  Caption: ({ children }) => (
    <PlaceholderNoGrid name="Caption">{children}</PlaceholderNoGrid>
  ),
  Column: MdxColumn,
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
  Row: MdxRow,
  Tab: ({ children }) => <Placeholder name="Tab">{children}</Placeholder>,
  Tabs: ({ children }) => <Placeholder name="Tabs">{children}</Placeholder>,
  Video: ({ children }) => <Placeholder name="Video">{children}</Placeholder>,
};
