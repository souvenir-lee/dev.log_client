/*
1. 해당 데이터베이스에서 데이터를 가지고 와서 name, title를 가지고 온다.
2. 댓글이 추가될대마다 댓글+1 -> 이건 서버에서 가져오는 것
3. ContentEntry를 클릭하면 ContentDetail.js로 리다이렉트
4. Listup이 공통 부모이므로 state를 내려준다
*/

import React from "react";
import { withRouter, useHistory } from 'react-router-dom';

const ContentsEntry = ({cateory, content}) => {
  let history = useHistory();
  //console.log('content',content)
  return(
    <div 
      className="contents_list"
      onClick={() =>{
        console.log('클릭되나')
        return history.push('/main/detail') //contentDetail로 이동하기
      }}
      style={{
          width: "400px",
          margin: "5px",
          border: "5px solid",
        }}>
      {/**onClick={/*클릭하면 ContentDetail로 이동하기*/}
      <div className="name">{content.username}</div>
      <div className="title">{content.title}</div>
      <div className="comment">댓글{content.comment}</div>
      <div className="view_count">조회수{content.comment}</div>
      {content.tag.map(tag => {
        return ( <div className="tag">{tag}</div>)
      })}

      {/**view_count: 1, tag:["인사"] */}
    </div>
  )
}

export default withRouter(ContentsEntry)