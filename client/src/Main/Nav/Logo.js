import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import styled from "styled-components";

const NavLogo = styled.div`
  background: #02380e;
  color: #fff;
  font-size: 1em;
  font-family: "Nanum Gothic Coding";
`;
const LogoImg = styled.img`
  width: 150px;
  height: 80px;
  padding-left: 20px;
`;

const Logo = (props) => (
  <NavLogo 
    className="navLogo" 
    onClick={() => <Redirect to="/main" />}>
    <LogoImg src="dev-log.png" style={{width: "100px"}} alt="우리 웹 사이트 마크"/>
  </NavLogo>
);

export default withRouter(Logo);