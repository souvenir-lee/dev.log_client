/*
Logo.js와 User.js를 import한다.

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
import Logo from './Logo'
import User from './User'

const Nav = ({isLogin, userinfo, handleIsLoginChange}) => (
  <div className="listup_nav">
    <Logo></Logo>
    <User isLogin={isLogin} userinfo={userinfo} handleIsLoginChange={handleIsLoginChange}></User>
  </div>
);

export default Nav;
