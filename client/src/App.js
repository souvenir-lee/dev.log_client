import React from "react";
import {
  Switch,
  Route,
  useHistory,
  Router,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
// import Listup from "../src/Main/Listup";
import Login from "../src/Login";
import Signup from "../src/Signup";
import Mypage from "../src/Mypage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userinfo: {
        name: "",
        email: "",
      },
    };
    this.getUserData = this.getUserData.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }
  getUserData = (data) => {
    this.setState({ userinfo: data });
  };

  handleLoginClick = () => {
    this.setState({ isLogin: true });
  };
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/login"
            render={() => (
              <Login
                isLogin={this.state.isLogin}
                handleLoginClick={this.handleLoginClick}
              />
            )}
          />
          <Route
            path="/signup"
            render={() => <Signup isLogin={this.state.isLogin} />}
          />
          <Route
            path="/mypage"
            render={() => (
              <Mypage
                isLogin={this.state.isLogin}
                getUserData={this.getUserData}
              />
            )}
          />
          {/* <Listup /> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
