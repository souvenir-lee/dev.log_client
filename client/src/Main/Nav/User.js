import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
axios.defaults.withCredentials = "include";

const UserBtn = styled.button`
  background: #02380e;
  color: #fff;
  border: none;
  width: 100px;
  height: 10px;
  font-size: 1em;
  margin-right: 5px;
  font-family: "Nanum Gothic Coding";
`;

class User extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { handleLoginClick, handleMypage, token, userInfo } = this.props;

    return (
      <div className="userArea">
        <UserBtn
          id="logoutBtn"
          onClick={() => {
            axios
              .post("http://localhost:4000/users/logout", {
                token: token,
              })
              .then((result) => {
                handleLoginClick();
              })
              .catch((error) => console.log(error));
          }}
        >
          로그아웃
        </UserBtn>

        <UserBtn
          id="mypageBtn"
          onClick={() => {
            console.log("user에서 userInfo", userInfo);
            axios
              .post("http://localhost:4000/users/info", {
                token: token,
              })
              .then((res) => {
                handleMypage();
              });
          }}
        >
          마이페이지
        </UserBtn>
      </div>
    );
  }
}

export default withRouter(User);
