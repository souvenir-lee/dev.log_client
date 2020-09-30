import React from "react";
function Mypage({isLogin, userInfo}) {
  return (
    <div className="container" id="mypage">
      <center>
        <h1>Mypage</h1>
        <div id="mypageUsername">{userInfo.username}</div>
        {/* {this.props.userInfo.username} */}
        <div id="mypageEmail">{userInfo.email}</div>
        {/* {this.props.userInfo.email} */}
      </center>
    </div>
  );
}
export default Mypage;
