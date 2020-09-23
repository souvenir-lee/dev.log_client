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

import React from 'react';
import ContentsEntry from "./ContentsEntry"

const Contents = ({cateory, handleInputCategory}) => (
  <div className="listup_cateory">
      <CatgeoryEntry cateory={cateory} handleInputCategory={handleInputCategory}/>
  </div>
);

export default Contents;