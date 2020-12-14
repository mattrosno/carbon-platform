import {
  Column,
  Grid,
  Header,
  HeaderContainer,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  Row,
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
  SkipToContent,
} from 'carbon-components-react';
import { Search20, Switcher20 } from '@carbon/icons-react';

import Head from 'next/head';
import Link from 'next/link';
import { forwardRef } from 'react';
import styles from './layout.module.scss';
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

const Layout = ({ children }) => {
  const router = useRouter();

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
                {/* <SideNavMenu title="Components">
                  {navData.map((item) => (
                    <SideNavMenuItem
                      element={NextLink}
                      href={`/component/${item.id}`}
                      key={item.id}>
                      {item.name}
                    </SideNavMenuItem>
                  ))}
                </SideNavMenu> */}
                <SideNavMenu title="Components" defaultExpanded={true}>
                  <SideNavMenuItem
                    element={NextLink}
                    href="/component/accordion"
                    isActive={router.asPath.startsWith('/component/accordion')}>
                    Accordion
                  </SideNavMenuItem>
                  <SideNavMenuItem
                    element={NextLink}
                    href="/component/breadcrumb"
                    isActive={router.asPath.startsWith(
                      '/component/breadcrumb'
                    )}>
                    Breadcrumb
                  </SideNavMenuItem>
                </SideNavMenu>
              </SideNavItems>
            </SideNav>
          </Header>
        )}></HeaderContainer>
      <div className={`theme--g10 ${styles.content}`}>
        <Grid fullWidth>
          <Row>
            <Column xlg={12} max={10}>
              {children}
            </Column>
          </Row>
        </Grid>
      </div>
    </>
  );
};

export default Layout;
