import { AppSwitcher20, Search20 } from "@carbon/icons-react";
import {
  Header,
  HeaderGlobalAction,
  HeaderGlobalBar,
} from "carbon-components-react";

import React from "react";

/**
 * Component to replace HeaderName, because HeaderName defaults an IBM prefix
 * and there's no way to hide it and the `&nbsp;` through a prop or CSS.
 */
const CustomHeaderName = () => (
  <a className="bx--header__name" href="#">
    Carbon Design System
  </a>
);

const PageHeader = () => (
  <Header aria-label="Carbon Design System">
    <CustomHeaderName />
    <HeaderGlobalBar>
      <HeaderGlobalAction aria-label="Search" onClick={() => {}}>
        <Search20 />
      </HeaderGlobalAction>
      <HeaderGlobalAction aria-label="App Switcher" onClick={() => {}}>
        <AppSwitcher20 />
      </HeaderGlobalAction>
    </HeaderGlobalBar>
  </Header>
);

export default PageHeader;
