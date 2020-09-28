/*
import CommentEntry.js
참고하세요.
const VideoList = (props) => (
  <div className="video-list media">
    {props.videos.map((video) => (
      <VideoListEntry
        key={video.id.videoId}
        video={video}
        clickEvent={props.clickEvent}
      />
    ))}
  </div>
);

export default VideoList;
*/
import React from "react";
import CommentEntry from "./CommentEntry";
import axios from "axios";
axios.defaults.withCredentials = true;

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [
        {
          username: "수진",
          message: "hello",
        },
        {
          username: "한슬",
          message: "good",
        },
        {
          username: "윤연",
          message: "word",
        },
      ],
      commentCount: 3,
      inputComment: "",
    };
  }
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };
  handleCommentClick = () => {
    axios.post("url", this.state.inputComment).then((res) => {
      if (res.status === 200) {
        this.setState({ comments: res });
      }
      //   this.props.getUserData(res.data);
    });
  };

  render() {
    return (
      <div>
        <div>댓글 :0</div>
        <div>
          <input
            className=""
            type=""
            placeholder="댓글을 입력해주세요"
            onChange={this.handleInputValue("inputComment")}
          ></input>
          <button
            className=""
            onClick={() => {
              this.handleCommentClick();
            }}
          >
            올리기
          </button>
        </div>
        {this.state.comments.map((comment) => (
          <CommentEntry comment={comment} />
        ))}
      </div>
    );
  }
}
export default Comment;
