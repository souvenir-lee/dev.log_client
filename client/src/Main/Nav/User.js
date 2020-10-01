import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = "include";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      isMypage : false
    }
  }

  render() {
    const {
      isLogin,
      token,
      isMypage,
      userInfo,
      handleMypage,
      getUserData,
      handleLoginClick,
    } = this.props;

    return (
      <div className="userArea">
      {(!isLogin) ? <Redirect to="/login" /> : ''}
      {(isMypage) ? <Redirect to="/mypage" /> : ''}

        <button
          id="logoutBtn"
          onClick={() => {
            console.log("클랙 props", this.props.userInfo);
            axios
              .post("http://localhost:4000/users/logout")
              //axios.post('https://devyeon.com/users/logout', token)
              .then((result) => {
                getUserData(result)
                handleLoginClick(); //로그아웃 되었을 때 토큰 없애기
              })
              .catch((error) => console.log(error));
          }}
        >
          로그아웃
        </button>

        <button
          id="mypageBtn"
          onClick={() => {
            console.log("user에서 userInfo", userInfo);
            axios
              .get("http://localhost:4000/users/info", userInfo.token) //마이페이지로 리다이렉트
              //.get("https://devyeon.com/users/info",) //마이페이지로 리다이렉트
              .then((res) => {
                handleMypage()
              })
          }}
        >
          마이페이지
          {/* <Link to='/mypage'> */}
        </button>
      </div>
    );
  }
}

export default withRouter(User);
