import React, { createRef, useEffect, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import QualitySelector from '@silvermine/videojs-quality-selector';
import '@silvermine/videojs-quality-selector/src/sass/quality-selector.scss';
import { createTrackTags } from '@Services/mejs-utility-helper';

import ThumbnailButton from './ThumbnailButton';

const VideoJSPlayer = (props) => {
  let videoNode = createRef();
  let audioNode = createRef();

  let tracks = '';
  console.log(props);
  useEffect(() => {
    videojs.registerComponent('ThumbnailButton', ThumbnailButton);
    QualitySelector(videojs);

    tracks = createTrackTags(props.options.tracks);
    let videoJSPlayer;
    if (props.isVideo) {
      videoJSPlayer = videojs(
        videoNode,
        props.options,
        function onPlayerReady() {
          console.log('onPlayerReady', this);
        }
      );
    } else {
      videoJSPlayer = videojs(
        audioNode,
        props.options,
        function onPlayerReady() {
          console.log('onPlayerReady', this);
        }
      );
    }
    videoJSPlayer.src(props.options.sources);
  });

  return (
    <React.Fragment>
      {props.isVideo ? (
        <div data-vjs-player>
          <video
            ref={(node) => (videoNode = node)}
            className="video-js"
      >{tracks}</video>
        </div>
      ) : (
        <div data-vjs-player>
          <audio
            ref={(node) => (audioNode = node)}
            className="video-js vjs-default-skin"
          ></audio>
        </div>
      )}
    </React.Fragment>
  );
};

export default VideoJSPlayer;
