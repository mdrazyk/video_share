import {
  SET_VIDEO_DATA,
  UPDATE_VIDEO_DATA,
  SET_TAB_DATA,
		SET_PAGE_KEY,
		SET_LOADING_VIDEO_DATA,
} from '../types/videoShareTypes';

const videoShareActions = dispatch => {
  const setPageKey = pageKey =>
    dispatch({
      type: SET_PAGE_KEY,
      pageKey,
    });

  const setVideoData = videos =>
    dispatch({
      type: SET_VIDEO_DATA,
      videos,
    });

  const updateVideoData = video =>
    dispatch({
      type: UPDATE_VIDEO_DATA,
      video,
    });

  const setTabData = ({ url, id }) =>
    dispatch({
      type: SET_TAB_DATA,
      tab: { url, id },
				});

  const setLoadingVideoData = isLoadingVideoData =>
    dispatch({
      type: SET_LOADING_VIDEO_DATA,
      isLoadingVideoData,
    });

  return {
    setPageKey,
    setVideoData,
    updateVideoData,
				setTabData,
				setLoadingVideoData,
  };
};

export default videoShareActions;
