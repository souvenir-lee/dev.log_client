import React from "react";
import Comment from "./Comment";
import axios from "axios";
import { withRouter } from "react-router-dom";
axios.defaults.withCredentials = "include";

class ContentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentCount: 0,
      comments: [
        {
          id: "",
          username: "",
          message: "",
        },
      ],
    };
    this.commentCount = this.commentCount.bind(this);
    // console.log("디테일정보id", this.props.clickedContent.id);
    // console.log("디테일정보", this.props.clickedContent);
  }
  commentCount = () => {
    this.setState({ commentCount: +1 });
  };
  // createComment = (data) => {
  //   this.setState({ comments: data });
  // };
  getComments = () => {
    axios
      // .get(
      //   `http://localhost:4000/comments/list/${this.props.clickedContent.id}`
      // )
      .get(`http://devyeon.com/comments/list/${this.props.clickedContent.id}`)
      .then((res) => {
        this.setState({ comments: res.data });
      });
  };
  deleteMessage = () => {
    axios
      .post("http://devyeon.com/posts/delete", {
        id: this.props.clickedContent.id,
      })
      // .post("http://localhost:4000/posts/delete", {
      //   id: this.props.clickedContent.id,
      // })

      .then((res) => {
        if (res.status === 200) {
          alert("삭제되었습니다.");
          this.props.history.push("/main");
        }
      });
  };

  editMessage = () => {
    this.props.history.push("/main/post");
    axios
      .get(`http://devyeon.com/posts/info/${this.props.clickedContent.id}`)
      // .get(`http://localhost:4000/posts/info/${this.props.clickedContent.id}`)
      .then((res) => {
        // await axios.get(`http://localhost:4000/posts/info/${this.props.contentsList.id}`).then((res) => {
        //main/post의 state가 바뀌어야함
        // this.props.clickEditBtn();
        // this.props.handleClickedContent();
        console.log(this.props.clickedContent);
      });
  };

  render() {
    const { clickedContent, userInfo } = this.props;
    const { commentCount, comments, createComment, getComments } = this.state;
    return (
      <div className="contentdetail">
        <div className="contentdetail_content">
          <div className="contentdetail_username">
            작성자{this.props.clickedContent.username}
          </div>
          <div className="contentdetail_title">
            제목{this.props.clickedContent.title}
          </div>
        </div>
        <div
          className="contentdetail_message"
          dangerouslySetInnerHTML={{
            __html: this.props.clickedContent.message,
          }}
        ></div>
        <div>
          <button
            className="contentdetail_btnDelete"
            onClick={() => {
              this.deleteMessage();
            }}
          >
            삭제하기
          </button>
          <button
            className="contentdetail_btnEdit"
            onClick={() => {
              this.editMessage();
            }}
          >
            수정하기
          </button>
        </div>
        <Comment
          userInfo={userInfo}
          comments={comments}
          clickedContent={clickedContent}
          commentCount={commentCount}
          getComments={getComments}
          createComment={createComment}
          commentCount={commentCount}
          getComments={getComments}
        />
        <button
          className="contentdetail_btnBack"
          onClick={() => {
            this.props.history.push("/main");
          }}
        >
          목록으로
        </button>
      </div>
    );
  }
}

export default withRouter(ContentDetail);
