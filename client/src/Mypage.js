import React from "react";
function Mypage(props) {
  if (!props.isLogin) {
    return (
      <div className="mypage_body">
        <center>
          <h1>Mypage</h1>
          <div className="mypage_name">이름</div>
          {/* {this.props.userinfo.username} */}
          <div className="mypage_email">이메일</div>
          {/* {this.props.userinfo.email} */}
        </center>
      </div>
    );
  }
}
//랜더링 테스트를 위해 props.isLogin === false로 임시지정
export default Mypage;
