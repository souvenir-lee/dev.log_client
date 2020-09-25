/*
<a>태그? 
1.Logo를 클릭하면 Listup.js로 리다이렉트
*/

import React from "react";
import axios from "axios";

const Logo = (props) => (
  <div 
    className="nav_logo" 
    onClick={() => {
      axios.get('http:localhost:3000/main') //이후에는 Listup.js로 리다이렉트
      .then(res => console.log(res))
      .catch(error => console.log(error))
    }}>
    프로젝트 명 및 이미지
    <img src="" alt="우리 웹 사이트 마크"/>
  </div>
);

export default Logo;