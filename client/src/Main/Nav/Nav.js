import React from 'react';
import Logo from './Logo'
import User from './User'

const Nav = ({isLogin, userinfo, serverinfo, handleLoginClick, getUserDate}) => (
  <div className="listup_nav">
    <Logo></Logo>
    <User isLogin={isLogin} userinfo={userinfo} serverinfo={serverinfo} handleLoginClick={handleLoginClick} getUserDate={getUserDate}></User>
  </div>
);

export default Nav;
