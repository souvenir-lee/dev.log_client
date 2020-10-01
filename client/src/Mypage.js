import React from "react";
function Mypage({isLogin, token, userInfo}) {
  return (
    <div className="container" id="mypage">
      <center>
        <h1>Mypage</h1>
        <div id="mypageUsername">이름 : {userInfo.username}</div>
        {/* {this.props.userInfo.username} */}
        <div id="mypageEmail">Email : {userInfo.email}</div>
        {/* {this.props.userInfo.email} */}
      </center>
      {/* 메인으로 돌아가는 버튼 필요 */}
    </div>
  );
}
export default Mypage;
