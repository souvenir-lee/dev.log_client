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
  }

  deleteMessage() {
    axios
      .post("https://devyeon.com/posts/delete", {
        id: this.props.clickedContent.id,
        token: this.props.token,
      })
      .then((res) => {
        if (res.status === 200) {
          this.props.handleContentList(0);
          alert("삭제되었습니다.");
          this.props.handleResetClickedContent();
          this.props.handleIsDetail();
        }
      });
  }

  render() {
    const {
      token,
      userInfo,
      clickedContent,
      handleResetClickedContent,
      handleIsDetail,
      comments,
      tagList,
      memberList,
      handleClickedContent,
      getContentDetail,
      handleContentList,
      clickEditPost,
    } = this.props;

    return (
      <ContentDetailstyle className="container" id="content">
        <div className="contentArea">
          <div className="contentHeader">
            <h3>상세 보기</h3>
            <div className="contentTitle">제목: {clickedContent.title}</div>
            <div className="contentUsername">
              작성자: {clickedContent.username}
            </div>
          </div>
          <br />
          <div className="contentBody">
            <div
              className="contentMessage"
              dangerouslySetInnerHTML={{
                __html: clickedContent.message,
              }}
            ></div>
            <br />
            <div className="contentTags">
              태그:{" "}
              {tagList.map((tag) => {
                return <span>{tag} </span>;
              })}
            </div>
            <div className="contentMembers">
              관련된 사람:{" "}
              {memberList.map((member) => {
                return <span>{member} </span>;
              })}
            </div>
          </div>
          <br />
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
                clickEditPost(); // 수정하기로 리다이렉트
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
          }}
        >
          목록으로
        </button>
      </ContentDetailstyle>
    );
  }
}
export default withRouter(ContentDetail);
