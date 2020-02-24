import getVideoDataFromHtml from '../src/utils/getVideoDataFromHtml';
import {
  GET_VIDEO_DATA,
  SEND_VIDEO_DATA,
} from '../src/constants/chromeMessages';

const {
  chrome: { runtime, storage },
} = window;

runtime.onMessage.addListener(async msg => {
  if (msg.type === GET_VIDEO_DATA) {
    const htmlData = await fetch(window.location.href).then(data =>
      data.text(),
    );
    const videoData = getVideoDataFromHtml(htmlData);

    const { sdUrl, hdUrl } = videoData;
    if (!sdUrl && !hdUrl) {
      return runtime.sendMessage({ type: SEND_VIDEO_DATA });
    }

    storage.sync.set({ [msg.url]: videoData }, () =>
      runtime.sendMessage({ type: SEND_VIDEO_DATA }),
    );
  }
});
