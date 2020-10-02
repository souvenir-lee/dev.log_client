import React from "react";
import Logo from "./Logo";
import User from "./User";
import Search from "./Search";

const Nav = ({
  isLogin,
  token,
  isMypage,
  userInfo,
  handleMypage,
  handleLoginClick,
  getUserData,
  handleSearchList,
}) => (
  <div id="nav">
    <Logo></Logo>
    <Search handleSearchList={handleSearchList}></Search>
    <User
      isLogin={isLogin}
      token={token}
      isMypage={isMypage}
      userInfo={userInfo}
      handleMypage={handleMypage}
      handleLoginClick={handleLoginClick}
      getUserData={getUserData}
    ></User>
  </div>
);

export default Nav;
