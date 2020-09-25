/*
1. email, pw를 입력을 한다. 
2. email, pw를 서버쪽으로 요청
3. Signin버튼 누르면 email, pw 확인 후 Listup.js로 리다이렉트 한다/ 확인이 되지 않을 경우 false
4. Signup버튼 누르면 Signup.js로 리다이렉트
5. 상태변경(App.js를 통해 상태를 true로 바꿔준다)
*/
import React from "react";
import { Link, Route, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
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
      success: false,
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };
  handleLogin = (history) => {
    axios.post("url", this.state).then((res) => {
      if (res.status === 200) {
        this.setState({ success: true });
      }
      //   this.props.getUserData(res.data);
    });
  };

  //여기서부터는 Post 메소드
  /*
  this.state={
      category: "",
      title: "",
      message: "",
      tag: [],
      success: false,
  }
  */

  handlePost = () => {
    axios.post("url", this.state).then((res) => {
      if (res.status === 200) {
        this.setState({ success: true });
      }
    });
  };

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
          {/* onChange 부분 이해 필요 */}
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
              this.handleLogin();
              this.props.getUserData(this.state.email)
              this.props.handleLoginClick();
              this.props.history.push("/main");
            }}
          >
            로그인
          </button>
          <div className="login_social">
            <button className="login_google" type="submit">
              Google
            </button>
            <button className="login_github" type="submit">
              Github
            </button>
          </div>
          <div>
            <button
              className="login_btnSignuUp"
              onClick={() => {
                //클릭했을때 /signup으로 이동
                this.props.history.push("/signup");
                console.log('getdata',this.state)
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
