import React from "react";
import {
  Switch,
  Route,
  useHistory,
  Router,
  Redirect,
} from "react-router-dom";
import Listup from "../src/Main/Listup";
import Login from "../src/Login";
import Signup from "../src/Signup";
import Mypage from "../src/Mypage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true, //추후에 여기 바꾸기
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
    const { isLogin, userinfo } = this.state;
    return (
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
          <Route
          path='/main'
          render={() => {
            if(isLogin){
              return <Listup isLogin={isLogin} userinfo={userinfo} getUserData={this.getUserData} ></Listup> 
              
              //일단은 return으로 app.js에서 바로 보여주게 됨
              //return <Redirect to="/listup" />; //redirect를 해도 props가 가나?
            }
            return <Redirect to="/login" />;
          }}
          />
      </Switch>
    );
  }
}

export default App;
