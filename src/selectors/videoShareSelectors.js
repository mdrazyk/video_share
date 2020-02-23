export const currentTabUrlSelector = state => state && state.tabUrl;
export const currentTabIdSelector = state => state && state.tabId;
export const videoDataSelector = state => state && state.videos && state.videos[currentTabUrlSelector(state)];
export const isLoadingVideoDataSelector = state => state && state.isLoadingVideoData;
