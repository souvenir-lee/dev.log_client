import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      isLogin,
      userinfo,
      getUserData,
      serverinfo,
      handleLoginClick,
    } = this.props;
    return (
      <div>
        <button
          className="nav_logOut"
          onClick={() => {
            //this.props.handleLoginClick();
            console.log("클랙 props", this.props.userinfo);
            http: axios
              .post("http://localhost:4000/users/logout")
              // axios.post('https://devyeon.com/users/logout',)
              .then(() => {
                handleLoginClick();
                this.props.history.push("/login"); //변경된 API
              })
              .catch((error) => console.log(error));
          }}
        >
          로그아웃
        </button>

        <button
          className="nav_myPage"
          onClick={() => {
            console.log("user에서 userinfo", userinfo);
            axios
              .get("http://localhost:4000/users/info", serverinfo.token) //마이페이지로 리다이렉트
              .then((res) => {
                console.log(res);
                getUserData(res);
              })
              .then(() => this.props.history.push("/mypage"));
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
