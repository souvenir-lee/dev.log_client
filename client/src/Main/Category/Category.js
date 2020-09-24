/*
CategoryEntry.js를 import한다.
카테고리 개수만큼 map으로 돌리기
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
import CatgeoryEntry from "./CategoryEntry"

const Catgeory = ({cateory, contentsList, handleInputCategory, handleContentList}) => (
  <div className="listup_cateory">
      <CatgeoryEntry 
        cateory={cateory} 
        contentsList={contentsList} 
        handleInputCategory={handleInputCategory} 
        handleContentList={handleContentList}/>
  </div>
);

export default Catgeory;


