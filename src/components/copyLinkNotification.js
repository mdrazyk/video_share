import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Toast } from 'react-bootstrap';

import useMousePosition from './useMousePosition';

const CopyLinkNotification = ({ triggerCopyLinkNotification }) => {
  const position = useMousePosition();
  const [show, setShow] = useState(false);

  useEffect(() => {
    triggerCopyLinkNotification(() => setShow(true));
  }, [triggerCopyLinkNotification]);

  useEffect(() => {
    if (show) {
      const intervalId = setInterval(() => setShow(false), 1000);
      return () => clearInterval(intervalId);
    }
  }, [show]);

  const toastPosition = {
    position: 'absolute',
    top: '14px',
    left: '5px',
    transform: `translate(${position.x}px, ${position.y}px)`,
    zIndex: 1,
  };

  return (
    <Toast
      className="card-copy-link-notification"
      show={show}
      autohide
      style={toastPosition}
    >
      <small>Link copied</small>
    </Toast>
  );
};

CopyLinkNotification.propTypes = {
  triggerCopyLinkNotification: PropTypes.func.isRequired,
};

export default CopyLinkNotification;
