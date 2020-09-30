import React from "react";
import { render } from "react-dom";
import { withRouter, useHistory, Redirect } from "react-router-dom";
import ContentsEntry from "./ContentsEntry";

class Contents extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isPost : false
    }
  }
  render(){
    const {contentsList, handleClickedContent, clickedContent, handleGetDefault, editBtn, userInfo } = this.props

    return (
      <div className="container" id="middle">
      {(this.state.isPost) ? <Redirect to='/main/post' /> : ''}

        <button
          id="newPostBtn"
          onClick={() => {
            console.log("클릭되나");
            this.setState({ isPost : true})
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
};

export default withRouter(Contents);
