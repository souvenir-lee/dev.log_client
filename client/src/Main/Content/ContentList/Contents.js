import React from "react";
import { withRouter } from "react-router-dom";
import ContentsEntry from "./ContentsEntry";
import styled from "styled-components";

export const Contentstyle = styled.div`
  grid-column: 2 / 3;
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
        <div className="containerHead">
          <button
            id="newPostBtn"
            onClick={() => {
              clickNewPost(); // 새글 쓰기로 리다이렉트
            }}
          >
            새글 쓰기
          </button>

          <select name="cars" id="cars" onChange={handleSortList}>
            <option value="id">최근 게시글</option>
            <option value="viewCount">조회수</option>
            <option value="commentCount">댓글수</option>
          </select>
        </div>
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
