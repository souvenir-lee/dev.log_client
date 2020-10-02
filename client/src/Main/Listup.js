import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Nav from "../Main/Nav/Nav";
import Category from "../Main/Category/Category";
import Contents from "../Main/Content/ContentList/Contents";
import Post from "../Main/Content/Post";
import ContentDetail from "../Main/Content/ContentDetail/ContentDetail";
import axios from "axios";
axios.defaults.withCredentials = "include";
//import Scrap from "../src/Main/Scrap";

class Listup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    const {
      isLogin,
      isMypage,
      token,
      userInfo,
      categoryId,
      contentsList,
      handleGetDefault,
      handleInputCategory,
      handleContentList,
      getUserData,
      handleMypage,
      handleLoginClick,
    } = this.props;
    console.log("listup props", this.props);
    const {
      clickedContent,
      editBtn,
      newPost,
      handleClickedContent,
      clickNewMessage,
      clickEditBtn,
    } = this.state;
    console.log(categoryId);

    if (categoryId === "전체보기") {
      this.props.handleGetDefault();
    } else if (categoryId === "Grapefruit") {
      handleContentList("1");
    } else if (categoryId === "Lime") {
      handleContentList("2");
    } else if (categoryId === "Coconut") {
      handleContentList("3");
    } else if (categoryId === "Mango") {
      handleContentList("4");
    }

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
            categoryId={categoryId}
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
                  // cateory={category} post에 카테고리가 필요한가?
                  token={token}
                  userInfo={userInfo}
                  contentsList={contentsList}
                  clickedContent={clickedContent}
                  newPost={newPost}
                  editBtn={editBtn}
                  handleClickedContent={this.handleClickedContent}
                  clickNewMessage={clickNewMessage}
                />
              )}
            ></Route>
            <Route
              exact
              path="/main/detail"
              render={() => (
                <ContentDetail
                  categoryId={categoryId}
                  token={token}
                  handleClickedContent={handleClickedContent}
                  contentsList={contentsList}
                  clickEditBtn={clickEditBtn}
                  clickedContent={clickedContent}
                  userInfo={userInfo}
                />
              )}
            ></Route>
          </Switch>
          {/*
          <Scrap />*/}
        </div>
      </div>
    );
  }
}

export default Listup;
