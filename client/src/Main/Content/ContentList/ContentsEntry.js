import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = "include";

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
    return contentsList.map((content) => {
      return (
        <div
          className="contentBox"
          onClick={() => {
            getContentDetail(content, content.id);
            handleIsDetail();
          }}
          key={`content${contentsList.indexOf(content)}`}
        >
          {isDetail ? <Redirect to="/main/detail" /> : ""}
          <div className="detailName">{content.username}</div>
          <div className="detailTitle">{content.title}</div>
          <div>
            <span className="detailComment">
              댓글: {content.commentCount}개
            </span>
            <span className="detailViewCount">조회: {content.viewCount}회</span>
          </div>
        </div>
      );
    });
  }
}

export default withRouter(ContentsEntry);
