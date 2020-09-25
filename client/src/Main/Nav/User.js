/*
<a> or <submit> 상관없다, <li> 로 감싸기
1. 로그아웃을 클릭하면 {isLogin:false} + Login.js로 리다이렉트
2. 마이페이지를 클릭하면 Mypage.js로 리다이렉트
*/

import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isLogin, userinfo, getUserData, handleLoginClick } = this.props;
    return (
      <div>
        <button
          className="nav_logOut"
          onClick={() => {
            this.props.handleLoginClick();
            console.log("클랙 props", this.props.isLogin);
            this.props.history.push("/login");
            // axios.post('http://localhost:3000/users/logout')
            // .then(() => {
            //   this.props.handleLoginClick()
            //   this.props.history.push('/login') //변경된 API

            // })
            // .catch(error => console.log(error))
          }}
        >
          로그아웃
        </button>

        <button
          className="nav_myPage"
          onClick={() => {
            // console.log('user에서 userinfo',userinfo)
            // axios.get('http://localhost:3000/users/info/id', userinfo.email) //마이페이지로 리다이렉트
            // .then(res => {
            //   console.log(userinfo)
            //   getUserData(res)})
            // .then(()=>
            this.props.history.push("/mypage");
            // )
          }}
        >
          마이페이지
        </button>
      </div>
    );
  }
}

export default withRouter(User);
