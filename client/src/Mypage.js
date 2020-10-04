import React from "react";
import styled from "styled-components";

const MypageStyle = styled.div`
  width: 600px;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  color: black;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  margin: 50px 5px 10px;
`;

function Mypage({ isLogin, token, userInfo, handleMypage }) {
  return (
    <center>
      <MypageStyle className="container" id="mypage">
        <img
          src="dev-log.png"
          alt="dev-log 로고"
          style={{ width: "200px", margin: "10px" }}
        />
        <h1>Mypage</h1>
        <UserInfo id="mypageUsername">이름 : {userInfo.username}</UserInfo>
        <UserInfo id="mypageEmail">Email : {userInfo.email}</UserInfo>
        <Button onClick={handleMypage}>메인으로</Button>
      </MypageStyle>
    </center>
  );
}
export default Mypage;
