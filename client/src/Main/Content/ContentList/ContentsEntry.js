import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = "include";

/// 실제 글 확인 페이지
class ContentsEntry extends React.Component {
  constructor(props) {
    super();
    this.state = {
      // isDetail: false,
      target: "id",
    };
    // this.getContentDetail = this.getContentDetail.bind(this);
  }

  // getContentDetail = (content) => {
  //   axios
  //     .get(`https://devyeon.com/posts/info/${content.id}`) //이건되는데 왜 위에는 안될까
  //     .then((res) => {
  //       this.props.handleClickedContent(res.data);
  //       console.log("THIS IS CONTENTS AFTER GET DETAIL");
  //     });
  // };

  render() {
    const {
      isDetail,
      contentsList,
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
            // this.setState({ isDetail: !isDetail });
          }}
          key={`content${contentsList.indexOf(content)}`}
        >
          {isDetail ? <Redirect to="/main/detail" /> : ""}
          <div className="detailName">{content.username}</div>
          <div className="detailTitle">{content.title}</div>
          <div>
            <span className="detailComment">댓글 {content.commentCount}개</span>
            <span className="detailViewCount">조회 {content.viewCount}회</span>
          </div>
        </div>
      );
    });
    /* {
      {this.props.content.name.map((name) => {
          return <div className="name">{name}</div>;
        })}
    } */
  }
}

export default withRouter(ContentsEntry);
