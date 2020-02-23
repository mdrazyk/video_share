import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import FetchVideoDataButton from './fetchVideoDataButton';
import CurrentVideo from './currentVideo';

import { StateContext, DispatchContext } from '../context';

import { GET_VIDEO_DATA } from '../constants/chromeMessages';

import {
  FETCH_VIDEO,
  CURRENT_VIDEO,
  VIDEO_LIST,
} from '../constants/videoSharePages';

import {
  currentTabUrlSelector,
  currentTabIdSelector,
  videoDataSelector,
  isLoadingVideoDataSelector,
} from '../selectors/videoShareSelectors';

import videoShareActions from '../actions/videoShareActions';

const {
  chrome: { tabs },
} = window;

const VideoSharePages = ({ pageKey }) => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const tabUrl = currentTabUrlSelector(state);
  const tabId = currentTabIdSelector(state);
  const videoData = videoDataSelector(state);
  const isLoadingVideoData = isLoadingVideoDataSelector(state);

  const { setLoadingVideoData, setPageKey } = videoShareActions(dispatch);

  const fetchVideoData = () => {
    setLoadingVideoData(true);
    setPageKey(CURRENT_VIDEO);
    tabs.sendMessage(tabId, {
      type: GET_VIDEO_DATA,
      url: tabUrl,
    });
  };

  return {
    [FETCH_VIDEO]: <FetchVideoDataButton onClick={fetchVideoData} />,
    [CURRENT_VIDEO]: (
      <CurrentVideo
        videoData={videoData}
        isLoadingVideoData={isLoadingVideoData}
      />
    ),
    // TODO Implement Video List
    // [VIDEO_LIST]: <div>Video List</div>,
  }[pageKey];
};

VideoSharePages.propTypes = {
  pageKey: PropTypes.string.isRequired,
};

export default VideoSharePages;
