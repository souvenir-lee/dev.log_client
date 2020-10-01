import React from "react";
import { withRouter, useHistory, Redirect } from "react-router-dom";
import ContentsEntry from "./ContentsEntry";

class Contents extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      contentsList,
      handleClickedContent,
      clickedContent,
      editBtn,
      handleClickedContnet,
      newPost,
      userInfo,
    } = this.props;

    return (
      <div className="container" id="middle">
        {newPost ? <Redirect to="/main/post" /> : ""}

        <button
          id="newPostBtn"
          onClick={() => {
            console.log("클릭되나");
            handleClickedContnet();
            // this.props.clickNewMessage();
          }}
        >
          새글 쓰기
        </button>
        {contentsList.map((content) => (
          <ContentsEntry
            content={content}
            clickedContent={clickedContent}
            handleClickedContent={handleClickedContent}
          />
        ))}
      </div>
    );
  }
}

export default withRouter(Contents);
