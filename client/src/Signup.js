/*
state :{
    name : null,
    email : null,
    pw : null
    success : false
}
1. name, email, pw를 입력을 한다. 
2. name, email, pw를 서버쪽으로 요청
3. 중복확인 버튼을 눌러서 name, email, pw 확인 후(success:true) alert"사용가능합니다"/ 확인이 되지 않을 경우 alert"이미존재하는 아이디 입니다"
4. Signup버튼 누르면  Logi.js로 리다이렉트

*/
import React from "react";
import { Link, Route, Redirect, withRouter } from "react-router-dom";
import axios from "axios";

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      success: false,
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.postSignup = this.postSignup.bind(this);
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };
  handleSignUp = () => {
    axios
      .post("http://localhost:4000/signup", this.state)
      .then((res) => {
        if (res.status === 200) {
          alert("사용가능한 아이디입니다");
          this.setState({ success: true });
        } else if (res.status === 409) {
          alert("이미 아이디가 있습니다");
        } else {
          alert("처리되지 않은 오류입니다");
        }
        //res가 왔을때 오류
      })
      .catch(() => {
        alert("오류발생");
      });
    //res가 오지 않았을 때 오류
  };
  postSignup = () => {
    axios.post("url", this.state).then((res) => {
      if (res.status === 200) {
        if (res.res.social_user_id) {
          this.setState({ success: true });
        }
      }
    });
  };
  signupWithGithub = () => {};
  render() {
    return (
      <div className="signup_body">
        <center>
          <h1>Sign Up</h1>
          <div>
            <input
              className="signup_name"
              type="username"
              placeholder="이름을 입력 해주세요"
              onChange={this.handleInputValue("username")}
            ></input>
          </div>
          <div>
            <input
              className="signup_email"
              type="email"
              placeholder="이메일을 입력 해주세요"
              onChange={this.handleInputValue("email")}
            ></input>
            <button
              className="signup_check"
              onClick={() => {
                this.handleSignUp();
              }}
            >
              중복확인
            </button>
          </div>
          <div>
            <input
              className="signup_pw"
              type="password"
              placeholder="비밀번호를 입력 해주세요"
              onChange={this.handleInputValue("password")}
            ></input>
          </div>
          <button
            className="signup_btn"
            onClick={() => {
              this.postSignup();
              this.props.history.push("/login");
            }}
          >
            Sign Up
          </button>
          <div className="signup_social">
            <button
              className="signup_btnGoogle"
              type="submit"
              onClick={() => {}}
            >
              Google
            </button>
            <button
              className="signup_btnGithub"
              type="submit"
              onClick={() => {}}
            >
              Github
            </button>
          </div>
        </center>
      </div>
    );
  }
}
export default withRouter(Signup);
