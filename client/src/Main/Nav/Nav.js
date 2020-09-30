import React from 'react';
import Logo from './Logo'
import User from './User'

const Nav = ({isLogin, userInfo, handleLoginClick, getUserDate}) => (
  <div className="nav">
    <Logo></Logo>
    <User isLogin={isLogin} userInfo={userInfo} handleLoginClick={handleLoginClick} getUserDate={getUserDate}></User>
  </div>
);

export default Nav;
