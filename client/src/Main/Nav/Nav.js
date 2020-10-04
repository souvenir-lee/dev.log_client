import React from "react";
import Logo from "./Logo";
import User from "./User";
import Search from "./Search";
import styled from "styled-components";

export const Navbar = styled.nav`
  grid-area: nav;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #02380e;
  padding: 10px 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Nav = ({
  handleLoginClick,
  handleMypage,
  isLogin,
  token,
  userInfo,
  isMypage,
  handleSearchList,
}) => (
  <Navbar id="nav">
    <Logo></Logo>
    <Search handleSearchList={handleSearchList}></Search>
    <User
      handleLoginClick={handleLoginClick}
      handleMypage={handleMypage}
      token={token}
      userInfo={userInfo}
    ></User>
  </Navbar>
);

export default Nav;
