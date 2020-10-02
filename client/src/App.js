import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Listup from "../src/Main/Listup";
import Login from "../src/Login";
import Signup from "../src/Signup";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      token: "",
      userInfo: {
        userId: "",
        username: "",
      },
    };
    this.getUserData = this.getUserData.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  //로그인 시 userInfo를 끌어올리는 함수
  getUserData = (data) => {
    delete data.status;
    this.setState({
      token: data.token,
      userInfo: {
        ...data.userData,
      },
    });
  };

  //클릭하면 isLogin 번경
  handleLoginClick = () => {
    setTimeout(() => {
      this.setState({ isLogin: !this.state.isLogin });
    }, 1000);
  };

  render() {
    const { isLogin, token, userInfo } = this.state;

    return (
      <Switch>
        {isLogin ? (
          <Route
            path="/main"
            render={() => (
              <Listup
                isLogin={isLogin}
                userInfo={userInfo}
                token={token}
                getUserData={this.getUserData}
                handleLoginClick={this.handleLoginClick}
              />
            )}
          />
        ) : (
          ""
        )}
        <Route
          path="/login"
          render={() => (
            <Login
              isLogin={isLogin}
              userInfo={userInfo}
              token={token}
              getUserData={this.getUserData}
              handleLoginClick={this.handleLoginClick}
            />
          )}
        />
        <Route path="/signup" render={() => <Signup />} />

        <Route
          path="/"
          render={() => {
            if (!isLogin) return <Redirect to="/login" />;
          }}
        />
      </Switch>
    );
  }
}

export default App;
