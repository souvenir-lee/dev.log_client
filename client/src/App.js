import React from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import Listup from "../src/Main/Listup";
import Login from "../src/Login";
import Signup from "../src/Signup";
import Mypage from "../src/Mypage";

//branch test!!

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userinfo: {
        username: "",
        email: "",
        token: ""
        //여기에 토큰을 만들어야 할것 같아요
      },
    };
    this.getUserData = this.getUserData.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  //로그인 시 userinfo를 끌어올리는 함수
  //한슬 -> 이부분 수정한적 있는지?
  getUserData = (data) => {
    this.setState({
      userinfo: {
        email: data.email,
        username: data.username,
        token: data.token
        //여기에 토큰을 만들어야 할것 같아요
      },
    });
  };

  handleLoginClick = () => {
    this.setState({ isLogin: !this.state.isLogin }); //추후에는 클릭할 때마다 상태변겅하도록
  };
  render() {
    const { isLogin, userinfo } = this.state;
    return (
      <Switch>
        <Route
          path="/login" //변경됨
          render={() => (
            <Login
              isLogin={isLogin}
              userinfo={userinfo}
              getUserData={this.getUserData}
              handleLoginClick={this.handleLoginClick}
            />
          )}
        />
        <Route path="/signup" render={() => <Signup isLogin={isLogin} />} />
        <Route
          path="/mypage"
          render={() => <Mypage isLogin={isLogin} userinfo={userinfo} />}
        />
        <Route 
          path="/main"
          render={() => 
          <Listup
            isLogin={isLogin}
            userinfo={userinfo}
            getUserData={this.getUserData}
            handleLoginClick={this.handleLoginClick}
          />}
        />
        <Route 
          path="/"
          render={() => {
            if(isLogin) {
              return <Redirect to="/main" />;
            }
            return <Redirect to="/login" />
          }}
        />
      </Switch>
    );
  }
}

export default App;
