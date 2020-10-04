import React from "react";
import Comment from "./Comment";
import axios from "axios";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
axios.defaults.withCredentials = "include";

const Tag = styled.div`
  margin: 20px 20px 10px 20px;
`;
const ContetnMessage = styled.div`
  height: 60px;
  border-bottom: 1px solid black;
  margin: 20px 20px 10px 20px;
`;
const Scrap = styled.div`
  float: right;
  margin: 20px 20px 10px 20px;
`;
const ContentHeader = styled.div`
  border-bottom: 1px solid black;
`;

const Title = styled.div`
  margin: 20px 20px 10px 20px;
`;
const User = styled.div`
  margin: 20px 20px 10px 20px;
`;

const Button = styled.button`
  text-align: center;
  width: 80px;
  height: 30px;
  background: #f1c40f;
  color: black;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  margin: 5px;
  float: right;
`;

const ContentArea = styled.div`
  height: 32vh;
  border: 1px solid black;
  margin-bottom: 10px;
`;

export const ContentDetailstyle = styled.div`
  grid-area: main;
  margin-top: 20px;
`;

class ContentDetail extends React.Component {
  constructor(props) {
    super();
    this.state = {
      scrap: false,
    };
    this.deleteMessage = this.deleteMessage.bind(this);
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
        }
      });
  }

  handleScrap() {
    //
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
        <ContentArea className="contentArea">
          <ContentHeader className="contentHeader">
            <div>
              <Title className="contentTitle">
                제목: {clickedContent.title}
              </Title>
              <User className="contentUsername">
                작성자: {clickedContent.username}
              </User>
            </div>
            <Scrap>
              <input
                type="checkbox"
                id="scrap"
                checked={this.state.scrap}
                onChange={this.handleScrap.bind(this)}
              />
              <span className="scrapBox">스크랩</span>
              <label htmlFor="scrap"></label>
            </Scrap>
          </ContentHeader>
          <br />
          <div className="contentBody">
            <ContetnMessage
              className="contentMessage"
              dangerouslySetInnerHTML={{
                __html: clickedContent.message,
              }}
            ></ContetnMessage>
            <Tag>
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
            </Tag>
          </div>
          <br />
          <Button
            className="contentDeleteBtn"
            onClick={() => {
              this.deleteMessage();
            }}
          >
            삭제하기
          </Button>
          <Button
            className="contentEditBtn"
            onClick={() => {
              clickEditPost(); // 수정하기로 리다이렉트
            }}
          >
            수정하기
          </Button>
        </ContentArea>
        <div>
          <Comment
            userInfo={userInfo}
            clickedContent={clickedContent}
            comments={comments}
            token={token}
            handleClickedContent={handleClickedContent}
            getContentDetail={getContentDetail}
            handleContentList={handleContentList}
            handleResetClickedContent={handleResetClickedContent}
            handleIsDetail={handleIsDetail}
          />
        </div>
        <Button
          className="backToListBtn"
          onClick={() => {
            handleContentList(0);
            handleResetClickedContent();
            handleIsDetail();
          }}
        >
          목록으로
        </Button>
      </ContentDetailstyle>
    );
  }
}
export default withRouter(ContentDetail);
