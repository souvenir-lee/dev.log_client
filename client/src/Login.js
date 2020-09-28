/*
1. email, pw를 입력을 한다. 
2. email, pw를 서버쪽으로 요청
3. Signin버튼 누르면 email, pw 확인 후 Listup.js로 리다이렉트 한다/ 확인이 되지 않을 경우 false
4. Signup버튼 누르면 Signup.js로 리다이렉트
5. 상태변경(App.js를 통해 상태를 true로 바꿔준다)
*/
import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
/*
props={
    islogin : this.state.isLogin(false), 
    handleLoginClick : handleLoginClick()}
*/
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      token: "",
      success: false,
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };
  handleLogin = () => {
    axios.post("https://devyeon.com/users/login", this.state).then((res) => {
      console.log(this.state)
      if (res.status === 200) {
        if (res.data.token) {
          this.setState({ success: true });
          this.props.getUserData(res.data);
          this.props.getUserData(this.state);
          this.props.handleLoginClick();
          console.log(this.props.isLogin)
          this.props.history.push("/main");
        }
      } 
    })
    .catch(() => alert('정보를 다시 확인해주세요'))
  };
  handleghLogin = () => {};

  render() {
    return (
      <div className="login_body">
        <center>
          <img
            className="login_img"
            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2FMjAxODA3MDNfMTUy%2FMDAxNTMwNjA0NjkxNjYy.9hb0yxEe8attWVLyMOuKV4IcYIjlAoNH7t71Q1h3mNUg.m1L6H9rvWElrCXgXayG78ONe1FQ3msUJJl8q1Sea6qwg.JPEG.kingmold%2F%25B8%25BB%25C6%25BC%25C1%25EE_%25282%2529.jpg&type=sc960_832"
            alt=""
          />
          <h1>Sign In</h1>
          <div>
            <input
              className="login_email"
              type="email"
              placeholder="이메일을 입력 해주세요"
              onChange={this.handleInputValue("email")}
            ></input>
          </div>
          <div>
            <input
              className="login_pw"
              type="password"
              placeholder="비밀번호를 입력 해주세요"
              onChange={this.handleInputValue("password")}
            ></input>
          </div>
          <button
            className="login_btn"
            onClick={() => {
              // 클릭을 했을때 isLogin이 true가 되고 /links로 이동
              // 서버와 요청할 수 있는 함수
              // 먼저 서버에 post요청을 보내면, 서버쪽에서 200과 함께 토큰을 부여해줌
              this.handleLogin();
            }}
          >
            로그인
          </button>
          <div className="login_social">
            <button className="login_google" type="submit" onClick={() => {}}>
              Google
            </button>
            <button className="login_github" type="submit" onClick={() => {}}>
              Github
            </button>
          </div>
          <div>
            <button
              className="login_btnSignuUp"
              onClick={() => {
                //클릭했을때 /signup으로 이동
                this.props.history.push("/signup");
                console.log("getdata", this.state);
              }}
            >
              signup
            </button>
          </div>
        </center>
      </div>
    );
  }
}
export default withRouter(Login);
