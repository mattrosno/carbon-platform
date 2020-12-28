import {
  Grid,
  Header,
  HeaderContainer,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
  SkipToContent,
} from 'carbon-components-react';
import { Search20, Switcher20 } from '@carbon/icons-react';
import { useContext, useEffect } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { MarkdownContext } from './markdown-context';
import { forwardRef } from 'react';
import styles from './markdown-layout.module.scss';
import { useRouter } from 'next/router';

/**
 * Component to replace HeaderName, because HeaderName defaults an IBM prefix
 * and there's no way to hide it and the `&nbsp;` through a prop or CSS.
 */
const CustomHeaderName = () => (
  <Link href="/">
    <a className="bx--header__name">Carbon Design System</a>
  </Link>
);

/**
 * Component to use in Carbon's UI shell components to work with Next's router.
 */
const NextLink = forwardRef(function NextLink(
  { href, children, className, ...rest },
  ref
) {
  return (
    <Link href={href}>
      <a className={className} {...rest} ref={ref}>
        {children}
      </a>
    </Link>
  );
});

/**
 * Default MDX layout.
 */
export const columnProps = {
  md: { span: 6, offset: 1 },
  lg: { span: 12, offset: 1 },
  xlg: { span: 10, offset: 1 },
  max: { span: 8, offset: 1 },
};

const MarkdownLayout = ({ children }) => {
  const router = useRouter();
  const { navData } = useContext(MarkdownContext);

  useEffect(() => {
    const scroll = require('smooth-scroll')('a[href*="#"]', {
      speed: 400,
      durationMin: 250,
      durationMax: 700,
      easing: 'easeInOutCubic',
      clip: true,
      offset: 64,
    });

    return scroll.destroy;
  }, []);

  const guidelines = ['Accessibility', 'Content'];
  const foundation = [
    'Color',
    'Grid',
    'Icons',
    'Pictograms',
    'Motion',
    'Layout',
    'Themes',
    'Typography',
  ];

  return (
    <>
      <Head>
        <title>Carbon Design System</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <Header aria-label="Carbon Design System">
            <SkipToContent />
            <HeaderMenuButton
              aria-label="Open menu"
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
            <CustomHeaderName />
            <HeaderGlobalBar>
              <HeaderGlobalAction aria-label="Search" onClick={() => {}}>
                <Search20 />
              </HeaderGlobalAction>
              <HeaderGlobalAction aria-label="App Switcher" onClick={() => {}}>
                <Switcher20 />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
            <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
              <SideNavItems>
                <SideNavMenu title="Guidelines">
                  {guidelines.map((item, i) => (
                    <SideNavMenuItem element={NextLink} href="/" key={i}>
                      {item}
                    </SideNavMenuItem>
                  ))}
                </SideNavMenu>
                <SideNavMenu title="Foundation">
                  {foundation.map((item, i) => (
                    <SideNavMenuItem element={NextLink} href="/" key={i}>
                      {item}
                    </SideNavMenuItem>
                  ))}
                </SideNavMenu>
                <SideNavMenu defaultExpanded={true} title="Components">
                  {navData.map((item) => (
                    <SideNavMenuItem
                      element={NextLink}
                      href={`/component/${item.id}`}
                      isActive={router.asPath.startsWith(
                        `/component/${item.id}`
                      )}
                      key={item.id}>
                      {item.name}
                    </SideNavMenuItem>
                  ))}
                </SideNavMenu>
              </SideNavItems>
            </SideNav>
          </Header>
        )}></HeaderContainer>
      <div className={`theme--g10 ${styles.content}`}>
        <Grid className={styles.main}>{children}</Grid>
      </div>
    </>
  );
};

export default MarkdownLayout;
