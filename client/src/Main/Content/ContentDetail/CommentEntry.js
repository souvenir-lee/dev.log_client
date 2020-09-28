/*
1. 해당 데이터베이스에서 이름과 내용을 랜더링 한다.
2. 수정/삭제 버튼을 누르면 해당 글이 delete된다.
*/
import React from "react";
// import { withRouter, useHistory } from "react-router-dom";

// props={comment: {
//     username: "수진",
//     message: "hello",
//   }}
const CommentEntry = (props) => {
  return (
    <div>
      <div>{props.comment.username}</div>
      <div>{props.comment.message}</div>
      <div>
        <button>수정</button>
        <button>삭제</button>
      </div>
    </div>
  );
};

export default CommentEntry;
