import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import hideImg from "./assets/icons/bx-hide.png"
import showImg from "./assets/icons/bx-show.png"
import fullscreenImg from "./assets/icons/fullscreen.png"
import useVideoPlayer from "./hooks/useVideoPlayer";

import ReactPlayer from 'react-player';

import video from "./assets/play23.mp4";
//Need to download this video from

const App = () => {
  const videoElement = useRef(null);
  const overlayElRef = useRef(null);
  
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [isShow, setShow] = useState(true)
  const [isfull, setFull] = useState(false)

  const [play, setPlay] = useState(false)

  const videosrc ='https://player.vimeo.com/progressive_redirect/playback/765274099/rendition/1080p/file.mp4?loc=external&signature=35f8d5c89d04f0d457c2f08a58d32b7271187bd6a39049053ebeb502924721e0'

  useEffect (()=>{
      setWidth( overlayElRef.current.clientWidth)
      setHeight(overlayElRef.current.clientHeight)   
      // console.log(isShow)   
  })
  
  function fnShow(){
    setShow(!isShow)
  }

  function fnFullscreen(){
    setFull(!isfull)
  }

  const {   
    isPlaying,
    progress,
    speed,
    isMuted,
    positions,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    videocurf,
  } = useVideoPlayer(videoElement);


  useEffect(() => {
    console.log("currentframe", videocurf)
  }, [videocurf])

  return (
    <div className="container">
      <div className="player-wrapper">
        {/* <video
          src={video}
          ref={videoElement}
          onTimeUpdate={handleOnTimeUpdate}
        /> */}
        <ReactPlayer
            className="react-player"
            url={video}
            ref={videoElement}
            onPlay={() => setPlay(true)}
            onPause={() => setPlay(false)}
            // onProgress={(p) => setCurTagStatusText(displayTagInfo())}
            playing={play}
            // playbackRate={PLAYBACK_RATE[playRate].rate}
            controls={true}
            width="97%"
            height="97%"
            style={{
                pointerEvents: 'auto'
            }}
        />
        <div 
            className="detection" 
            ref={overlayElRef}
        >
            {isShow && 
              positions.map(item => {    
                let x = item.x
                let y = item.y
                let w = item.w
                let h = item.h           
                let player = item.pui
                let frame_id=item.id
                
                let xpos = width*x/1920 
                let ypos = height*y/1080
                let rect_w = width*w/1920 
                let rect_h = height*h/1080              
      
                return(
                  <div 
                    key={frame_id} 
                    style={{
                        backgroundColor: 'rgba(0, 255, 128, 0)', 
                        position: 'absolute', 
                        left: xpos, 
                        top: ypos-16, 
                        width: rect_w, 
                        height: rect_h + 16, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center'
                    }}
                  >
                    <div 
                        style={{
                            backgroundColor:'rgba(0, 0, 0, 0.55)', 
                            paddingLeft:2, 
                            paddingRight:2, 
                            width: 'fitContent', 
                            height:16, 
                            leftMargin:'auto', 
                            rightMargin:'auto', 
                            fontSize:12, 
                            color:'white'
                        }}
                    >
                        {player}
                    </div>

                    <div 
                        style={{
                            flexGrow:1, 
                            border: '1px solid red', 
                            width:'100%'
                        }}>                          
                    </div>

                  </div>
                );
            })}
        </div>

        <div className="fnbuttons" >
            <div  onClick={fnShow}>
                {isShow ? 
                    <img src={hideImg} style={{ filter: 'invert(1)' }} /> : 
                    <img src={showImg} style={{ filter: 'invert(1)' }} />
                }
            </div>

            {/* <div className="fnbuttons">
              <button style={{width:'fit-content'}} onClick={fnShow}>
                {isShow ?(
                    <img src={hideImg} />
                  ):(
                    <img src={showImg} />
                  )
                }
              </button>
            </div> */}

        </div>

        {/* <div className="controls">
            <button onClick={togglePlay}>
              {!isPlaying ? (
                <span className="bx-play"></span>
              ) : (
                <span className="bx-pause"></span>
              )}
            </button>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => handleVideoProgress(e)}
          />
          <select
            className="velocity"
            value={speed}
            onChange={(e) => handleVideoSpeed(e)}
          >
            <option value="0.50">0.50x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="2">2x</option>
          </select>
          <button className="mute-btn" onClick={toggleMute}>
            {!isMuted ? (
              <i className="bxs-volume-full"></i>
            ) : (
              <i className="bxs-volume-mute"></i>
            )}
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default App;
