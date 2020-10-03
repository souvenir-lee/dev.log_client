import React from "react";
import Logo from "./Logo";
import User from "./User";
import Search from "./Search";

const Nav = ({
  handleLoginClick,
  handleMypage,
  isLogin,
  token,
  userInfo,
  isMypage,
  handleSearchList,
}) => (
  <div id="nav">
    <Logo></Logo>
    <Search handleSearchList={handleSearchList}></Search>
    <User
      handleLoginClick={handleLoginClick}
      handleMypage={handleMypage}
      token={token}
      userInfo={userInfo}
    ></User>
  </div>
);

export default Nav;
