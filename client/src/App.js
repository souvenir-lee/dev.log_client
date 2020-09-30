import React from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import Listup from "../src/Main/Listup";
import Login from "../src/Login";
import Signup from "../src/Signup";
import Mypage from "../src/Mypage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userinfo: {
        email: "",
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
  getUserData = (data) => {
    this.setState({
      userinfo: {
        email: data.email,
      },
    });
  };
  //로그인 시 serverinfo 끌어올리는 함수
  getServerData = (data) => {
    this.setState({
      serverinfo: {
        username: data.userData.username,
        token: data.token,
        userId: data.userData.id,
      },
    });
  };

  //클릭하면 isLogin 번경
  handleLoginClick = () => {
    this.setState({ isLogin: !this.state.isLogin }); 
  };

  render() {
    const { isLogin, userinfo, serverinfo } = this.state;
    return (
      <Switch>
        <Route
          path="/login" 
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
          render={() => <Signup />}
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
