import React, { Component } from "react";

import {
  Header,
  HeaderName,
  HeaderMenu,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction
} from "carbon-components-react/lib/components/UIShell";

import Exit20 from "@carbon/icons-react/lib/exit/20";
import { Link } from "react-router-dom";
import HeaderLink from "./HeaderLink";

export default class NavBar extends Component {
  render() {
    return (
      <Header aria-label="PatronDai">
        <HeaderName href="#" prefix="Eth">
          PatronDai
        </HeaderName>
        <HeaderNavigation style={{ display: "block" }}>
          <HeaderLink to="/">Browse</HeaderLink>
          <HeaderLink to="/start">Start</HeaderLink>
        </HeaderNavigation>
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="App Switcher" onClick={() => {}}>
            <Exit20 />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    );
  }
}
