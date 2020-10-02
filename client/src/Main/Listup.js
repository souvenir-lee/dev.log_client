import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Nav from "../Main/Nav/Nav";
import Category from "../Main/Category/Category";
import Contents from "../Main/Content/ContentList/Contents";
import Post from "../Main/Content/Post";
import ContentDetail from "../Main/Content/ContentDetail/ContentDetail";
import axios from "axios";
import Custom from "../Main/Custom/Custom";
import Mypage from "../Mypage";
axios.defaults.withCredentials = "include";

class Listup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: 0,
      category: "전체보기",
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
      clickedContent: {
        id: "",
        categoryId: "",
        username: "",
        title: "",
        message: "",
      },
      newPost: false,
      editBtn: false,
      //currentContent: {},
      customListOp: "scrap",
    };
    this.handleClickedContent = this.handleClickedContent.bind(this);
    this.clickNewMessage = this.clickNewMessage.bind(this);
    this.clickEditBtn = this.clickEditBtn.bind(this);
  }

  clickEditBtn = () => {
    this.setState({ editBtn: true });
  };

  handleClickedContent = (data) => {
    this.setState({ clickedContent: data });
  };

  //새글 쓰기 리다이렉트
  clickNewMessage = () => {
    this.setState({ newPost: !this.state.newPost });
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

  //새글 쓰기 리다이렉트
  clickNewMessage = () => {
    this.setState({ newPost: !this.state.newPost });
  };

  //기본 contestList 불러오는 함수, category
  handleGetDefault = () => {
    axios.get(`http://localhost:4000/posts/list`).then((res) => {
      // axios.get(`https://devyeon.com/posts/list`).then((res) => {
      console.log(res.data);
      this.setState({ contentsList: res.data });
    });
  };

  //필터링된 contestList 불러오는 함수
  handleContentList = (value) => {
    axios.get(`http://localhost:4000/posts/category/${value}`).then((res) => {
      // axios.get(`https://devyeon.com/posts/category/${value}`).then((res) => {
      console.log(res.data);
      this.setState({ contentsList: res.data });
    });
  };

  //category state 끌어올리기
  handleInputCategory = (e) => {
    const list = ["전체보기", "Grapefruit", "Lime", "Coconut", "Mango"];
    this.setState({ category: e.target.innerHTML });
    this.setState({
      categoryId: list.indexOf(e.target.innerHTML),
    });
    // console.log("카테고리~!!!");
  };

  render() {
    const {
      isLogin,
      isMypage,
      token,
      userInfo,
      // categoryId,
      // contentsList,
      // handleGetDefault,
      // handleInputCategory,
      // handleContentList,
      getUserData,
      handleMypage,
      handleLoginClick,
    } = this.props;
    console.log("listup props", this.props);
    const {
      categoryId,
      category,
      contentsList,
      clickedContent,
      handleClickedContent,
      handleGetDefault,
      clickEditBtn,
      newPost,
      editBtn,
    } = this.state;

    return (
      <div id="outer">
        <Nav
          isLogin={isLogin}
          token={token}
          isMypage={isMypage}
          userInfo={userInfo}
          handleMypage={handleMypage}
          handleLoginClick={handleLoginClick}
          getUserData={getUserData}
        />

        <div className="container" id="main">
          {this.state.newPost ? <Redirect to="/main/post" /> : ""}
          <Category
            token={token}
            categoryId={categoryId}
            category={category}
            handleInputCategory={this.handleInputCategory}
          />

          <Switch>
            <Route
              exact
              path="/main/post"
              render={() => (
                <Post
                  userInfo={userInfo}
                  token={token}
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
                  // category={category} post에 카테고리가 필요한가?
                  token={token}
                  userInfo={userInfo}
                  contentsList={contentsList}
                  clickedContent={clickedContent}
                  newPost={newPost}
                  editBtn={editBtn}
                  handleClickedContent={this.handleClickedContent}
                  clickNewMessage={this.clickNewMessage}
                />
              )}
            ></Route>
            <Route
              exact
              path="/main/detail"
              render={() => (
                <ContentDetail
                  token={token}
                  userInfo={userInfo}
                  categoryId={categoryId}
                  clickedContent={clickedContent}
                  handleClickedContent={handleClickedContent}
                  clickEditBtn={clickEditBtn}
                />
              )}
            ></Route>
            <Route
              exact
              path="/mypage"
              render={() => (
                <Mypage isLogin={isLogin} token={token} userInfo={userInfo} />
              )}
            />
          </Switch>
          <Custom userInfo={userInfo} token={token} />
        </div>
      </div>
    );
  }
}

export default Listup;
