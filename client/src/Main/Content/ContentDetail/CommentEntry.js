import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
// import { withRouter, useHistory } from "react-router-dom";

class CommentEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  deleteComment = () => {
    axios

      //.delete("http://localhost:4000/comments/delete", this.props.id)
        .delete("http://devyeon.com/comments/delete", this.props.id)
      .then((res) => {
        if (res.status === 200) {
          alert("삭제되었습니다.");
          this.props.history.push("/main/detail");
        }
      });
  };

  render() {
    return (
      <div className="commentEntry">
        <div className="comment_username">{this.props.comments.username}</div>
        <div className="comment_message">{this.props.comments.message}</div>
        <div className="comment_btn">
          <button className="comment_btnEdit" onClick={() => {}}>
            수정
          </button>
          <button
            className="comment_btnDelete"
            onClick={() => {
              this.deleteComment();
            }}
          >
            삭제
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(CommentEntry);
