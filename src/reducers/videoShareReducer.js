import {
  SET_VIDEO_DATA,
  UPDATE_VIDEO_DATA,
  SET_TAB_DATA,
	SET_PAGE_KEY,
	SET_LOADING_VIDEO_DATA,
} from '../types/videoShareTypes';

import { FETCH_VIDEO } from '../constants/videoSharePages';

const initialVideoShareState = {
  videos: null,
  tabUrl: '',
	pageKey: FETCH_VIDEO,
	isLoadingVideoData: false,
};

const updateVideoData = (state, video) => {
  const { tabUrl, hdUrl, sdUrl } = video;
  return {
    ...state,
    videos: {
      ...state.videos,
      [tabUrl]: {
        hdUrl,
        sdUrl,
      },
    },
  };
};

const videoShareReducer = (state, action) => {
  switch (action.type) {
    case SET_VIDEO_DATA:
      return {
        ...state,
        videos: action.videos,
      };
    case UPDATE_VIDEO_DATA:
      return updateVideoData(state, action.video);
    case SET_TAB_DATA:
      return {
        ...state,
        tabUrl: action.tab.url,
        tabId: action.tab.id,
      };
    case SET_PAGE_KEY:
      return {
        ...state,
        pageKey: action.pageKey,
      };
    case SET_LOADING_VIDEO_DATA:
      return {
        ...state,
        isLoadingVideoData: action.isLoadingVideoData,
      };
    default:
      throw new Error('Error in videoShareReducer');
  }
};

export { initialVideoShareState, videoShareReducer };
