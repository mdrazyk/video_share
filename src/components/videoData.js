import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

import CopyLinkNotification from './copyLinkNotification';
import VideoLinkBadge from './videoLinkBadge';
import VideoDownloadButton from './videoDownloadButton';

const VideoData = ({ hdUrl, sdUrl }) => {
  const [notification, setNotification] = useState(null);
  const videoRef = useRef(null);

  const triggerCopyLinkNotification = useCallback(
    showNotification => {
      setNotification({ showNotification });
    },
    [setNotification],
  );

  const downloadVideo = url => () => {
    const link = document.createElement('a');
    fetch(url)
      .then(video => video.url)
      .then(downloadableUrl => {
        link.href = downloadableUrl;
        link.download = true;
        link.click();
        link.remove();
      });
  };

  useEffect(() => {
    videoRef.current.disablePictureInPicture = true;
  }, [videoRef]);

  return (
    <Container>
      <CopyLinkNotification
        triggerCopyLinkNotification={triggerCopyLinkNotification}
      />
      <video
        className="card-video"
        controls
        controlsList="nofullscreen noremoteplayback"
        ref={videoRef}
      >
        <source src={hdUrl || sdUrl} type="video/mp4" />
        <source src={hdUrl || sdUrl} type="video/webm" />
      </video>
      <Row className="justify-content-md-center">
        <Col className="card-col-container-left">
          <VideoDownloadButton url={sdUrl} downloadCallback={downloadVideo}>
            Download SD Video
          </VideoDownloadButton>
        </Col>
        <Col className="card-col-container-right">
          <VideoDownloadButton url={hdUrl} downloadCallback={downloadVideo}>
            Download HD Video
          </VideoDownloadButton>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col className="card-col-container-left">
          <VideoLinkBadge
            url={sdUrl}
            showNotification={notification && notification.showNotification}
            falbackMessage="SD version does not exits"
          />
        </Col>
        <Col className="card-col-container-right">
          <VideoLinkBadge
            url={hdUrl}
            showNotification={notification && notification.showNotification}
            falbackMessage="HD version does not exits"
          />
        </Col>
      </Row>
    </Container>
  );
};

VideoData.propTypes = {
  hdUrl: PropTypes.string,
  sdUrl: PropTypes.string,
};

export default VideoData;
