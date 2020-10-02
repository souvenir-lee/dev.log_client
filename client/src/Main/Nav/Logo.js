import React from "react";
import { Redirect, withRouter } from "react-router-dom";

const Logo = (props) => (
  <div 
    className="navLogo" 
    onClick={() => <Redirect to="/main" />}>
    프로젝트 명 및 이미지
    <img src="" alt="우리 웹 사이트 마크"/>
  </div>
);

export default withRouter(Logo);