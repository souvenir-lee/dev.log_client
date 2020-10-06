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

      radioGroup: {
        Scrap: true,
        MyPost: false,
        Tagged: false,
      },
      selectedOption: "Scrap",
      listCustom: [],

      checkedListId: [],
      scrap: false,
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

    this.getCustomList = this.getCustomList.bind(this);
    this.handleRadio = this.handleRadio.bind(this);

    this.getCheckedListId = this.getCheckedListId.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  getCustomList() {
    const { userInfo } = this.props;
    axios
      .get(
        `https://devyeon.com/custom/${this.state.selectedOption.toLowerCase()}/${
          userInfo.id
        }`
      )
      .then((result) => {
        this.setState({
          listCustom: [...result.data],
        });
      });
  }

  handleRadio(event) {
    let obj = {};
    Object.keys(this.state.radioGroup).map((ele) => {
      return (obj[ele] = false); // 셋 다 false
    });
    obj[event.target.value] = true;
    this.setState(
      {
        radioGroup: {
          ...obj,
        },
      },
      this.setState(
        {
          selectedOption: event.target.value,
        },
        () => {
          this.getCustomList();
        }
      )
    );
  }

  handleCheckbox() {
    this.setState({
      scrap: this.state.clickedContent["checkbox"],
    });
  }

  getCheckedListId() {
    axios
      .get(`https://devyeon.com/custom/scrap/${this.props.userInfo.id}`)
      .then((result) => {
        const target = result.data.map((ele) => ele.postId);
        this.setState({
          checkedListId: [...target],
        });
      });
  }
  // category 관련 (1) 전체 글 (2) 카테고리 필터링
  componentDidMount() {
    this.handleCategoryEntry();
    this.handleContentList(this.state.categoryId);
    this.getCheckedListId();
    this.getCustomList();
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
    value !== 0
      ? axios.get(`https://devyeon.com/posts/category/${value}`).then((res) => {
          this.setState({ contentsList: res.data });
        })
      : axios.get(`https://devyeon.com/posts/list`).then((res) => {
          this.setState({ contentsList: res.data });
        });
    this.setState({ isDetail: false });
    this.setState({ scrap: false });
  }
  // 선택한 content 정보
  handleClickedContent(data) {
    data.authorId === this.props.userInfo["id"]
      ? (data["display"] = true)
      : (data["display"] = "none");
    this.state.checkedListId.indexOf(data.id) !== -1
      ? (data["checkbox"] = "checked")
      : (data["checkbox"] = false);
    this.setState({ clickedContent: data }, () => {
      axios
        .get(
          `https://devyeon.com/comments/list/${this.state.clickedContent.id}`
        )
        .then((res) => {
          const rawComment = res.data;
          rawComment.map((comment) => {
            return comment.userId === this.props.userInfo["id"]
              ? (comment["display"] = true)
              : (comment["display"] = "none");
          });
          this.setState({ comments: [...res.data] });
          this.handleCheckbox();
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
        .get(`https://devyeon.com/posts/update/${this.state.clickedContent.id}`)
        .then((res) => {
          this.setState({ tagList: [...res.data[0]] });
          this.setState({ memberList: [...res.data[1]] });
        });
    });
  };
  handleIsDetail() {
    this.setState({ isDetail: !this.state.isDetail });
    return this.state.isDetail === false ? (this.state.scrap = false) : "";
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
      this.setState({ contentsList: res.data });
    });
  }
  //선택된 정렬 기준으로 contentList 불러오는 함수
  handleSortList = (e) => {
    axios
      .get(`https://devyeon.com/posts/sort/${e.target.value}`)
      .then((res) => {
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
      scrap,
      radioGroup,
      selectedOption,
      listCustom,
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
      handleCheckbox,
      getCheckedListId,
      getCustomList,
      handleRadio,
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
          handleContentList={handleContentList}
          isDetail={isDetail}
          newPost={newPost}
          editPost={editPost}
          handleIsDetail={handleIsDetail}
          clickNewPost={clickNewPost}
          clickEditPost={clickEditPost}
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
                scrap={scrap}
                getCheckedListId={getCheckedListId}
                handleCheckbox={handleCheckbox}
                getCustomList={getCustomList}
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
                getCustomList={getCustomList}
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
          radioGroup={radioGroup}
          selectedOption={selectedOption}
          getCustomList={getCustomList}
          handleRadio={handleRadio}
          listCustom={listCustom}
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
