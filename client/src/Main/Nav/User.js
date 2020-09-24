/*
<a> or <submit> 상관없다, <li> 로 감싸기
1. 로그아웃을 클릭하면 {isLogin:false} + Login.js로 리다이렉트
2. 마이페이지를 클릭하면 Mypage.js로 리다이렉트
*/

import React from "react";
import Mypage from "../../Mypage"
import axios from "axios";
import { render } from "react-dom";

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {isLogin, userinfo, handleIsLoginChange} = this.props;
    return (
      <div>
        <button 
          className="nav_logOut" 
          onClick={() => {
            axios.post('https://www.naver.com/') 
            .then(() => {
              this.props.handleIsLoginChange()
              this.props.history.push('/')
              
            })
            .catch(error => console.log(error))
          }}>
          로그아웃
        </button>

        <button 
          className="nav_myPage"
          onClick={() => {
            console.log('user에서 userinfo',userinfo)
            axios.get('https://www.naver.com/') //마이페이지로 리다이렉트
            .then(() => console.log(userinfo))
            /*.then((res) => {
              console.log(res.data)
              this.setState{ userinfo: res.data}})
              .then(() => {
              this.props.history.push('/mypage'); //임의로 API 지정해봄
            })         //API 확인되면 이것으로 */
          }}>
          마이페이지
        </button>
      </div>
    )
  }
} 

export default User;