import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Nav from "../Main/Nav/Nav";
import Category from "../Main/Category/Category";
import Contents from "../Main/Content/ContentList/Contents";
import Post from "../Main/Content/Post";
import ContentDetail from "../Main/Content/ContentDetail/ContentDetail";
import axios from "axios";
//import Scrap from "../src/Main/Scrap";

class Listup extends React.Component {
  constructor(props) {
    super(props); //isLogin, userinfo, handleIsLoginChange
    this.state = {
      category: null, //여기를 나중에는 category id로 수정하기
      contentsList: [
        {
          id: "",
          categoryId: "",
          username: "한슬",
          title: "인사",
          message: "안녕하세요",
          comment: "1",
          view_count: 1,
          tag: ["인사"],
        },
        {
          id: "",
          categoryId: "",
          username: "한슬",
          title: "인사",
          message: "프로젝트",
          comment: "2",
          view_count: 1,
          tag: ["인사"],
        },
        {
          id: "",
          categoryId: "",
          username: "한슬",
          title: "인사",
          message: "화이팅",
          comment: "3",
          view_count: 1,
          tag: ["인사"],
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
    this.clickedContent = this.clickedContent.bind(this);
    this.clickEditBtn = this.clickEditBtn.bind(this);
  }
  clickEditBtn = () => {
    {
      this.setState({ editBtn: true });
    }
  };
  clickedContent = (data) => {
    {
      this.setState({ clickedContent: data });
    }
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
    this.handleGetDefault(); //전체보기 API가 어떻게 되어있을까?
  }

  //기본 contestList 불러오는 함수, category
  handleGetDefault = () => {
    axios.get(`http://localhost:4000/posts/list`).then((res) => {
      console.log(res);
      this.setState({ contentsList: res.data });
    });
  };

  //필터링된 contestList 불러오는 함수
  handleContentList = (value) => {
    axios.get(`http://localhost:4000/posts/category/${value}`).then((res) => {
      console.log(res);
      this.setState({ contentsList: res.data });
    });
  };

  //category state 끌어올리기 + 필터링된 contestList 불러오는 함수
  handleInputCategory = (e) => {
    this.setState({ category: e.target.innerHTML });
    console.log("카테고리~!!!", this.state.category);
    // await axios.get(`http://localhost:3001/${this.state.category}`)
    // .then((res) => {
    //   console.log(res);
    //   this.setState({ contentsList: res.data });
    // });
    //console.log("state", this.state.category); //state가 렌더링 된 후에야 바뀐 것을 확인할 수 있는듯
  };

  render() {
    const {
      isLogin,
      userinfo,
      handleLoginClick,
      getUserData,
      clickEditBtn,
    } = this.props;
    console.log("listup props", this.props);
    const {
      category,
      contentsList,
      clickedContent,
      handleGetDefault,
      editBtn,
    } = this.state;

    if (category === "전체보기") {
      this.handleGetDefault();
    } else if (category === "카테고리1") {
      this.handleContentList("1");
    } else if (category === "카테고리1") {
      this.handleContentList("2");
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
          handleLoginClick={handleLoginClick}
          getUserData={getUserData}
        />
        <Category
          category={category}
          contentsList={contentsList}
          handleInputCategory={this.handleInputCategory}
          handleContentList={this.handleContentList}
        />
        <Switch>
          <Route exact path="/main/post" render={() => <Post />}></Route>
          <Route
            exact
            path="/main"
            render={() => (
              <Contents
                cateory={category}
                contentsList={contentsList}
                clickedContent={clickedContent}
                handleGetDefault={handleGetDefault}
                editBtn={editBtn}
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
                clickedContent={clickedContent}
                clickEditBtn={clickEditBtn}
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
