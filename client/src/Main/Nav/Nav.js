import React from 'react';
import Logo from './Logo'
import User from './User'

const Nav = ({isLogin, token, isMypage, userInfo, handleMypage, handleLoginClick, getUserData}) => (
  <div id="nav">
    <Logo></Logo>
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
