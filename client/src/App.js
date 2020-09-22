import React from "react";
// import { Switch, Route, Redirect } from "react-router-dom";
import Listup from "../src/Main/Listup";
import Login from "../src/Login";
import Signup from "../src/Signup";
import Mypage from "../src/Mypage";
/*
Login.js , Signup.js, Mypage.js Listup.js
1.Login.js 
*/
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
  }
  render() {
    return (
      <div>
        <Login />
        <Signup />
        <Mypage />
        <Listup />
      </div>
    );
  }
}

export default App;
