import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
axios.defaults.withCredentials = "include";

const ContentBox = styled.div`
  //className="contentBox"
  margin: 10px;
  border-width: 2px;
  border-color: #aaa;
  border-bottom: 1px solid black;
`;
const Detail = styled.div`
  //className="detailTitle"
  margin: 5px;
`;
const DetailName = styled(Detail)`
  //className="detailName"
  font-weight: bold;
`;
const DetailSpanDiv = styled(Detail)`
  //span 감싸는 div
  display: flex;
  justify-content: flex-end;
`;
const Span = styled.span`
  //span 태그
  margin: 5px;
`;
// 실제 글 리스트(하나하나)
class ContentsEntry extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const {
      contentsList,
      isDetail,
      getContentDetail,
      handleIsDetail,
    } = this.props;
    return contentsList.reverse().map((content) => {
      return (
        <ContentBox
          className="contentBox"
          onClick={() => {
            getContentDetail(content, content.id);
            handleIsDetail();
          }}
          key={`content${contentsList.indexOf(content)}`}
        >
          {isDetail ? <Redirect to="/main/detail" /> : ""}
          <DetailName className="detailName">{content.username}</DetailName>
          <Detail className="detailTitle">{content.title}</Detail>
          <DetailSpanDiv>
            <Span className="detailComment">
              댓글: {content.commentCount}개
            </Span>
            <Span className="detailViewCount">조회: {content.viewCount}회</Span>
          </DetailSpanDiv>
        </ContentBox>
      );
    });
  }
}

export default withRouter(ContentsEntry);
