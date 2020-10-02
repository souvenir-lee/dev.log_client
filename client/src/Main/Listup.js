import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Nav from "../Main/Nav/Nav";
import Category from "../Main/Category/Category";
import Contents from "../Main/Content/ContentList/Contents";
import Post from "../Main/Content/Post";
import ContentDetail from "../Main/Content/ContentDetail/ContentDetail";
import Mypage from "../Mypage";
import Custom from "../Main/Custom/Custom";
import axios from "axios";
axios.defaults.withCredentials = "include";

class Listup extends React.Component {
  constructor(props) {
    super();
    this.state = {
      categoryId: 0,
      category: "전체보기",
      contentsList: [],
      clickedContent: {
        id: "",
        categoryId: "",
        username: "",
        title: "",
        message: "",
      },
      newPost: false,
      editBtn: false,
      customListOp: "scrap",
      //currentContent: {},
      // isMypage: false
    };
    this.handleContentList(this.state.categoryId);

    this.handleInputCategory = this.handleInputCategory.bind(this);
    this.handleContentList = this.handleContentList.bind(this);
    this.handleClickedContent = this.handleClickedContent.bind(this);

    this.clickNewMessage = this.clickNewMessage.bind(this);
    this.clickEditBtn = this.clickEditBtn.bind(this);
    this.handleSearchList = this.handleSearchList.bind(this);
  }
  //category state 끌어올리기
  handleInputCategory = (e) => {
    const list = ["전체보기", "Grapefruit", "Lime", "Coconut", "Mango"];
    this.setState({ category: e.target.innerHTML });
    this.setState(
      {
        categoryId: list.indexOf(e.target.innerHTML),
      },
      () => this.handleContentList(this.state.categoryId)
    );
  };
  //필터링된 contentList 불러오는 함수
  handleContentList = (value) => {
    console.log(value);
    value !== 0
      ? axios.get(`https://devyeon.com/posts/category/${value}`).then((res) => {
          console.log(res.data);
          this.setState({ contentsList: res.data });
        })
      : axios.get(`https://devyeon.com/posts/list`).then((res) => {
          this.setState({ contentsList: res.data });
          console.log(res.data);
        });
  };

  handleClickedContent = (data) => {
    this.setState({ clickedContent: data });
  };

  //새글 쓰기 리다이렉트
  clickNewMessage = () => {
    this.setState({ newPost: !this.state.newPost });
  };

  clickEditBtn = () => {
    this.setState({ editBtn: true });
  };

  //검색된 contentList 불러오는 함수
  handleSearchList = (value) => {
    axios.get(`https://devyeon.com/search/title/${value}`).then((res) => {
      console.log(res.data);
      this.setState({ contentsList: res.data });
    });
  };

  render() {
    const {
      getUserData,
      handleLoginClick,
      isLogin,
      token,
      userInfo,
      isMypage,
      handleMypage,
    } = this.props;

    const {
      category,
      categoryId,
      clickedContent,
      contentsList,
      customListOp,
      editBtn,
      newPost,
    } = this.state;

    const {
      handleInputCategory,
      handleGetDefault,
      handleContentList,
      handleClickedContent,
      clickNewMessage,
      clickEditBtn,
      handleSearchList,
    } = this;

    return (
      <div id="outer">
        {console.log("rendered listup")}
        {isMypage ? (
          <Switch>
            {console.log("route is mypage")}
            <Redirect to="/mypage" render={() => <Mypage />} />
          </Switch>
        ) : (
          <Redirect to="/main" />
        )}
        <Nav
          isLogin={isLogin}
          token={token}
          isMypage={isMypage}
          userInfo={userInfo}
          handleMypage={handleMypage}
          handleLoginClick={handleLoginClick}
          getUserData={getUserData}
          handleSearchList={handleSearchList}
        />
        <div className="container" id="main">
          {newPost ? <Redirect to="/main/post" /> : ""}
          <Category
            token={token}
            categoryId={categoryId}
            category={category}
            handleInputCategory={handleInputCategory}
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
                  category={category}
                  token={token}
                  userInfo={userInfo}
                  contentsList={contentsList}
                  clickedContent={clickedContent}
                  newPost={newPost}
                  editBtn={editBtn}
                  handleClickedContent={handleClickedContent}
                  clickNewMessage={clickNewMessage}
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
          </Switch>
          <Custom userInfo={userInfo} token={token} />
          {console.log("-----")}
        </div>
      </div>
    );
  }
}
export default Listup;
