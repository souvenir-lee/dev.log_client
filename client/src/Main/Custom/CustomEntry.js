import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = "include";

class CustomEntry extends React.Component {
  constructor(props) {
    super();
  }

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
