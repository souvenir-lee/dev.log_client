import React from "react";
import styled from "styled-components";

const MypageStyle = styled.div`
  width: 600px;
  height: 700px;
  mairgin: 0 auto;
  margin-top: 10vh;
  background: #ffffff;
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.25);
`;

const UserInfo = styled.div`
  margin: 10px;
`;

const Button = styled.button`
  width: 124px;
  height: 35px;
  background: #f1c40f;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  margin: 50px 5px 10px;
`;

function Mypage({ isLogin, token, userInfo, handleMypage }) {
  return (
    <center>
      <MypageStyle className="container" id="mypage">
        <h1>Mypage</h1>
        <div id="mypageUsername">이름 : {userInfo.username}</div>
        <div id="mypageEmail">Email : {userInfo.email}</div>
        <Button onClick={handleMypage}>메인으로</Button>
      </MypageStyle>
    </center>

  );
}
export default Mypage;
