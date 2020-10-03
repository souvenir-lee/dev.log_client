import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = "include";

class User extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { handleLoginClick, handleMypage, token, userInfo } = this.props;

    return (
      <div className="userArea">
        <button
          id="logoutBtn"
          onClick={() => {
            axios
              .post("https://devyeon.com/users/logout", {
                token: token,
              })
              .then((result) => {
                handleLoginClick();
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
              .post("https://devyeon.com/users/info", {
                token: token,
              })
              .then((res) => {
                handleMypage();
              });
          }}
        >
          마이페이지
        </button>
      </div>
    );
  }
}

export default withRouter(User);
