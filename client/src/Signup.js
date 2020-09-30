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
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
    this.postSignup = this.postSignup.bind(this);
  }

  //input 작성 내용을 state로 변경
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  //pw 체크
  checkPassword = (value) => {
    let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,12}$/; //  8 ~ 12자 영문, 숫자 조합
    return regExp.test(value); // 형식에 맞는 경우 true 리턴
  };

  //유저이름 적었는지 체크
  checkUsername = (value) => {
    let result = value !== "" ? true : false; //작성되어 있으면 true
    return result;
  };

  handleSignUp = () => {
    axios
      // .post("http://localhost:4000/users/emailconfirm", this.state.email)
       .post("https://devyeon.com/users/emailconfirm", this.state.email)
      .then((res) => {
        console.log('signup:res',res);
        if (res.status === 200) {
          alert("사용가능한 아이디입니다");
        }
      })
      .catch((err) => {
        alert("이미 아이디가 있습니다");
        console.log(err)
      });
  };

  postSignup = () => {
    // axios.post("http://localhost:4000/users/signup", this.state).then((res) => {
    axios.post("https://devyeon.com/users/signup", this.state).then((res) => {
      if (res.status === 201) {
        alert('회원가입이 완료되셨습니다')
        return <Redirect to="/login" />
      }
    });
  };

  //소셜 로그인 회원가입 함수
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
              <span style={{ color: "red" }}>영문,숫자 조합 8-12글자 입력</span>
            )}
          </div>
          <button
            className="signup_btn"
            onClick={() => {
              this.props.history.push("/login");
            }}
          >
            메인으로
          </button>
          <button
            className="signup_btn"
            onClick={() => {
              this.postSignup();
              //this.props.history.push("/login");
            }}
          >
            회원가입
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
