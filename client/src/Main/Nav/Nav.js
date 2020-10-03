import React from "react";
import Logo from "./Logo";
import User from "./User";
import Search from "./Search";
import styled from "styled-components";

export const Navbar = styled.nav`
  grid-column: 1 / 4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #02380e;
  padding: 10px 12px;
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
