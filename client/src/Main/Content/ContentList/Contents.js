import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import ContentsEntry from "./ContentsEntry";

class Contents extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { contentsList, handleClickedContent, clickedContent } = this.props;

    return (
      <div className="container" id="middle">
        <button
          id="newPostBtn"
          onClick={() => {
            console.log("클릭되나");
            this.props.clickNewMessage();
            // this.props.clickNewMessage();
          }}
        >
          새글 쓰기
        </button>
        <ContentsEntry
          contentsList={contentsList}
          clickedContent={clickedContent}
          handleClickedContent={handleClickedContent}
        />
      </div>
    );
  }
}

export default withRouter(Contents);
