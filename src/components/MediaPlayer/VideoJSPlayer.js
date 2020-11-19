import React from 'react';
import PropTypes from 'prop-types';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import hlsjs from 'hls.js';
import 'videojs-markers-plugin/dist/videojs-markers-plugin';
import 'videojs-markers-plugin/dist/videojs.markers.plugin.css';
import {
  usePlayerDispatch,
  usePlayerState,
} from '../../context/player-context';
import {
  useManifestDispatch,
  useManifestState,
} from '../../context/manifest-context';


function VideoJSPlayer({ isVideo, initStartTime, ...videoJSOptions }) {
  const playerRef = React.useRef();
  const playerDispatch = usePlayerDispatch();
  const { isClicked, isPlaying, captionOn } = usePlayerState();
  const manifestDispatch = useManifestDispatch();
  const { manifest, canvasIndex } = useManifestState();
  const { startTime, endTime } = usePlayerState();
  const [cIndex, setCIndex] = React.useState(canvasIndex);

  React.useEffect(() => {
    let Player = videojs(playerRef.current, videoJSOptions);
    //console.log('Player', Player);

    Player.on('ready', function () {
      console.log('ready');

      // Initialize markers
      Player.markers({
        markerStyle: {
          'width':'4px',
          'background-color': 'red',
          'border-radius': 0,
        },
        markers: []
      })
    });

    Player.on('ended', () => {
      console.log('ended');
      handleEnded(Player);
    });

    Player.on('loadedmetadata', () => {
      console.log('loadedmetadata');
    });

    Player.on('pause', () => {
      console.log('pause');
      playerDispatch({ isPlaying: false, type: 'setPlayingStatus' });
    });

    Player.on('play', () => {
      console.log('play');
      playerDispatch({ isPlaying: true, type: 'setPlayingStatus' });
    });


    // Clean up player instance on component unmount
    //return () => player.dispose();
  }, []);

  React.useEffect(() => {
    let Player = videojs(playerRef.current, videoJSOptions);

    if (startTime != null) {
      Player.currentTime(
        startTime,
        playerDispatch({ type: 'resetClick' })
      );

      // Mark current timefragment
      if (Player.markers) {
        Player.markers.removeAll();
        Player.markers.add([{ time: startTime, duration: endTime - startTime, text: "this" }]);
      }
    }
  }, [startTime, endTime])

  const handleEnded = (Player) => {
    // TODO: Need to get this working
    // if (hasNextSection({ canvasIndex, manifest })) {
    //   manifestDispatch({ canvasIndex: canvasIndex + 1, type: 'switchCanvas' });
    //   let newInstance = switchMedia(
    //     player,
    //     canvasIndex + 1,
    //     isPlaying || true,
    //     captionOn,
    //     manifest
    //   );
    //   playerDispatch({ player: newInstance, type: 'updatePlayer' });
    //   setCIndex(cIndex + 1);
    // }
  };

  return (
    <div data-vjs-player>
      {isVideo ? (
        <video
          data-testid="video-element"
          ref={playerRef}
          className="video-js"
        ></video>
      ) : (
        <audio
          data-testid="audio-element"
          ref={playerRef}
          className="video-js vjs-default-skin"
        ></audio>
      )}
    </div>
  );
}

VideoJSPlayer.propTypes = {};

export default VideoJSPlayer;
