import loadScript from 'utils/loadScript';

export default function configureZendesk({ zendesk }) {
  loadScript({
    id: 'ze-snippet',
    async: true,
    src: `https://static.zdassets.com/ekr/snippet.js?key=${zendesk.webWidgetKey}`
  });
}
