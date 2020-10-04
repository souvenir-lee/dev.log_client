import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
axios.defaults.withCredentials = "include";

const GithubPng = styled.img`
  border-radius: 10px;
  width: 35px;
  height: 30px;
`;
const NaverPng = styled.img`
  border-radius: 10px;
  width: 35px;
  height: 30px;
`;
const InputContainer = styled.div`
  width: 600px;
  height: 700px;
  mairgin: 0 auto;
  margin-top: 10vh;
  background: #ffffff;
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.25);
`;
const InputLogin = styled.input`
  width: 300px;
  height: 30px;
  letter-spacing: 1px;
  text-align: center;
  margin-bottom: 10px;
`;
const LoginBtn = styled.button`
background:#F1C40F;
color:#fff;
border:none;
width: 200px;
height:30px;
font-size:1em;
margin-bottom:10px;
border-radius: 10px;
box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
}
`;
const GithubBtn = styled.button`
  background: #000000;
  border: none;
  width: 80px;
  height: 35px;
  margin-bottom: 10px;
  margin-right: 20px;
  border-radius: 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
`;
const NaverBtn = styled.button`
  background: #0ece3a;
  border: none;
  width: 80px;
  height: 35px;
  font-size: 0.8em;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
`;
const SignupBtn = styled.button`
  background: #fff;
  color: #000000;
  border: none;
  width: 80px;
  height: 25px;
  font-size: 1em;
  text-shadow: 2px 2px #c8c8c8;
`;

class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {};
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleGithubLogin = this.handleGithubLogin.bind(this);
    this.handleNaverLogin = this.handleNaverLogin.bind(this);
    this.loginEnter = this.loginEnter.bind(this);
  }

  //input 마다 상태가 변경
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  //로그인 함수
  handleLogin() {
    axios
      .post("https://devyeon.com/users/login", this.state)
      .then((res) => {
        console.log(this.state);
        if (res.status === 200) {
          if (res.data.token) {
            this.props.getUserData(res.data);
            this.props.handleLoginClick();
          }
        }
      })
      .catch(() => alert("정보를 다시 확인해주세요"));
  }

  handleGithubLogin() {
    axios
      .post(`https://devyeon.com/users/login`, {
        email: "github@social.com",
        password: "1111",
      })
      .then((res) => {
        console.log(this.state);
        if (res.status === 200) {
          if (res.data.token) {
            this.props.getUserData(res.data);
            this.props.handleLoginClick();
          }
        }
      })
      .catch(() => alert("정보를 다시 확인해주세요"));
  }

  handleNaverLogin() {
    axios
      .post(`https://devyeon.com/users/login`, {
        email: "naver@social.com",
        password: "1111",
      })
      .then((res) => {
        console.log(this.state);
        if (res.status === 200) {
          if (res.data.token) {
            this.props.getUserData(res.data);
            this.props.handleLoginClick();
          }
        }
      })
      .catch(() => alert("정보를 다시 확인해주세요"));
  }

  loginEnter = () => (e) => {
    if (e.charCode === 13) {
      this.handleLogin();
    }
  };

  render() {
    return (
      <div className="container" id="login">
        {this.props.isLogin ? <Redirect to="/main" /> : ""}
        <center>
          <InputContainer>
            <img
              src="dev-log.png"
              alt="dev-log 로고"
              style={{ width: "300px", "margin-top": "10px" }}
            />
            <h1>Log In</h1>
            <div>
              <InputLogin
                id="loginEmail"
                type="email"
                placeholder="이메일을 입력 해주세요"
                onChange={this.handleInputValue("email")}
              ></InputLogin>
            </div>
            <div>
              <InputLogin
                id="loginPw"
                type="password"
                placeholder="비밀번호를 입력 해주세요"
                onChange={this.handleInputValue("password")}
                onKeyPress={this.loginEnter()}
              ></InputLogin>
            </div>
            <LoginBtn
              id="loginBtn"
              onClick={() => {
                this.handleLogin();
              }}
            >
              로그인
            </LoginBtn>
            <div className="loginSocial">
              <GithubBtn
                id="githubLoginBtn"
                type="submit"
                onClick={() => {
                  this.handleGithubLogin();
                }}
              >
                <GithubPng src="github2.png" alt="" />
              </GithubBtn>
              <NaverBtn
                id="naverLoginBtn"
                type="submit"
                onClick={() => {
                  this.handleNaverLogin();
                }}
              >
                <NaverPng src="naver.png" alt="" />
              </NaverBtn>
            </div>
            <div>
              <SignupBtn
                id="goToSignupBtn"
                onClick={() => {
                  //클릭했을때 /signup으로 이동
                  this.props.history.push("/signup");
                  console.log("getdata", this.state);
                }}
              >
                signup
              </SignupBtn>
            </div>
          </InputContainer>
        </center>
      </div>
    );
  }
}
export default withRouter(Login);
