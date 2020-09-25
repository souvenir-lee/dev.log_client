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
      isLogin: false, //추후에 여기 바꾸기
      userinfo: {
        name: "",
        email: "",
      },
    };
    this.getUserData = this.getUserData.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  //로그인 시 userinfo를 끌어올리는 함수
  getUserData = (data) => {
    this.setState({ 
      userinfo: {
        email : data,
        name : data} });
  };

  handleLoginClick = () => {
    this.setState({ isLogin: this.state.isLogin }); //추후에는 클릭할 때마다 상태변겅하도록
  };
  render() {
    const { isLogin, userinfo } = this.state;
    return (
      <Switch>
        <Route
          path="/login"  //변경됨
          render={() => (
            <Login
              isLogin={isLogin}
              userinfo={userinfo}
              getUserData={this.getUserData}
              handleLoginClick={this.handleLoginClick}
            />
          )}
        />
        <Route
          path="/signup"
          render={() => <Signup isLogin={isLogin} />}
        />
        <Route
          path="/mypage"
          render={() => <Mypage isLogin={isLogin} userinfo={userinfo}/>}
        />
          <Route
          path='/main'
          render={() => {
            if(!isLogin){ //임시로 여기 수정해둠
              return <Listup isLogin={isLogin} userinfo={userinfo} getUserData={this.getUserData} handleLoginClick={this.handleLoginClick} ></Listup> 
            }
            return <Redirect to="/users/login" />;
          }}
          />
      </Switch>
    );
  }
}

export default App;
