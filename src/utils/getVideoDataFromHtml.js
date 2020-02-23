const getHtmlContent = ({ html, start, end }) => {
  const spliStart = html.indexOf(start) + start.length;
  const splitEnd = html.indexOf(end);
  return html.slice(spliStart, splitEnd);
};

const getVideoDataFromHtml = html => {
  const hdUrl = getHtmlContent({ html, start: 'hd_src:"', end: '",sd_src:"' });
  const sdUrl = getHtmlContent({ html, start: 'sd_src:"', end: '",hd_tag:"' });

  return {
    hdUrl: hdUrl && hdUrl.startsWith('https://') ? hdUrl : null,
    sdUrl: sdUrl && sdUrl.startsWith('https://') ? sdUrl : null,
  };
};

export default getVideoDataFromHtml;
