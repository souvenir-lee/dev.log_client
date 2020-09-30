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
        email: "",
        //여기에 토큰을 만들어야 할것 같아요
      },
      serverinfo: {
        userId: "",
        username: "",
        token: "",
      },
    };
    this.getUserData = this.getUserData.bind(this);
    this.getServerData = this.getServerData.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  //로그인 시 userinfo를 끌어올리는 함수
  //한슬 -> 이부분 수정한적 있는지?
  getUserData = (data) => {
    this.setState({
      userinfo: {
        email: data.email,
      },
    });
  };

  getServerData = (data) => {
    this.setState({
      serverinfo: {
        username: data.userData.username,
        token: data.token,
        userId: data.userData.id,
      },
    });
  };

  handleLoginClick = () => {
    this.setState({ isLogin: !this.state.isLogin }); //추후에는 클릭할 때마다 상태변겅하도록
  };
  render() {
    const { isLogin, userinfo, serverinfo } = this.state;
    return (
      <Switch>
        <Route
          path="/login" //변경됨
          render={() => (
            <Login
              isLogin={isLogin}
              userinfo={userinfo}
              serverinfo={serverinfo}
              getServerData={this.getServerData}
              getUserData={this.getUserData}
              handleLoginClick={this.handleLoginClick}
            />
          )}
        />
        <Route
          path="/signup"
          render={() => <Signup isLogin={isLogin} serverinfo={serverinfo} />}
        />
        <Route
          path="/mypage"
          render={() => (
            <Mypage
              isLogin={isLogin}
              userinfo={userinfo}
              serverinfo={serverinfo}
            />
          )}
        />
        <Route
          path="/main"
          render={() => (
            <Listup
              isLogin={isLogin}
              userinfo={userinfo}
              serverinfo={serverinfo}
              getUserData={this.getUserData}
              handleLoginClick={this.handleLoginClick}
            />
          )}
        />
        <Route
          path="/"
          render={() => {
            if (isLogin) {
              return <Redirect to="/main" />;
            }
            return <Redirect to="/login" />;
          }}
        />
      </Switch>
    );
  }
}

export default App;
