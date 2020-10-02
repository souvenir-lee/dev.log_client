import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = "include";

class ContentsEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDetail: false,
    };
    this.getContentDetail = this.getContentDetail.bind(this);
  }

  getContentDetail = () => {
    axios
<<<<<<< HEAD
      // .get(`http://localhost:4000/posts/info/${this.props.content.id}`)
      .get(`https://devyeon.com/posts/info/${this.props.content.id}`) //이건되는데 왜 위에는 안될까
=======
      //.get(`http://localhost:4000/posts/info/${this.props.content.id}`)
       .get(`https://devyeon.com/posts/info/${this.props.content.id}`) //이건되는데 왜 위에는 안될까
>>>>>>> 68ec3ce105c3b2fc14d9c1e2652c0692894144bd
      .then((res) => {
        this.props.handleClickedContent(res.data);
      });
    console.log("클릭컨텐츠", this.props);
  };

  render() {
    return (
      <div
        className="contentBox"
        onClick={() => {
          // console.log("클릭되나");
          this.getContentDetail();
          this.setState({ isDetail: !this.state.isDetail });
        }}
      >
        {this.state.isDetail ? <Redirect to="/main/detail" /> : ""}

        <div className="detailName">{this.props.content.username}</div>
        <div className="detailTitle">{this.props.content.title}</div>
        <div>
          <span className="detailComment">
            댓글{this.props.content.comment}
          </span>
          <span className="detailViewCount">
            조회수{this.props.content.view_count}
          </span>
        </div>
        {/* {this.props.content.name.map((name) => {
          return <div className="name">{name}</div>;
        })} */}
      </div>
    );
  }
}

export default withRouter(ContentsEntry);
