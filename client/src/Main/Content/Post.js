import React from "react";
import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import styled from "styled-components";
axios.defaults.withCredentials = "include";

const Button = styled.button`
  text-align: center;
  width: 80px;
  height: 30px;
  background: #f1c40f;
  color: black;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  margin: 5px;
  float: right;
`;
const MemberTag = styled.input`
  margin-right: 5px;
  margin-bottom: 5px;
  width: 100px;
`;
const PostTag = styled.input`
  margin-right: 5px;
  margin-bottom: 5px;
  width: 100px;
`;
const MemberTagArea = styled.div``;
const PostTagArea = styled.div``;
const PostMessage = styled.textarea`
  height: 300px;
  margin-bottom: 10px;
`;
const PostTitle = styled.input`
  height: 30px;
  margin-bottom: 10px;
`;
const PostCategorySelect = styled.select`
  height: 30px;
  margin-bottom: 10px;
`;

export const Poststyle = styled.div`
  grid-area: main;
  margin-top: 20px;
  margin-bottom: 10px;
`;

class Post extends React.Component {
  constructor(props) {
    super();
    this.state = {
      names: [],
      tags: [],
      blank: [1, 2, 3], // blank.length에 따라 태그, 멤버 입력칸 결정
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handlePost() {
    this.setState({
      names: this.state.blank.map((ele) => {
        const index = this.state.blank.indexOf(ele);
        return this.state["member" + ele]
          ? this.state["member" + ele]
          : this.state.names[index];
      }),
    });
    this.setState({
      tags: this.state.blank.map((ele) => {
        const index = this.state.blank.indexOf(ele);
        return this.state["tag" + ele]
          ? this.state["tag" + ele]
          : this.state.tags[index];
      }),
    });
    setTimeout(() => {
      axios
        .post("http://localhost:4000/posts/create", {
          token: this.props.token,
          categoryId: this.state.categoryId,
          authorId: String(this.props.userInfo.id),
          title: this.state.title,
          message: this.state.message,
          names: this.state.names,
          tags: this.state.tags,
        })
        .then((res) => {
          if (res.status === 201) {
            //새글 쓰고 main으로 이동
            this.props.handleContentList(0);
            alert("등록되었습니다.");
            this.props.handleResetClickedContent();
            this.props.clickNewPost();
          }
        });
    });
  }

  render() {
    const { categoryList, handleResetClickedContent } = this.props;
    const { blank } = this.state;
    const list = categoryList.slice(1);

    return (
      <Poststyle className="container" id="post">
        <div
          className="inputArea"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <PostCategorySelect
            className="postCategorySelect"
            value={this.state.categoryId}
            onChange={this.handleInputValue("categoryId")}
          >
            <option key="selectCategory0">카테고리 선택</option>
            {list.map((ele) => (
              <option
                value={categoryList.indexOf(ele)}
                key={`selectCategory${categoryList.indexOf(ele)}`}
              >
                {ele}
              </option>
            ))}
          </PostCategorySelect>

          <PostTitle
            className="postTitle"
            type="title"
            placeholder="title"
            onChange={this.handleInputValue("title")}
          ></PostTitle>

          <PostMessage
            className="postMessage"
            type="message"
            placeholder="message"
            onChange={this.handleInputValue("message")}
          ></PostMessage>
        </div>

        <PostTagArea className="postTagArea">
          {blank.map((n) => {
            return (
              <PostTag
                type="tag"
                placeholder={"태그" + n}
                key={"tag" + n}
                onChange={this.handleInputValue("tag" + n)}
              ></PostTag>
            );
          })}
        </PostTagArea>

        <MemberTagArea className="memberTagArea">
          {blank.map((n) => {
            return (
              <MemberTag
                type="member"
                placeholder={"멤버" + n}
                key={"멤버" + n}
                onChange={this.handleInputValue("member" + n)}
              ></MemberTag>
            );
          })}
        </MemberTagArea>

        <div className="btnArea">
          <Button
            className="postCancelBtn"
            type="submit"
            onClick={() => {
              if (window.confirm("정말 취소하시겠어요?")) {
                alert("취소되었습니다.");
                this.props.handleResetClickedContent();
                this.props.clickNewPost();
                // this.props.history.push("/main");
              } else {
                return;
              }
            }}
          >
            취소
          </Button>
          <Button
            className="postSubmitBtn"
            type="submit"
            onClick={() => {
              this.handlePost();
            }}
          >
            게시
          </Button>
        </div>
      </Poststyle>
    );
  }
}

export default withRouter(Post);
