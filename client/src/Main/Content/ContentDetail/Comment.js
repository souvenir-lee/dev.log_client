import React from "react";
import CommentEntry from "./CommentEntry";
import axios from "axios";
axios.defaults.withCredentials = "include";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentValue: "",
    };
    console.log("댓글", this.props.comments);
  }
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleCommentClick = () => {
    axios
      .post("http://devyeon.com/comments/create", {
        // .post("http://localhost:4000/comments/create", {
        userId: this.props.userInfo.id,
        postId: this.props.clickedContent.id,
        message: this.state.commentValue,
        email: this.props.userInfo.email,
      })
      //  .post("http://devyeon.com/comments/create", this.state.inputComment)
      .then((res) => {
        if (res.status === 200) {
          this.props.getComments(res.data);
          this.props.commentCount();
        }
        //   this.props.getUserData(res.data);
      });
  };

  render() {
    const { comments } = this.props;
    return (
      <div className="comment">
        <div className="comment_count">댓글 :0</div>
        <div>
          <input
            className="comment_input"
            type="commentValue"
            placeholder="댓글을 입력해주세요"
            onChange={this.handleInputValue("commentValue")}
          ></input>
          <button
            className="comment_post"
            onClick={() => {
              this.handleCommentClick();
            }}
          >
            올리기
          </button>
        </div>
        {this.props.comments.map((comment) => (
          <CommentEntry comment={comment} />
        ))}
      </div>
    );
  }
}
export default Comment;
