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
        {Object.values(listCustom).length !== 0 ? (
          Object.values(listCustom).map((content) => (
            <div
              key={`listCustom${Object.values(listCustom).indexOf(content)}`}
              onClick={() => {
                getContentDetail(
                  content,
                  content.postId || content.id || content["post.id"]
                );
                return !isDetail ? handleIsDetail() : "";
              }}
            >
              <div>
                제목:{" "}
                {content["post.title"] ||
                  content["title"] ||
                  content["post.title"]}
              </div>
              <div>
                조회:{" "}
                {content["post.viewCount"] ||
                  content["viewCount"] ||
                  content["post.viewCount"]}
                회
              </div>
              <div>
                작성일:{" "}
                {content["post.createdAt"]
                  ? content["post.createdAt"]
                      .split(" ")[0]
                      .replace("-", ".")
                      .replace("-", ".")
                  : "" || content["createdAt"]
                  ? content["createdAt"]
                      .split(" ")[0]
                      .replace("-", ".")
                      .replace("-", ".")
                  : "" || content["post.author.createdAt"]
                  ? content["post.author.createdAt"]
                      .split(" ")[0]
                      .replace("-", ".")
                      .replace("-", ".")
                  : ""}
              </div>
              <div>
                카테고리:{" "}
                {content["post.category.title"] ||
                  content["category"] ||
                  content["post.category.title"]}
              </div>
            </div>
          ))
        ) : (
          <div>{selectedOption}에 해당하는 글이 없습니다.</div>
        )}
      </>
    );
  }
}

export default withRouter(CustomEntry);
