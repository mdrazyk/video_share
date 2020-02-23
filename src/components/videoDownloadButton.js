import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const VideoDownloadButton = ({ url, downloadCallback, children }) => {
  return (
    <Button
      className={
        url
          ? 'card-video-download-button'
          : 'card-video-download-button-disabled'
      }
      size="sm"
      variant="outline-info"
      disabled={!url}
      onClick={downloadCallback(url)}
    >
      {children}
    </Button>
  );
};

VideoDownloadButton.propTypes = {
  url: PropTypes.string,
  downloadCallback: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default VideoDownloadButton;
