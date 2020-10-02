import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Listup from "../src/Main/Listup";
import Login from "../src/Login";
import Signup from "../src/Signup";
import "./App.css";
import axios from "axios";
axios.defaults.withCredentials = "include";
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
      categoryId: null,
      contentsList: [
        {
          id: "", //postId
          categoryId: "",
          username: "",
          title: "",
          message: "",
          view_count: "",
        },
      ],
    };
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.getUserData = this.getUserData.bind(this);
  }
  //로그인 시 userInfo를 끌어올리는 함수
  getUserData = (data) => {
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
    }, 500);
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
              token={token}
              userInfo={userInfo}
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
