/*
state :{
    email : null,
    pw : null
    success : false
}
1. email, pw를 입력을 한다. 
2. email, pw를 서버쪽으로 요청
3. Signin버튼 누르면 email, pw 확인 후 Listup.js로 리다이렉트 한다/ 확인이 되지 않을 경우 false
4. Signup버튼 누르면 Signup.js로 리다이렉트
5. 상태변경(App.js를 통해 상태를 true로 바꿔준다)
*/

/* 임시로 넣어두는 파일*/
import React from "react";
import { Link, Redirect, Route, withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props); //isLogin

    this.state = {
      email: "",
      password: "",
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };
  render() {
    return (
      <div>
        <center>
          <h1>Sign In</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // 변경된 state를 서버로 보내기
              fetch('http://localhost:4000/signin',{ //여기 url은 무엇으로?
                method: "POST",
                body: JSON.stringify(this.state),
                headers: {
                  "Content-Type" : "application/json"
                },
                credentials: 'include',
              })
              .then(() => {
                this.props.handleLogin()
                this.props.history.push('/')
              })
              .catch((err) => {
                alert('Login falid')
                console.log(err)
              })
            }}
          >
            <div>
              <input
                style={{
                  width: "400px",
                  height: "30px",
                  margin: "5px",
                  borderRadius: "5px",
                }}
                type="email"
                placeholder="이메일을 입력 해주세요"
                onChange={this.handleInputValue("email")}
              ></input>
            </div>
            <div>
              <input
                style={{
                  width: "400px",
                  height: "30px",
                  margin: "5px",
                  borderRadius: "5px",
                }}
                type="password"
                placeholder="비밀번호를 입력 해주세요"
                onChange={this.handleInputValue("password")}
              ></input>
            </div>
            <div>
              <Link to="/signup">아직 아이디가 없으신가요?</Link>
            </div>
            <button
              style={{
                width: "200px",
                height: "30px",
                margin: "5px",
                borderRadius: "5px",
                backgroundColor: "skyblue",
              }}
              type="submit"
            >
              로그인
            </button>
          </form>
        </center>
      </div>
    );
  }
}

export default withRouter(Login);
