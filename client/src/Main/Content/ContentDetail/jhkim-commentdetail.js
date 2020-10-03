import React from "react";
import Comment from "./Comment";
import axios from "axios";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
axios.defaults.withCredentials = "include";
export const ContentDetailstyle = styled.div`
  grid-column: 2 / 3;
`;
class ContentDetail extends React.Component {
  constructor(props) {
    super();
    this.deleteMessage = this.deleteMessage.bind(this);
    // this.editMessage = this.editMessage.bind(this);
  }
  deleteMessage() {
    axios
      .post("http://localhost:4000/posts/delete", {
        id: this.props.clickedContent.id,
        token: this.props.token,
      })
      .then((res) => {
        if (res.status === 200) {
          this.props.handleContentList(0);
          alert("삭제되었습니다.");
          this.props.handleResetClickedContent();
          this.props.handleIsDetail();
          this.props.history.push("/main");
        }
      });
  }
  // editMessage() {
  //   this.props.history.push("/main/post");
  //   axios
  //     .get(`http://localhost:4000/posts/info/${this.props.clickedContent.id}`)
  //     .then(async (res) => {
  //       // main/post의 state가 바뀌어야함
  //       this.props.clickEditBtn();
  //       this.props.handleClickedContent();
  //       console.log(this.props.clickedContent);
  //     });
  // }
  render() {
    const {
      userInfo,
      clickedContent,
      handleResetClickedContent,
      handleIsDetail,
      comments,
      token,
      handleClickedContent,
      getContentDetail,
      handleContentList,
    } = this.props;
    return (
      <ContentDetailstyle className="container" id="content">
        <div className="contentArea">
          <div className="contentHeader">
            <div className="contentUsername">
              작성자{clickedContent.username}
            </div>
            <div className="contentTitle">제목{clickedContent.title}</div>
          </div>
          <div
            className="contentMessage"
            dangerouslySetInnerHTML={{
              __html: clickedContent.message,
            }}
          ></div>
          <div className="contentBtns">
            <button
              className="contentDeleteBtn"
              onClick={() => {
                this.deleteMessage();
              }}
            >
              삭제하기
            </button>
            <button
              className="contentEditBtn"
              onClick={() => {
                // this.editMessage();
                this.props.history.push("/main/postUpdate");
              }}
            >
              수정하기
            </button>
          </div>
        </div>
        <Comment
          userInfo={userInfo}
          clickedContent={clickedContent}
          comments={comments}
          token={token}
          handleClickedContent={handleClickedContent}
          getContentDetail={getContentDetail}
        />
        <button
          className="backToListBtn"
          onClick={() => {
            handleContentList(0);
            handleResetClickedContent();
            handleIsDetail();
            this.props.history.push("/main");
          }}
        >
          목록으로
        </button>
      </ContentDetailstyle>
    );
  }
}
export default withRouter(ContentDetail);
