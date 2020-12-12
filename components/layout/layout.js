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
} from "carbon-components-react";
import { Search20, Switcher20 } from "@carbon/icons-react";

import Head from "next/head";
import Link from "next/link";
import { forwardRef } from "react";
import styles from "./layout.module.scss";

/**
 * Component to replace HeaderName, because HeaderName defaults an IBM prefix
 * and there's no way to hide it and the `&nbsp;` through a prop or CSS.
 */
const CustomHeaderName = () => (
  <Link href="/">
    <a className="bx--header__name">Carbon Design System</a>
  </Link>
);

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
                  <SideNavMenuItem element={NextLink} href="/">
                    Accessibility
                  </SideNavMenuItem>
                  <SideNavMenuItem element={NextLink} href="/">
                    Content
                  </SideNavMenuItem>
                </SideNavMenu>
                <SideNavMenu title="Foundation">
                  <SideNavMenuItem element={NextLink} href="/">
                    Color
                  </SideNavMenuItem>
                  <SideNavMenuItem element={NextLink} href="/">
                    Grid
                  </SideNavMenuItem>
                  <SideNavMenuItem element={NextLink} href="/">
                    Icons
                  </SideNavMenuItem>
                  <SideNavMenuItem element={NextLink} href="/">
                    Pictograms
                  </SideNavMenuItem>
                  <SideNavMenuItem element={NextLink} href="/">
                    Motion
                  </SideNavMenuItem>
                  <SideNavMenuItem element={NextLink} href="/">
                    Layout
                  </SideNavMenuItem>
                  <SideNavMenuItem element={NextLink} href="/">
                    Themes
                  </SideNavMenuItem>
                  <SideNavMenuItem element={NextLink} href="/">
                    Typography
                  </SideNavMenuItem>
                </SideNavMenu>
                <SideNavMenu title="Components">
                  <SideNavMenuItem element={NextLink} href="/">
                    Accordion
                  </SideNavMenuItem>
                  <SideNavMenuItem element={NextLink} href="/">
                    Breadcrumb
                  </SideNavMenuItem>
                  <SideNavMenuItem element={NextLink} href="/">
                    Button
                  </SideNavMenuItem>
                </SideNavMenu>
              </SideNavItems>
            </SideNav>
          </Header>
        )}
      ></HeaderContainer>
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
