import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import ContentsEntry from "./ContentsEntry";

const Contents = ({
  cateory,
  contentsList,
  clickedContent,
  handleClickedContent,
  userinfo,
  history,
}) => {
  return (
    <div>
      <button
        className="contents_btn"
        onClick={() => {
          console.log("클릭되나");
          history.push("/main/post");
          // 나중에 Post.js로 연결하기
          // this.props.clickNewMessage();
        }}
      >
        새글 쓰기
      </button>
      {contentsList.map((content) => (
        <ContentsEntry
          cateory={cateory}
          content={content}
          clickedContent={clickedContent}
          handleClickedContent={handleClickedContent}
        />
      ))}
    </div>
  );
};

export default withRouter(Contents);
