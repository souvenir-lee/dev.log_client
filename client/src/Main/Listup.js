import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Nav from "../Main/Nav/Nav";
import Category from "../Main/Category/Category";
import Contents from "../Main/Content/ContentList/Contents";
import Post from "../Main/Content/Post";
import ContentDetail from "../Main/Content/ContentDetail/ContentDetail";
import axios from "axios";
//import Scrap from "../src/Main/Scrap";
/*
1.state:{
    category:null(데이타베이스에서 가져와야함),
    contetn:null(데이타베이스에서 가져와야함)
}
*/
class Listup extends React.Component {
  constructor(props) {
    super(props); //isLogin, userinfo, handleIsLoginChange
    this.state = {
      category: null,
      contentsList: [
        {
          username: "한슬",
          title: "인사",
          message: "안녕하세요",
          comment: "1",
          view_count: 1,
          tag: ["인사"],
        },
        {
          username: "한슬",
          title: "인사",
          message: "프로젝트",
          comment: "2",
          view_count: 1,
          tag: ["인사"],
        },
        {
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
        username: "디테일 username",
        title: "디테일 title",
        message: "디테일 message",
      },
      //currentContent: {},
    };
    this.handleInputCategory = this.handleInputCategory.bind(this);
    this.handleContentList = this.handleContentList.bind(this);
    this.handleGetDefault = this.handleGetDefault.bind(this);
    this.clickedContent = this.clickedContent.bind(this);
  }
  clickedContent = (data) => {
    {
      this.setState({ clickedContent: data });
    }
  };

  //시작하자마자 전체 데이터 뿌려주는 함수 -> 주기함수 써야 함.
  componentDidMount() {
    this.handleGetDefault(); //전체보기 API가 어떻게 되어있을까?
  }

  //기본적으로 contestList 불러오는 함수
  handleGetDefault = () => {
    axios.get("http://localhost:4000").then((res) => {
      console.log(res);
      this.setState({ contentsList: res.data });
    });
  };

  //category state 끌어올리기
  handleInputCategory = (e) => {
    //console.log('target',e.target.innerHTML)
    this.setState({ category: e.target.innerHTML });
    console.log("state", this.state); //두번 클릭해야 이해하는것인가?
  };

  //contentsList도 채워지는 함수
  handleContentList = () => {
    axios
      .post("http://localhost:4000", this.state.category) //카테고리 클릭했을 때 변경하기, API 필요
      .then((res) => {
        console.log(res);
        this.setState({ contentsList: res.data });
      });
  };

  render() {
    const { isLogin, userinfo, handleLoginClick, getUserData } = this.props;
    console.log("listup props", this.props);
    const { category, contentsList, clickedContent } = this.state;

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
              />
            )}
          ></Route>
          <Route
            exact
            path="/main/detail"
            render={() => (
              <ContentDetail
                cateory={category}
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
