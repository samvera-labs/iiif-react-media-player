import React, { useEffect, useState } from 'react';
import MediaElement from '@Components/MediaPlayer/MediaElement';
import VideoJSPlayer from '@Components/VideoJSPlayer';
import PropTypes from 'prop-types';
import ErrorMessage from '@Components/ErrorMessage/ErrorMessage';
import { getMediaInfo, getTracks } from '@Services/iiif-parser';
import { useManifestState } from '../../context/manifest-context';

const MediaElementContainer = () => {
  const manifestState = useManifestState();
  const [ready, setReady] = useState(false);
  const [sources, setSources] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [mediaType, setMediaType] = useState('audio');
  const [error, setError] = useState(null);

  const { canvasIndex, manifest } = manifestState;
  const isVideo = mediaType === 'video' ? true : false;
  let videojsOptions = {
    autoplay: false,
    controls: true,
    bigPlayButton: false,
    width: 600,
    height: 300,
    sources: sources,
    tracks: tracks,
    // html5: {
    //   nativeTextTracks: true,
    // },
    controlBar: {
      children: [
        'playToggle',
        'progressControl',
        'volumePanel',
        'qualitySelector',
        isVideo ? 'thumbnailButton' : '',
        'fullscreenToggle',
      ],
    },
  };

  useEffect(() => {
    if (manifest) {
      const { sources, mediaType, error } = getMediaInfo({
        manifest,
        canvasIndex,
      });
      setTracks(getTracks({ manifest }));
      setSources(sources);
      setMediaType(mediaType);
      setError(error);
      error ? setReady(false) : setReady(true);

      videojsOptions.poster = manifest.thumbnail ? manifest.thumbnail.id : ''
    }
  }, [manifest]); // Re-run the effect when manifest changes

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return ready ? (
    <div data-testid={`mediaelement`} id="mediaelement">
      {/* <MediaElement
        controls
        crossorigin="anonymous"
        height={manifest.height || 360}
        id="avln-mediaelement-component"
        mediaType={mediaType}
        options={JSON.stringify({})}
        poster=""
        preload="auto"
        sources={JSON.stringify(sources)}
        tracks={JSON.stringify(tracks)}
        width={manifest.width || 480}
      /> */}
      <VideoJSPlayer
        options={videojsOptions}
        isVideo={mediaType === 'video' ? true : false}
      />
    </div>
  ) : null;
};

MediaElementContainer.propTypes = {};

export default MediaElementContainer;
