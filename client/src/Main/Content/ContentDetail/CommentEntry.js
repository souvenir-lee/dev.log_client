import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class CommentEntry extends React.Component {
  deleteComment = (commentId) => {
    axios
      .post("https://devyeon.com/comments/delete", {
        token: this.props.token,
        id: commentId,
      })
      .then((res) => {
        if (res.status === 200) {
          this.props.getContentDetail(null, this.props.clickedContent.id);
          alert("삭제되었습니다.");
          axios
            .get(
              `https://devyeon.com/comments/list/${this.props.clickedContent.id}`
            )
            .then((res) => {
              this.setState({ comments: [...res.data] });
            });
        }
      })
      .catch(() => alert("삭제할 수 없습니다."));
  };

  render() {
    const { comments } = this.props;
    return comments.map((ele) => (
      <div className="commentList" key={`comment${comments.indexOf(ele)}`}>
        <div className="commentUsername">{ele.username}</div>
        <div className="commentMessage">{ele.message}</div>
        <div className="commentBtns">
          <button
            style={{ display: ele.display }}
            className="commentDeleteBtn"
            onClick={() => {
              this.deleteComment(ele["id"]);
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
