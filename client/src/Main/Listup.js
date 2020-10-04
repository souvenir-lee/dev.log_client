import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Nav from "../Main/Nav/Nav";
import Category from "../Main/Category/Category";
import Contents from "../Main/Content/ContentList/Contents";
import Post from "../Main/Content/Post";
import ContentDetail from "../Main/Content/ContentDetail/ContentDetail";
import Mypage from "../Mypage";
import Footer from "./Footer";
import Custom from "../Main/Custom/Custom";
import styled from "styled-components";
import axios from "axios";
import Update from "../Main/Content/Update";
axios.defaults.withCredentials = "include";
//
export const Outer = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr 0.9fr 1.1fr;
  grid-template-rows: 0.2fr 2.7fr 0.2fr;
  gap: 0px 0px;
  grid-template-areas:
    "nav nav nav nav"
    "category main main custom"
    "category footer footer custom";
`;

class Listup extends React.Component {
  constructor(props) {
    super();
    this.state = {
      categoryList: [], // DB에서 받아오는 카테고리 리스트
      categoryId: 0, // default값 == 전체 보기
      contentsList: [],
      clickedContent: {},
      comments: [],
      tagList: [],
      memberList: [],

      isDetail: false, // 상세 내용 볼지 말지?
      newPost: false, // 새글쓰기 갈지 말지?
      editPost: false, // 수정 페이지 갈지 말지?
    };
    this.handleCategoryEntry = this.handleCategoryEntry.bind(this);
    this.handleInputCategory = this.handleInputCategory.bind(this);
    this.handleContentList = this.handleContentList.bind(this);
    this.handleClickedContent = this.handleClickedContent.bind(this);
    this.handleResetClickedContent = this.handleResetClickedContent.bind(this);
    this.getContentDetail = this.getContentDetail.bind(this);
    this.handleIsDetail = this.handleIsDetail.bind(this);

    this.clickNewPost = this.clickNewPost.bind(this);
    this.clickEditPost = this.clickEditPost.bind(this);
    this.handleSearchList = this.handleSearchList.bind(this);
    this.handleSortList = this.handleSortList.bind(this);
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
      ? axios
          .get(`https://devyeon.com/posts/category/${value}`)
          .then((res) => {
            console.log(res.data);
            this.setState({ contentsList: res.data });
          })
      : axios.get(`https://devyeon.com/posts/list`).then((res) => {
          this.setState({ contentsList: res.data });
          console.log(res.data);
        });
    this.setState({ isDetail: false });
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
        });
    });
  }
  // 리스트로 돌아갈 때 clickedContent, comments reset
  handleResetClickedContent() {
    this.setState({
      clickedContent: {},
      comments: [],
      tagList: [],
      memberList: [],
    });
  }
  //content detail 호출
  getContentDetail = (content, target) => {
    axios.get(`https://devyeon.com/posts/info/${target}`).then((res) => {
      const callback = () => {
        this.handleClickedContent(res.data);
      };
      callback();
      axios
        .get(
          `https://devyeon.com/posts/update/${this.state.clickedContent.id}`
        )
        .then((res) => {
          this.setState({ tagList: [...res.data[0]] });
          this.setState({ memberList: [...res.data[1]] });
        });
    });
  };
  handleIsDetail() {
    this.setState({ isDetail: !this.state.isDetail });
  }
  clickNewPost() {
    //새글 쓰기 리다이렉트 // clickNewMessage
    this.setState({ newPost: !this.state.newPost });
  }
  clickEditPost() {
    // clickEditBtn 취소하면 메인으로 나감
    this.setState({ editPost: !this.state.editPost });
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

  render() {
    const {
      handleLoginClick,
      handleMypage,
      isLogin,
      isMypage,
      token,
      userInfo,
    } = this.props;

    const {
      categoryList,
      categoryId,
      contentsList,
      clickedContent,
      isDetail,
      comments,
      tagList,
      memberList,
      newPost,
      editPost,
      inputData,
    } = this.state;

    const {
      handleCategoryEntry,
      handleInputCategory,
      handleContentList,
      handleClickedContent,
      handleResetClickedContent,
      getContentDetail,
      handleIsDetail,
      clickNewPost,
      clickEditPost,
      handleSearchList,
      handleSortList,
    } = this;

    return (
      <Outer id="outer">
        {isMypage ? (
          <Switch>
            <Redirect to="/mypage" render={() => <Mypage />} />
          </Switch>
        ) : (
          <Redirect to="/main" />
        )}
        <Nav
          handleLoginClick={handleLoginClick}
          handleMypage={handleMypage}
          token={token}
          userInfo={userInfo}
          isMypage={isMypage}
          handleSearchList={handleSearchList}
        />

        <Category
          handleCategoryEntry={handleCategoryEntry}
          categoryList={categoryList}
          handleInputCategory={handleInputCategory}
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
                contentsList={contentsList}
                handleContentList={handleContentList}
                clickedContent={clickedContent}
                handleClickedContent={handleClickedContent}
                handleResetClickedContent={handleResetClickedContent}
                isDetail={isDetail}
                getContentDetail={getContentDetail}
                handleIsDetail={handleIsDetail}
                comments={comments}
                newPost={newPost}
                clickNewPost={clickNewPost}
                editPost={editPost}
                handleSortList={handleSortList}
                handleSearchList={handleSearchList}
              />
            )}
          ></Route>

          {/* contents 화면에서 해야하는 것 -> 새글쓰기 버튼 작동 가능하도록(거기에 위치해있으니까), contents entry에 내려주는 것 + 각각 누르면 entry로
contents detail에서는 -> 수정하기 버튼, 돌아가기 버튼(back to contents)

1. props를 각각(3곳) 내려주기 2. !true 관리하기 */}

          <Route
            exact
            path="/main/detail"
            render={() => (
              <ContentDetail
                isLogin={isLogin}
                token={token}
                userInfo={userInfo}
                categoryList={categoryList}
                contentsList={contentsList}
                handleContentList={handleContentList}
                clickedContent={clickedContent}
                handleClickedContent={handleClickedContent}
                handleResetClickedContent={handleResetClickedContent}
                getContentDetail={getContentDetail}
                isDetail={isDetail}
                handleIsDetail={handleIsDetail}
                comments={comments}
                tagList={tagList}
                memberList={memberList}
                newPost={newPost}
                editPost={editPost}
                clickEditPost={clickEditPost}
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
                categoryList={categoryList}
                handleContentList={handleContentList}
                handleResetClickedContent={handleResetClickedContent}
                isDetail={isDetail}
                handleIsDetail={handleIsDetail}
                newPost={newPost}
                editPost={editPost}
                clickNewPost={clickNewPost}
              />
            )}
          ></Route>
          <Route
            exact
            path="/main/update"
            render={() => (
              <Update
                isLogin={isLogin}
                token={token}
                userInfo={userInfo}
                categoryList={categoryList}
                handleContentList={handleContentList}
                handleResetClickedContent={handleResetClickedContent}
                isDetail={isDetail}
                handleIsDetail={handleIsDetail}
                tagList={tagList}
                memberList={memberList}
                newPost={newPost}
                editPost={editPost}
                clickedContent={clickedContent}
                clickEditPost={clickEditPost}
              />
            )}
          ></Route>
        </Switch>

        <Custom
          token={token}
          userInfo={userInfo}
          contentsList={contentsList}
          clickedContent={clickedContent}
          handleClickedContent={handleClickedContent}
          handleResetClickedContent={handleResetClickedContent}
          isDetail={isDetail}
          getContentDetail={getContentDetail}
          handleIsDetail={handleIsDetail}
          comments={comments}
        />
        {newPost ? (
          <Switch>
            <Redirect to="/main/post" />
          </Switch>
        ) : (
          <Redirect to="/main" />
        )}
        {editPost ? <Redirect to="/main/update" /> : <Redirect to="/main" />}
        {isDetail ? <Redirect to="/main/detail" /> : <Redirect to="/main" />}
        <Footer />
      </Outer>
    );
  }
}
export default Listup;
