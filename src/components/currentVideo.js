import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

import VideoData from './videoData';

const CurrentVideo = ({ videoData, isLoadingVideoData }) => {
  if (isLoadingVideoData) {
    return (
      <Spinner className="card-spinner" animation="border" variant="info" />
    );
  }

  const { hdUrl, sdUrl } = videoData || {};
  return hdUrl || sdUrl ? (
    <VideoData hdUrl={hdUrl} sdUrl={sdUrl} />
  ) : (
    <div className="current-video">
      <h3>There is no video to show.</h3>
    </div>
  );
};

CurrentVideo.propTypes = {
  videoData: PropTypes.shape({
    hdUrl: PropTypes.string,
    sdUrl: PropTypes.string,
  }),
  isLoadingVideoData: PropTypes.bool.isRequired,
};

export default CurrentVideo;
