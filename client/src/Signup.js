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
      name: "",
      email: "",
      password: "",
      success: false,
    };
    this.handleInputValue = this.handleInputValue.bind(this);
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
  render() {
    return (
      <div>
        <center>
          <h1>Sign Up</h1>
          <div>
            <input
              type="name"
              placeholder="이름을 입력 해주세요"
              onChange={this.handleInputValue("name")}
            ></input>
          </div>
          <div>
            <input
              type="email"
              placeholder="이메일을 입력 해주세요"
              onChange={this.handleInputValue("email")}
            ></input>
            <button
              onClick={() => {
                this.handleSignUp();
              }}
            >
              중복확인
            </button>
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호를 입력 해주세요"
              onChange={this.handleInputValue("password")}
            ></input>
          </div>
          <button
            onClick={() => {
              this.props.history.push("/login");
            }}
          >
            Sign Up
          </button>
          <div>
            <button type="submit">Google</button>
            <button type="submit">Github</button>
          </div>
        </center>
      </div>
    );
  }
}
export default withRouter(Signup);
