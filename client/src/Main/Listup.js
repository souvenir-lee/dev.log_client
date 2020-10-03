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
      categoryList: [],
      categoryId: 0,
      // category: "전체보기",
      contentsList: [],
      clickedContent: {},
      comments: [],

      newPost: false,
      editBtn: false,
      isDetail: false,
      // 다시 목록으로 갔을 때 reset 설정
      // post 전송 후 리스트 리프래시
    };
    this.handleCategoryEntry = this.handleCategoryEntry.bind(this);
    this.handleInputCategory = this.handleInputCategory.bind(this);
    this.handleContentList = this.handleContentList.bind(this);
    this.handleClickedContent = this.handleClickedContent.bind(this);
    this.handleResetClickedContent = this.handleResetClickedContent.bind(this);

    this.clickNewMessage = this.clickNewMessage.bind(this);
    this.clickEditBtn = this.clickEditBtn.bind(this);
    this.handleSearchList = this.handleSearchList.bind(this);
    this.handleSortList = this.handleSortList.bind(this);

    this.getContentDetail = this.getContentDetail.bind(this);
    this.handleIsDetail = this.handleIsDetail.bind(this);
  }

  // category 관련 (1) 전체 글 (2) 카테고리 필터링
  componentDidMount() {
    this.handleCategoryEntry();
    this.handleContentList(this.state.categoryId);
    console.log(this.state.clickedContent);
  }

  handleCategoryEntry() {
    axios
      .get(`https://devyeon.com/category`)
      .then((res) => res.data.map((ele) => ele.title))
      .then((list) => {
        this.setState({ categoryList: ["전체보기", ...list] });
      });
  }
  handleInputCategory(e) {
    this.setState({ category: e.target.innerHTML });
    this.setState(
      {
        categoryId: this.state.categoryList.indexOf(e.target.innerHTML),
      },
      () => this.handleContentList(this.state.categoryId)
    );
  }
  handleContentList(value) {
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
  }

  // 선택한 content 정보 -> 메인에 뿌릴 정보 모두
  handleClickedContent(data) {
    this.setState({ clickedContent: data }, () => {
      axios
        .get(
          `https://devyeon.com/comments/list/${this.state.clickedContent.id}`
        )
        .then((res) => {
          this.setState({ comments: [...res.data] });
          console.log("listup, comments set state ======");
          console.log(res, this.state.comments);
        });
    });
  }

  handleResetClickedContent() {
    console.log("reset +++++++");
    this.setState({ clickedContent: {} });
    this.setState({ comments: [] });
  }

  //새글 쓰기 리다이렉트
  clickNewMessage() {
    this.setState({ newPost: !this.state.newPost });
  }

  clickEditBtn() {
    this.setState({ editBtn: !this.state.editBtn });
  }

  //검색된 contentList 불러오는 함수
  handleSearchList(value) {
    axios.get(`https://devyeon.com/search/title/${value}`).then((res) => {
      console.log(res.data);
      this.setState({ contentsList: res.data });
    });
  }

  //선택된 정렬 기준으로 contentList 불러오는 함수
  handleSortList = (e) => {
    axios
      .get(`https://devyeon.com/posts/sort/${e.target.value}`)
      .then((res) => {
        console.log(res.data);
        this.setState({ contentsList: res.data });
      });
  };

  getContentDetail = (content, target) => {
    axios.get(`https://devyeon.com/posts/info/${target}`).then((res) => {
      this.handleClickedContent(res.data);
      console.log("THIS IS ++CUSTOM++ AFTER GET DETAIL");
    });
  };

  handleIsDetail() {
    this.setState({ isDetail: !this.state.isDetail });
  }

  render() {
    const {
      isLogin,
      isMypage,
      token,
      userInfo,
      handleMypage,
      handleLoginClick,
    } = this.props;

    const {
      categoryList,
      categoryId,
      clickedContent,
      comments,
      contentsList,
      editBtn,
      newPost,
      isDetail,
    } = this.state;

    const {
      handleInputCategory,
      handleContentList,
      handleClickedContent,
      handleResetClickedContent,
      handleCategoryEntry,
      clickNewMessage,
      clickEditBtn,
      handleSearchList,
      handleSortList,
      getContentDetail,
      handleIsDetail,
    } = this;

    return (
      <div id="outer">
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
          userInfo={userInfo}
          isMypage={isMypage}
          handleSearchList={handleSearchList}
          handleMypage={handleMypage}
          handleLoginClick={handleLoginClick}
        />

        <div className="container" id="main">
          {newPost ? <Redirect to="/main/post" /> : ""}

          <Category
            isLogin={isLogin}
            token={token}
            userInfo={userInfo}
            categoryId={categoryId}
            categoryList={categoryList}
            handleInputCategory={handleInputCategory}
            handleCategoryEntry={handleCategoryEntry}
          />
          <Switch>
            <Route
              exact
              path="/main"
              render={() => (
                <Contents
                  isLogin={isLogin}
                  token={token}
                  userInfo={userInfo}
                  clickedContent={clickedContent}
                  comments={comments}
                  contentsList={contentsList}
                  editBtn={editBtn}
                  newPost={newPost}
                  isDetail={isDetail}
                  handleIsDetail={handleIsDetail}
                  handleContentList={handleContentList}
                  handleClickedContent={handleClickedContent}
                  handleResetClickedContent={handleResetClickedContent}
                  clickNewMessage={clickNewMessage}
                  clickEditBtn={clickEditBtn}
                  handleSortList={handleSortList}
                  handleSearchList={handleSearchList}
                  getContentDetail={getContentDetail}
                />
              )}
            ></Route>

            <Route
              exact
              path="/main/detail"
              render={() => (
                <ContentDetail
                  isLogin={isLogin}
                  token={token}
                  userInfo={userInfo}
                  clickedContent={clickedContent}
                  comments={comments}
                  contentsList={contentsList}
                  editBtn={editBtn}
                  newPost={newPost}
                  handleIsDetail={handleIsDetail}
                  handleResetClickedContent={handleResetClickedContent}
                  clickNewMessage={clickNewMessage}
                  clickEditBtn={clickEditBtn}
                  handleSearchList={handleSearchList}
                />
              )}
            ></Route>
            <Route
              exact
              path="/main/post"
              render={() => (
                <Post
                  isLogin={isLogin}
                  token={token}
                  userInfo={userInfo}
                  clickNewMessage={clickNewMessage}
                  categoryList={categoryList}
                />
              )}
            ></Route>
          </Switch>

          <Custom
            token={token}
            userInfo={userInfo}
            isDetail={isDetail}
            handleIsDetail={handleIsDetail}
            clickedContent={clickedContent}
            comments={comments}
            contentsList={contentsList}
            clickedContent={clickedContent}
            handleClickedContent={handleClickedContent}
            handleResetClickedContent={handleResetClickedContent}
            getContentDetail={getContentDetail}
          />
        </div>
      </div>
    );
  }
}
export default Listup;
