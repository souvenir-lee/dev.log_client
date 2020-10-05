import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
axios.defaults.withCredentials = "include";

const ListSet = styled.div`
  border-bottom: 1px solid black;
  padding: 5px 0px;
`;

const Title = styled.div`
  margin: 7px 0px;
`;
const Search = styled.div`
  margin: 7px 0px;
`;
const Date = styled.div`
  margin: 7px 0px;
`;
const Category = styled.div`
  margin: 7px 0px;
`;

const Detail = styled.div`
  margin: 5px;
`;
// const DetailName = styled(Detail)`
//   font-weight: bold;
// `;

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
      <div>
        {Object.values(listCustom).length !== 0 ? (
          Object.values(listCustom).map((content) => (
            <ListSet
              key={`listCustom${Object.values(listCustom).indexOf(content)}`}
              onClick={() => {
                getContentDetail(
                  content,
                  content.postId || content.id || content["post.id"]
                );
                return !isDetail ? handleIsDetail() : "";
              }}
            >
              <Title>
                제목:{" "}
                {content["post.title"] ||
                  content["title"] ||
                  content["post.title"]}
              </Title>
              <Search>
                조회:{" "}
                {content["post.viewCount"] ||
                  content["viewCount"] ||
                  content["post.viewcount"] ||
                  0}
                회{/* 서버 오타 */}
              </Search>
              <Date>
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
              </Date>
              <Category>
                카테고리:{" "}
                {content["post.category.title"] ||
                  content["category"] ||
                  content["post.category.title"]}
              </Category>
            </ListSet>
          ))
        ) : (
          <div>{selectedOption}에 해당하는 글이 없습니다.</div>
        )}
      </div>
    );
  }
}

export default withRouter(CustomEntry);
