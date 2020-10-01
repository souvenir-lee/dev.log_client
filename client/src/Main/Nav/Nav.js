import React from 'react';
import Logo from './Logo'
import User from './User'

const Nav = ({isLogin, token, userInfo, handleLoginClick, getUserData}) => (
  <div id="nav">
    <Logo></Logo>
    <User 
      isLogin={isLogin} 
      token={token} 
      userInfo={userInfo} 
      handleLoginClick={handleLoginClick} 
      getUserData={getUserData}
    ></User>
  </div>
);

export default Nav;
