import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

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
      userInfo,
      getUserData,
      handleLoginClick,
    } = this.props;

    return (
      <div>
      {(!isLogin) ? <Redirect to="/login" /> : ''}
      {(this.state.isMypage) ? <Redirect to="/mypage" /> : ''}

        <button
          id="logoutBtn"
          onClick={() => {
            console.log("클랙 props", this.props.userInfo);
            //axios
              //.post("http://localhost:4000/users/logout")
              axios.post('https://devyeon.com/users/logout', userInfo.token)
              .then(() => {
                handleLoginClick();
                //this.props.history.push("/login"); //변경된 API
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
              //.get("http://localhost:4000/users/info", serverinfo.token) //마이페이지로 리다이렉트
              .get("https://devyeon.com/users/info",) //마이페이지로 리다이렉트
              .then((res) => {
                getUserData(res);
                this.setState({isMypage : !this.state.isMypage})
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
