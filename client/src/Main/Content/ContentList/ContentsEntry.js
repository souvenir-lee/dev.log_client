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

  getContentDetail = () => {
    axios
      // .get(`http://localhost:4000/posts/info/${this.props.content.id}`)
       .get(`https://devyeon.com/posts/info/${this.props.content.id}`)
      .then((res) => {
        {
          this.props.handleClickedContent(res.data);
        }
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
