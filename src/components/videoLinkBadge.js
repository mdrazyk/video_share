import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';

const VideoLinkBadge = ({ url, showNotification, falbackMessage }) => {
  const copyBadgeContent = ({ target }) => {
    navigator.clipboard.writeText(target.innerText);
    showNotification();
  };

  return url ? (
    <Badge
      className="card-badge-link"
      variant="info"
      onClick={copyBadgeContent}
    >
      {url}
    </Badge>
  ) : (
    <Badge className="card-badge-blank" variant="warning">
      {falbackMessage}
    </Badge>
  );
};

VideoLinkBadge.propTypes = {
  url: PropTypes.string,
  showNotification: PropTypes.func,
  falbackMessage: PropTypes.string.isRequired,
};

export default VideoLinkBadge;
