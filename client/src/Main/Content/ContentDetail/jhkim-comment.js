import React from "react";
import CommentEntry from "./CommentEntry";
import axios from "axios";
import { withRouter } from "react-router-dom";
axios.defaults.withCredentials = "include";
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
          this.props.history.push("/main/detail");
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
    } = this.props;
    return (
      <div className="commentArea">
        <div className="commentTop">
          <div className="commentCount">
            댓글: {clickedContent.commentCount}개
          </div>
          <input
            className="commentInput"
            type="commentValue"
            placeholder="댓글을 입력해주세요"
            onChange={this.handleInputValue("commentValue")}
          ></input>
          <button
            className="commentPostBtn"
            onClick={() => {
              this.handleCommentPost();
            }}
          >
            올리기
          </button>
        </div>
        <div className="commentBottom">
          <CommentEntry
            comments={comments}
            token={token}
            handleClickedContent={handleClickedContent}
            clickedContent={clickedContent}
            getContentDetail={getContentDetail}
          />
        </div>
      </div>
    );
  }
}
export default withRouter(Comment);
