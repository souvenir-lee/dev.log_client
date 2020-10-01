import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Listup from "../src/Main/Listup";
import Login from "../src/Login";
import Signup from "../src/Signup";
import Mypage from "./Mypage";
import "./App.css";
import axios from "axios";
axios.defaults.withCredentials = "include";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      isMypage :false,
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
    this.handleGetDefault = this.handleGetDefault.bind(this)
    this.handleContentList = this.handleContentList.bind(this)
    this.handleInputCategory = this.handleInputCategory.bind(this)
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.getUserData = this.getUserData.bind(this)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleMypage = this.handleMypage.bind(this)
  }

  componentDidMount() {
    this.handleGetDefault();
  }

  //기본 contestList 불러오는 함수, category
  handleGetDefault = () => {
    axios
      .get(`http://localhost:4000/posts/list`)
      .then((res) => {
        // axios.get('https://devyeon.com/posts/list').then((res) => {
        console.log(res.data);
        this.setState({ contentsList: res.data });
      })
      .catch((err) => console.log(err));
  };

  //필터링된 contestList 불러오는 함수
  handleContentList = (value) => {
    axios.get(`http://localhost:4000/posts/category/${value}`).then((res) => {
      // axios.get(`https://devyeon.com/posts/category/${value}`).then((res) => {
      console.log(res.data);
      this.setState({ contentsList: res.data });
      this.setState({ categoryId: null });
    });
  };

  //category state 끌어올리기
  handleInputCategory = (e) => {
    this.setState({ categoryId: e.target.innerHTML });
    console.log("카테고리~!!!");
  };


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
    setTimeout(
      () => {this.setState({ isLogin: !this.state.isLogin })}
      ,500) 
  };

  //마이페이지 바꾸기
  handleMypage = () => {
    this.setState({isMypage : !this.state.isMypage})
  }

  render() {
    const { isLogin, token, userInfo, categoryId, isMypage, contentsList } = this.state;
    return (
      <Switch>
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
        <Route
          path="/signup"
          render={() => <Signup />}
        />
        <Route
          path="/main"
          render={() => (
            <Listup
              isLogin={isLogin}
              isMypage={isMypage}
              token={token}
              userInfo={userInfo}
              categoryId={categoryId}
              contentsList={contentsList}
              handleGetDefault={this.handleGetDefault}
              handleInputCategory={this.handleInputCategory}
              handleContentList={this.handleContentList}
              getUserData={this.getUserData}
              handleLoginClick={this.handleLoginClick}
              handleMypage={this.handleMypage}
            />
          )}
        />
        <Route
          exact
          path="/mypage"
          render={() => (
            <Mypage isLogin={isLogin} userInfo={userInfo} token={token} />
          )}
        />
        <Route
          path="/"
          render={() => {
            if (isLogin) {
              if(isMypage) {
                return <Redirect to='/mypage' />
              }
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