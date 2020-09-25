/*
1. Contents.js에서 해당 글을 클릭했을때 Listup.js로 state 끌어올리기를 통해 해당 글을 랜더링 한다.
2. 삭제하기를 클릭했을때 해당 글을 delete한다.
3. 댓글 개수를 표시
*/

import React from "react";
import Comment from "./Comment";

class ContentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="contentdetail">
        <div className="contentdetail_content">
          <div className="username">//이름</div>
          <div className="title">제목</div>
        </div>
        <div>
          <button className="contentdetail_btnDelete">삭제하기</button>
          <button className="contentdetail_btnDelete">수정하기</button>
        </div>
        <Comment />
      </div>
    );
  }
}

export default ContentDetail;
