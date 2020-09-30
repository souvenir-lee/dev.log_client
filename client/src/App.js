import React from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import Listup from "../src/Main/Listup";
import Login from "../src/Login";
import Signup from "../src/Signup";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userInfo: {
        userId: "",
        username: "",
        token: "",
      },
    };
    this.getUserData = this.getUserData.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  //로그인 시 userInfo를 끌어올리는 함수
  getUserData = (data) => {
    this.setState({
      userInfo: {
        userId: data.userData.id,
        username: data.userData.username,
        token: data.token,
      },
    });
  };

  //클릭하면 isLogin 번경
  handleLoginClick = () => {
    this.setState({ isLogin: !this.state.isLogin }); 
  };

  render() {
    const { isLogin, userInfo } = this.state;
    return (
      <Switch>
        <Route
          path="/login" 
          render={() => (
            <Login
              isLogin={isLogin}
              userInfo={userInfo}
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
          path="/main"
          render={() => (
            <Listup
              isLogin={isLogin}
              userInfo={userInfo}
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
