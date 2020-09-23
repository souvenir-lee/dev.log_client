import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import Listup from "../src/Main/Listup";
import Login from "../src/Login";
import Signup from "../src/Signup";
/*
Login.js , Signup.js, Mypage.js Listup.js
1.Login.js 
*/
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
  }

  handleIsLoginChange() {
    this.setState({ isLogin: !this.state.isLogin });
    axios.get("http://localhost:4000/user").then((res) => {
      console.log(res.data);
      this.setState({ userinfo: res.data });
    });
  }

  render() {
    const { isLogin, userinfo } = this.state;
    return (
      <div>
       App.js에서'hello World'
        <Switch>
          <Route 
            path='/login' 
            render={()=> (
              <Login 
                isLogin={isLogin} 
                handleIsLoginChange={this.handleIsLoginChange.bind(this)}
              />)} 
          />
          <Route
            exact
            path='/singup'
            render={() => <Signup isLogin={isLogin} />}
            />
          <Route
            exact
            path='/mypage'
            render={() => <Signup isLogin={isLogin} userinfo={userinfo} handleIsLoginChange={this.handleIsLoginChange.bind(this)} />}
            />
          <Route
            path='/'
            render={() => {
              if(isLogin){
                return <Listup isLogin={isLogin} userinfo={userinfo} handleIsLoginChange={this.handleIsLoginChange.bind(this)} ></Listup> 
                
                //일단은 return으로 app.js에서 바로 보여주게 됨
                //return <Redirect to="/listup" />; //redirect를 해도 props가 가나?
              }
              return <Redirect to="/login" />;
            }}
            />
        </Switch>
      </div>
    );
  }
}

export default App;
