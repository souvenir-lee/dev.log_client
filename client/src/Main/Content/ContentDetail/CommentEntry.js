import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const CommentUsername = styled.div`
  height: 25px;
`;
const CommentMessage = styled.span`
  height: 20px;
`;

const Button = styled.button`
  text-align: center;
  width: 60px;
  height: 20px;
  background: #f1c40f;
  color: black;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  margin: 5px;
  float: right;
`;
const CommentList = styled.div`
  height: 60px;
  margin: 10px 20px 10px 20px;
  border-bottom: 1px solid black;
`;

class CommentEntry extends React.Component {
  deleteComment = (commentId) => {
    axios
      .post("http://localhost:4000/comments/delete", {
        token: this.props.token,
        id: commentId,
      })
      .then((res) => {
        if (res.status === 200) {
          this.props.getContentDetail(null, this.props.clickedContent.id);
          alert("삭제되었습니다.");
          this.props.handleClickedContent(this.props.clickedContent.id);
        }
      })
      .catch(() => alert("삭제할 수 없습니다."));
  };

  render() {
    const { comments } = this.props;
    return comments.map((ele) => (
      <CommentList
        className="commentList"
        key={`comment${comments.indexOf(ele)}`}
      >
        <CommentUsername className="commentUsername">
          {ele.username}
        </CommentUsername>
        <CommentMessage className="commentMessage">
          {ele.message}
        </CommentMessage>
        <span className="commentBtns">
          <Button
            className="commentDeleteBtn"
            onClick={() => {
              this.deleteComment(ele.id);
            }}
          >
            삭제
          </Button>
        </span>
      </CommentList>
    ));
  }
}

export default withRouter(CommentEntry);
