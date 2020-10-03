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
        {Object.values(listCustom).length !== 0
          ? Object.values(listCustom).map((content) => (
              <div
                key={`listCustom${Object.values(listCustom).indexOf(content)}`}
                onClick={() => {
                  {
                    selectedOption === "MyPost"
                      ? getContentDetail(content, content.id)
                      : getContentDetail(content, content.postId);
                  }
                  handleIsDetail();
                }}
              >
                {isDetail ? <Redirect to="/main/detail" /> : ""}

                {selectedOption === "Scrap" ? (
                  <>
                    <div>{content["post.title"]}</div>
                    <div>{content["user.username"]}</div>
                  </>
                ) : (
                  ""
                )}
                {selectedOption === "MyPost" ? (
                  <>
                    <div>{content["title"]}</div>
                    <div>{content["authorId"]}</div>
                  </>
                ) : (
                  ""
                )}
                {selectedOption === "Tagged" ? (
                  <>
                    <div>{content["post.title"]}</div>
                    <div>{content["member.username"]}</div>
                  </>
                ) : (
                  ""
                )}
              </div>
            ))
          : ""}
      </>
    );
  }
}

export default withRouter(CustomEntry);
