import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import styled from "styled-components";

const NavLogo = styled.div`
  background: #02380e;
  color: #fff;
  font-size: 1em;
  font-family: "Nanum Gothic Coding";
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
`;
const LogoImg = styled.img`
  width: 150px;
  height: 80px;
  padding-right: 20px;
`;

const Logo = ({
  handleContentList,
  isDetail,
  newPost,
  editPost,
  handleIsDetail,
  clickNewPost,
  clickEditPost,
}) => (
  <NavLogo
    className="navLogo"
    onClick={() => {
      {
        handleContentList(0);
        if (isDetail) {
          handleIsDetail();
        }
        if (newPost) {
          if (window.confirm("메인 화면으로 나가시겠어요?")) {
            clickNewPost();
          }
        }
        if (editPost) {
          if (window.confirm("메인 화면으로 나가시겠어요?")) {
            clickEditPost();
          }
        }
      }
    }}
  >
    <LogoImg
      src="dev-log.png"
      style={{ width: "100px" }}
      alt="우리 웹 사이트 마크"
    />
  </NavLogo>
);

export default withRouter(Logo);
