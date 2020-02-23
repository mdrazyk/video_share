import getVideoDataFromHtml from '../utils/getVideoDataFromHtml';
import fs from 'fs';

let testVideoHtmlData = null;

beforeAll(() => {
  testVideoHtmlData = fs.readFileSync(
    `${__dirname}/testVideoHtmlData.txt`,
    'utf-8',
  );
});

describe('getVideoDataFromHtml', () => {
  it(`should return video object in following format: { sdUrl: 'https://...', hdUrl: 'https://...', image: 'https://...' }`, async () => {
    // given
    const expetedResult = {
      hdUrl:
        'https://scontent.fktw1-1.fna.fbcdn.net/v/t39.24130-6/68528260_161828014951845_8794330169453958430_n.mp4?_nc_cat=104&efg=eyJ2ZW5jb2RlX3RhZyI6Im9lcF9oZCJ9&_nc_oc=AQkD5IVcezxUeASOUPYmRKExfVcrA_z7pq_LaUJqpotk-Mcg8JXMq2qdWl_ir6X1RsE&_nc_ht=scontent.fktw1-1.fna&oh=f10e6130d85125c582cd14a9119e023c&oe=5E241EC7',
      sdUrl:
        'https://video.fktw1-1.fna.fbcdn.net/v/t42.9040-2/68755514_2379869185606167_5066508812962234368_n.mp4?_nc_cat=103&efg=eyJybHIiOjM1MiwicmxhIjo1MTIsInZlbmNvZGVfdGFnIjoic3ZlX3NkIn0%3D&_nc_oc=AQkhCmMNso96gAs0EexllPcEwkbLSnh3mzZU8me-N8RhBXE8rMLgoyWXJMuR34IXs_E&rl=352&vabr=196&_nc_ht=video.fktw1-1.fna&oh=d4e0c6d1feb511d42577112430fc43d4&oe=5DB8C476',
    };

    // when
    const videoObject = getVideoDataFromHtml(testVideoHtmlData);

    // then
    expect(videoObject).toEqual(expetedResult);
  });
});
