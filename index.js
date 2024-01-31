const settings = require('ep_etherpad-lite/node/utils/Settings');

let siteId;
let hostname;

if (settings.ep_matomo){ 
  siteId = settings.ep_matomo.matomoSiteId;
  hostname = settings.ep_matomo.matomoHostname;
}

exports.eejsBlock_scripts = function (hookName, context, cb) {
  if (siteId && hostname) {
    const matomoString = `
    <!-- Matomo -->
    <script>
      var _paq = window._paq = window._paq || [];
      /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);
      (function() {
        var u="//${hostname}/";
        _paq.push(['setTrackerUrl', u+'matomo.php']);
        _paq.push(['setSiteId', '${siteId}']);
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
      })();
    </script>
    <!-- End Matomo Code -->
  `
    context.content = matomoString + context.content;
  } else {
    console.log('Matomo site id and/or hostname not set.')
  }

  return cb();
}
