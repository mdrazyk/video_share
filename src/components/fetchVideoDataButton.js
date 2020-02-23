import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const FetchVideoDataButton = ({ onClick }) => (
  <Button className="card-button" variant="info" onClick={onClick}>
    Fetch Video Data
  </Button>
);

FetchVideoDataButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default FetchVideoDataButton;
