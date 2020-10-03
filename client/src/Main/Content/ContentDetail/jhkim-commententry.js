import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
axios.defaults.withCredentials = "include";
class CommentEntry extends React.Component {
  constructor(props) {
    super();
  }
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
          this.props.history.push("/main/detail");
        }
      })
      .catch(() => alert("삭제 실패"));
  };
  render() {
    const { comments } = this.props;
    return comments.map((ele) => (
      <div className="commentList" key={`comment${comments.indexOf(ele)}`}>
        <div className="commentUsername">{ele.username}</div>
        <div className="commentMessage">{ele.message}</div>
        <div className="commentBtns">
          <button className="commentEditBtn" onClick={() => {}}>
            수정
          </button>
          <button
            className="commentDeleteBtn"
            onClick={() => {
              this.deleteComment(ele.id);
            }}
          >
            삭제
          </button>
        </div>
      </div>
    ));
  }
}
export default withRouter(CommentEntry);
