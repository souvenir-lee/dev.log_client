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
class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
  }
  render() {
    return (
      <div>
        <div>댓글 :0</div>
        <div>
          <input
            className=""
            type=""
            placeholder="댓글을 입력해주세요"
            // onChange={this.handleInputValue("comment")}
          ></input>
        </div>
        <CommentEntry />
      </div>
    );
  }
}
export default Comment;
