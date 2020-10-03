import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = "include";

class CustomEntry extends React.Component {
  constructor(props) {
    super();
    this.state = {
      // isDetail: false,
      target: "postId",
    };
    // this.getContentDetail = this.getContentDetail.bind(this);
  }

  // getContentDetail = (content) => {
  //   axios
  //     .get(`https://devyeon.com/posts/info/${content.postId}`) //이건되는데 왜 위에는 안될까
  //     .then((res) => {
  //       this.props.handleClickedContent(res.data);
  //       console.log("THIS IS ++CUSTOM++ AFTER GET DETAIL");
  //     });
  // };

  render() {
    const {
      listCustom,
      getContentDetail,
      selectedOption,
      isDetail,
      handleIsDetail,
    } = this.props;
    return (
      <>
        <h3>{selectedOption} List</h3>
        {Object.values(listCustom).length !== 0
          ? Object.values(listCustom).map((content) => (
              <div
                key={`listCustom${Object.values(listCustom).indexOf(content)}`}
                onClick={() => {
                  getContentDetail(content, content.postId);
                  handleIsDetail();
                  // this.setState({ isDetail: !isDetail });
                }}
              >
                {isDetail ? <Redirect to="/main/detail" /> : ""}
                <div>{content["post.title"]}</div>
                <div>{content["user.username"]}</div>
              </div>
            ))
          : ""}
      </>
    );
  }
}

export default withRouter(CustomEntry);
