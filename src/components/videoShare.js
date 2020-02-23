import React, { useEffect, useReducer } from 'react';
import { Card, Tabs, Tab } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './videoShare.css';

import VideoSharePages from './videoSharePages';

import { SEND_VIDEO_DATA } from '../constants/chromeMessages';
import {
  FETCH_VIDEO,
  CURRENT_VIDEO,
  VIDEO_LIST,
} from '../constants/videoSharePages';

import {
  initialVideoShareState,
  videoShareReducer,
} from '../reducers/videoShareReducer';

import videoShareActions from '../actions/videoShareActions';

import { videoDataSelector } from '../selectors/videoShareSelectors';

import { StateContext, DispatchContext } from '../context';

const {
  chrome: { tabs, storage, runtime },
} = window;

const VideoImageShare = () => {
  const [state, dispatch] = useReducer(
    videoShareReducer,
    initialVideoShareState,
  );
  const { tabUrl, videos, pageKey } = state;
  const videoData = videoDataSelector(state);
  const {
    setPageKey,
    setVideoData,
    updateVideoData,
    setTabData,
    setLoadingVideoData,
  } = videoShareActions(dispatch);

  useEffect(() => {
    if (!videos) {
      storage.sync.get(null, videos => setVideoData(videos));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videos]);

  useEffect(() => {
    if (!tabUrl) {
      tabs.query({}, tabs => {
        tabs.forEach(tab => {
          const { active, url, id } = tab;
          if (active) {
            setTabData({ url, id });
          }
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabUrl]);

  useEffect(() => {
    if (tabUrl) {
      storage.sync.get(tabUrl, result => {
        const { hdUrl, sdUrl } = result[tabUrl] || {};
        const video = { tabUrl, hdUrl, sdUrl };
        setPageKey(CURRENT_VIDEO);
        updateVideoData(video);
        setLoadingVideoData(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabUrl]);

  useEffect(() => {
    if (tabUrl) {
      runtime.onMessage.addListener(async msg => {
        if (msg.type === SEND_VIDEO_DATA) {
          storage.sync.get(tabUrl, result => {
            const { hdUrl, sdUrl } = result[tabUrl] || {};
            const video = { tabUrl, hdUrl, sdUrl };
            updateVideoData(video);
            setLoadingVideoData(false);
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tabUrl]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Card className="text-center">
          <Card.Header className="card-header">
            <b>Video Share</b>
            <Tabs
              className="card-tab"
              id="controlled-tab"
              activeKey={pageKey}
              onSelect={key => setPageKey(key)}
            >
              <Tab eventKey={FETCH_VIDEO} title="Fetch Video" />
              <Tab
                eventKey={CURRENT_VIDEO}
                title="Current Video"
                disabled={!videoData}
              />
              <Tab eventKey={VIDEO_LIST} title="Video List" />
            </Tabs>
          </Card.Header>
          <Card.Body className="card-body">
            <VideoSharePages pageKey={pageKey} />
          </Card.Body>
          <Card.Footer className="text-muted card-footer">
            <p>
              Remember. Facebook video URL expires after few hours and you will
              not be able to watch it anymore. You can generate another one and
              share it again.
            </p>
          </Card.Footer>
        </Card>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default VideoImageShare;
