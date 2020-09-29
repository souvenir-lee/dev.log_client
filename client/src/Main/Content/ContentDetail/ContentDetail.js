/*
1. Contents.js에서 해당 글을 클릭했을때 Listup.js로 state 끌어올리기를 통해 해당 글을 랜더링 한다.
2. 삭제하기를 클릭했을때 해당 글을 delete한다.
3. 댓글 개수를 표시
*/

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

      .delete("http://localhost:4000/posts/delete", this.props.id)
      // .delete("http://devyeon.com/posts/delete", this.props.id)
      .then((res) => {
        if (res.status === 200) {
          alert("삭제되었습니다.");
          this.props.history.push("/main");
        }
      });
  };
  /*
  1.수정버튼을 누르면 post페이지로 렌더링이 된다.
  2.해당 category, username, title, message를 담아서 가져온다
  3.수정한 value onchange
  4.게시버튼을 누르면 contentDetail 페이지로 렌더링 된다.
  */

  editMessage = async () => {
    await this.props.history.push("/main/post");
    await axios.get("http://localhost:4000/posts/info/id").then((res) => {
      // await axios.get("http://devyeon.com/posts/info/id").then((res) => {
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
        <div className="contentdetail_message">
          {this.props.clickedContent.message}
        </div>
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
