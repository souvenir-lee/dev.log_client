/*
1. 해당 데이터베이스에서 데이터를 가지고 와서 name, title를 가지고 온다.
2. 댓글이 추가될대마다 댓글+1 -> 이건 서버에서 가져오는 것
3. ContentEntry를 클릭하면 ContentDetail.js로 리다이렉트
4. Listup이 공통 부모이므로 state를 내려준다
*/

import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

// props = {category=, content=, clickedkContent=}
class ContentsEntry extends React.Component {
  constructor(props) {
    super(props);
    this.getContentDetail = this.getContentDetail.bind(this);
  }

  //console.log('content',content)

  getContentDetail = () => {
    axios.get(`https://devyeon.com/posts/info/${this.props.content.id}`).then((res) => {
    console.log(res.data)
    this.props.handleclickedContent(res.data);
    });
  };

  render() {
    return (
      <div
        className="contents_list"
        onClick={() => {
          console.log("클릭되나");
          this.getContentDetail();
          this.props.history.push("/main/detail"); //contentDetail로 이동하기
        }}
        style={{
          width: "400px",
          margin: "5px",
          border: "5px solid",
        }}
      >
        <div className="name">{this.props.content.username}</div>
        <div className="title">{this.props.content.title}</div>
        <div className="comment">댓글{this.props.content.comment}</div>
        <div className="view_count">조회수{this.props.content.view_count}</div>
        {/* {this.props.content.name.map((name) => {
          return <div className="name">{name}</div>;
        })} */}
      </div>
    );
  }
}

export default withRouter(ContentsEntry);
