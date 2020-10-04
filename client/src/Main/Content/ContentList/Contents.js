import React from "react";
import { withRouter } from "react-router-dom";
import ContentsEntry from "./ContentsEntry";
import styled from "styled-components";

export const Contentstyle = styled.div`
  //classname=container
  grid-area: main;
  margin: 20px 30px;
`;
const ContainerHead = styled.div`
  //className="containerHead"
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const HeadSelect = styled.select`
  //selct 태그
  width: 124px;
  height: 35px;
`;
const Button = styled.button`
  //button 태그
  width: 124px;
  height: 35px;
  background: #f1c40f;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
`;

class Contents extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    const {
      contentsList,
      clickedContent,
      handleClickedContent,
      isDetail,
      getContentDetail,
      handleIsDetail,
      clickNewPost,
      handleSortList,
    } = this.props;

    return (
      <Contentstyle className="container" id="middle">
        <ContainerHead className="containerHead">
          <Button
            id="newPostBtn"
            onClick={() => {
              clickNewPost(); // 새글 쓰기로 리다이렉트
            }}
          >
            새글 쓰기
          </Button>

          <HeadSelect name="cars" id="cars" onChange={handleSortList}>
            <option value="id">최근 게시글</option>
            <option value="viewCount">조회수</option>
            <option value="commentCount">댓글수</option>
          </HeadSelect>
        </ContainerHead>
        <ContentsEntry
          contentsList={contentsList}
          clickedContent={clickedContent}
          handleClickedContent={handleClickedContent}
          isDetail={isDetail}
          getContentDetail={getContentDetail}
          handleIsDetail={handleIsDetail}
        />
      </Contentstyle>
    );
  }
}

export default withRouter(Contents);
