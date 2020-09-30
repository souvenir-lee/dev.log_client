import React from "react";
import Comment from "./Comment";
import axios from "axios";
import { withRouter } from "react-router-dom";
axios.defaults.withCredentials = true;

class ContentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      title: this.props.title,
      message: this.props.message,
    };
  }
  //1.해당 컨텐츠를 클릭했을때 ContentDetail로 이동하고 해당 이름,제목,내용을 띄운다
  //post
  deleteMessage = () => {
    axios

      // .delete("http://localhost:4000/posts/delete", this.props.id)
       .delete("http://devyeon.com/posts/delete", this.props.id)
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
      .get(`http://devyeon.com/posts/info/${this.props.contentsList.id}`)
      // .get(`http://localhost:4000/posts/info/${this.props.contentsList.id}`)
      .then((res) => {
        // await axios.get(`http://localhost:4000/posts/info/${this.props.contentsList.id}`).then((res) => {
        //main/post의 state가 바뀌어야함
        this.props.clickEditBtn();
        this.props.handleClickedContent();
      });
  };

  render() {
    return (
      <div className="contentdetail">
        <div className="contentdetail_content">
          <div className="contentdetail_username">
            {this.props.clickedContent.username}
          </div>
          <div className="contentdetail_title">
            {this.props.clickedContent.title}
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
        <Comment />
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
