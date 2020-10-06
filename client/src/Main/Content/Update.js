import React from "react";
import axios from "axios";
import { Redirect, Route, withRouter } from "react-router-dom";
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

class Update extends React.Component {
  constructor(props) {
    super();
    this.state = {
      names: [],
      tags: [],
      blank: [1, 2, 3],
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    this.setState({ names: [...this.props.memberList] });
    this.setState({ tags: [...this.props.tagList] });
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleEdit() {
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
        .post("https://devyeon.com/posts/update", {
          token: this.props.token,
          categoryId: this.state.categoryId,
          title: this.state.title,
          message: this.state.message,
          names: this.state.names,
          tags: this.state.tags,
          id: this.props.clickedContent.id,
        })
        .then((res) => {
          if (res.status === 200) {
            this.props.handleContentList(0);
            alert("수정이 완료되었습니다.");
            this.props.handleResetClickedContent();
            this.props.clickEditPost();
          }
        });
    }, 0);
  }

  render() {
    const { categoryList, clickedContent } = this.props;
    const list = categoryList.slice(1);
    const { blank } = this.state;

    return (
      <Poststyle className="container" id="post">
        {this.state.isPost ? <Redirect to="/" /> : ""}
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
            defaultValue={clickedContent.title}
            onChange={this.handleInputValue("title")}
          />
          <PostMessage
            className="postMessage"
            type="message"
            placeholder="message"
            defaultValue={clickedContent.message}
            onChange={this.handleInputValue("message")}
          ></PostMessage>
        </div>
        <PostTagArea className="postTagArea">
          {blank.map((n) => {
            const index = blank.indexOf(n);
            return (
              <PostTag
                type="tag"
                placeholder={"태그" + n}
                defaultValue={this.state.tags[index]}
                key={"tag" + n}
                onChange={this.handleInputValue("tag" + n)}
              ></PostTag>
            );
          })}
        </PostTagArea>

        <MemberTagArea className="memberTagArea">
          {blank.map((n) => {
            const index = blank.indexOf(n);
            return (
              <MemberTag
                type="member"
                placeholder={"멤버" + n}
                defaultValue={this.state.names[index]}
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
              this.props.clickEditPost();
            }}
          >
            취소
          </Button>
          <Button
            className="postUpdateBtn"
            type="submit"
            onClick={() => {
              this.handleEdit();
            }}
          >
            수정
          </Button>
        </div>
      </Poststyle>
    );
  }
}
export default withRouter(Update);
