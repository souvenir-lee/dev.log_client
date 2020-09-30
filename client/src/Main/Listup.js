import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Nav from "../Main/Nav/Nav";
import Category from "../Main/Category/Category";
import Contents from "../Main/Content/ContentList/Contents";
import Post from "../Main/Content/Post";
import ContentDetail from "../Main/Content/ContentDetail/ContentDetail";
import axios from "axios";
axios.defaults.withCredentials = true;
//import Scrap from "../src/Main/Scrap";

/*
 props = {
   isLogin:true,         
   userinfo:{{
        userId: "",
        username: "",
        email: "",
        token: "",
      }},          
   getUserData:{this.getUserData},    
   handleLoginClick:{this.handleLoginClick}
}
*/
class Listup extends React.Component {
  constructor(props) {
    super(props); //isLogin, userinfo, handleIsLoginChange
    this.state = {
      category: null, //여기를 나중에는 category id로 수정하기
      contentsList: [
        {
          id: "",
          //postId
          categoryId: "",
          username: "",
          title: "",
          message: "",
          view_count: "",
        },
      ],
      clickedContent: {
        id: null,
        categoryId: null,
        username: "디테일 username",
        title: "디테일 title",
        message: "디테일 message",
      },
      editBtn: false,
      //currentContent: {},
    };
    this.handleInputCategory = this.handleInputCategory.bind(this);
    this.handleContentList = this.handleContentList.bind(this);
    this.handleGetDefault = this.handleGetDefault.bind(this);
    this.handleClickedContent = this.handleClickedContent.bind(this);
    this.clickEditBtn = this.clickEditBtn.bind(this);
  }
  clickEditBtn = () => {
    this.setState({ editBtn: true });
  };

  handleClickedContent = (data) => {
    this.setState({ clickedContent: data });
  };

  // editDetail = (data) => {
  //   this.setState({
  //     contentsList: {
  //       username: data.username,
  //       title: data.title,
  //       message: data.message,
  //     },
  //   });
  // };

  //시작하자마자 전체 데이터 뿌려주는 함수 -> 주기함수 써야 함.
  componentDidMount() {
    this.handleGetDefault();
  }
  clickNewMessage() {
    this.props.history.push("/main/post");
  }

  //기본 contestList 불러오는 함수, category
  handleGetDefault = () => {
    //axios.get(`http://localhost:4000/posts/list`).then((res) => {
       axios.get(`https://devyeon.com/posts/list`).then((res) => {
      console.log(res.data);
      this.setState({ contentsList: res.data });
    });
  };

  //필터링된 contestList 불러오는 함수
  handleContentList = (value) => {
    //axios.get(`http://localhost:4000/posts/category/${value}`).then((res) => {
       axios.get(`https://devyeon.com/posts/category/${value}`).then((res) => {
      console.log(res.data);
      this.setState({ contentsList: res.data });
    });
  };

  //category state 끌어올리기
  handleInputCategory = (e) => {
    this.setState({ category: e.target.innerHTML });
    console.log("카테고리~!!!");
  };

  render() {
    const {
      isLogin,
      userinfo,
      serverinfo,
      handleLoginClick,
      getUserData,
      clickEditBtn,
    } = this.props;
    console.log("listup props", this.props);
    const {
      category,
      contentsList,
      handleClickedContent,
      handleGetDefault,
      editBtn,
      clickedContent,
    } = this.state;

    if (category === "전체보기") {
      this.handleGetDefault();
      this.setState({ category: null });
    } else if (category === "Grapefruit") {
      this.handleContentList("1");
      this.setState({ category: null });
    } else if (category === "Lime") {
      this.handleContentList("2");
      this.setState({ category: null });
    } else if (category === "Coconut") {
      this.handleContentList("3");
      this.setState({ category: null });
    } else if (category === "Mango") {
      this.handleContentList("4");
      this.setState({ category: null });
    }

    return (
      <div
        className="listup_body"
        style={{
          width: "400px",
          margin: "5px",
          border: "5px solid",
        }}
      >
        Listup에서 'Hello World'
        <Nav
          isLogin={isLogin}
          userinfo={userinfo}
          serverinfo={serverinfo}
          handleLoginClick={handleLoginClick}
          getUserData={getUserData}
        />
        <Category
          category={category}
          handleInputCategory={this.handleInputCategory}
        />
        <Switch>
          <Route
            exact
            path="/main/post"
            render={() => (
              <Post
                serverinfo={serverinfo}
                editBtn={editBtn}
                clickEditBtn={clickEditBtn}
              />
            )}
          ></Route>
          <Route
            exact
            path="/main"
            render={() => (
              <Contents
                // cateory={category} post에 카테고리가 필요한가?
                contentsList={contentsList}
                handleClickedContent={this.handleClickedContent}
                clickedContent={clickedContent}
                handleGetDefault={handleGetDefault}
                editBtn={editBtn}
                userinfo={userinfo}
              />
            )}
          ></Route>
          <Route
            exact
            path="/main/detail"
            render={() => (
              <ContentDetail
                cateory={category}
                contentsList={contentsList}
                clickEditBtn={clickEditBtn}
                clickedContent={clickedContent}
              />
            )}
          ></Route>
        </Switch>
        {/*
        <Scrap />*/}
      </div>
    );
  }
}

export default Listup;
