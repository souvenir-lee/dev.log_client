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
      //success가 필요한가?
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
    this.postSignup = this.postSignup.bind(this);
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  //pw 체크
  checkPassword = (value) => {
    let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,12}$/; //  8 ~ 12자 영문, 숫자 조합
    return regExp.test(value); // 형식에 맞는 경우 true 리턴
  };

  //유저이름 적었는지 체크
  checkUsername = (value) => {
    let result = value !== "" ? true : false; //작성되어 있으면 true
    return result;
  };

  handleSignUp = () => {
    axios

      .post("http://localhost:4000/users/emailconfirm", this.state.email)
      // .post("https://devyeon.com/users/emailconfirm", this.state.email)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("사용가능한 아이디입니다");
          this.setState({ success: true });
          //여기 아래는 안됨
        } else if (res.status === 409) {
          alert("이미 아이디가 있습니다");
        } else {
          alert("처리되지 않은 오류입니다");
        }
        //res가 왔을때 오류
      })
      .catch((err) => {
        alert("이미 아이디가 있습니다");
        //alert("오류발생");
      });
    //res가 오지 않았을 때 오류
  };

  postSignup = () => {
    axios.post("http://localhost:4000/users/signup", this.state).then((res) => {
      // axios.post("https://devyeon.com/users/signup", this.state).then((res) => {
      if (res.status === 200) {
        if (res.social_user_id) {
          //social_user_id? 복습필요
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
            {this.checkUsername(this.state.username) ? (
              <span style={{ color: "green" }}>
                <img src="tick.png" width="15em" />
                확인
              </span>
            ) : (
              <span style={{ color: "red" }}>유저 이름을 입력해주세요</span>
            )}
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
            {this.checkPassword(this.state.password) ? (
              <span style={{ color: "green" }}>
                <img src="tick.png" width="15em" />
                확인
              </span>
            ) : (
              <span style={{ color: "red" }}>영문+숫자 조합 8-12글자 입력</span>
            )}
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
