import React from "react";
import CommentEntry from "./CommentEntry";
import axios from "axios";
import styled from "styled-components";
axios.defaults.withCredentials = "include";

const Button = styled.button`
  text-align: center;
  width: 60px;
  height: 25px;
  background: #f1c40f;
  color: black;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  margin: 5px;
`;

const CommentTop = styled.div`
  margin: 10px 20px 10px 20px;
`;
const CommentInput = styled.input`
  width: 250px;
  height: 20px;
`;

const CommentArea = styled.div`
  border: 1px solid black;
`;

class Comment extends React.Component {
  constructor(props) {
    super();
    this.state = {
      commentValue: "",
    };
  }
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleCommentPost = () => {
    axios
      .post("http://localhost:4000/comments/create", {
        userId: this.props.userInfo.id,
        postId: this.props.clickedContent.id,
        message: this.state.commentValue,
        email: this.props.userInfo.email,
      })
      .then((res) => {
        if (res.status === 201) {
          this.props.getContentDetail(null, this.props.clickedContent.id);
        }
      });
  };

  render() {
    const {
      clickedContent,
      comments,
      token,
      handleClickedContent,
      getContentDetail,
      handleContentList,
      handleResetClickedContent,
      handleIsDetail,
    } = this.props;
    return (
      <CommentArea className="commentArea">
        <CommentTop className="commentTop">
          <div className="commentCount">
            댓글: {clickedContent.commentCount}개
          </div>
          <CommentInput
            className="commentInput"
            type="commentValue"
            value={this.state.commentValue}
            placeholder="댓글을 입력해주세요"
            onChange={this.handleInputValue("commentValue")}
          ></CommentInput>
          <Button
            className="commentPostBtn"
            onClick={() => {
              this.handleCommentPost();
              alert("등록되었습니다.");
              this.setState({ commentValue: "" });
            }}
          >
            올리기
          </Button>
        </CommentTop>
        <div className="commentBottom">
          <CommentEntry comments={comments} token={token} />
        </div>
      </CommentArea>
    );
  }
}
export default Comment;
