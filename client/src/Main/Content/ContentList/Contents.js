/*
import ContentsEntry.js
1. 새글쓰기 버튼을 누르면 Post.js로 리다이렉트

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
import { withRouter, useHistory } from "react-router-dom";
import ContentsEntry from "./ContentsEntry";

const Contents = ({ cateory, contentsList }) => {
  let history = useHistory();

  return (
    <div>
      <button
        className="contents_btn"
        onClick={() => {
          console.log("클릭되나");
          return history.push("/main/post"); // 나중에 Post.js로 연결하기
        }}
      >
        새글 쓰기
      </button>
      {contentsList.map((content) => (
        <ContentsEntry cateory={cateory} content={content} />
      ))}
    </div>
  );
};

export default withRouter(Contents);
