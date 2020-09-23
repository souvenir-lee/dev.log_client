import React from "react";
function Mypage(props) {
  if (!props.isLogin) {
    return (
      <div>
        <center>
          <h1>Mypage</h1>
          <div className="">이름</div>
          {/* {props.userinfo.name} */}
          <div className="">이메일</div>
          {/* {props.userinfo.email} */}
        </center>
      </div>
    );
  }
  // else {
  //   return (
  //     <div>
  //       <h1 className="not_found">NOT FOUND</h1>
  //     </div>
  //   );
  // }
}
//랜더링 테스트를 위해 props.isLogin === false로 임시지정
export default Mypage;
