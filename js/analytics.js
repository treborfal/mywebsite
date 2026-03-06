(function () {
  var trackingId = 'UA-546243-2';

  if (!trackingId || typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  if (!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(trackingId);
    document.head.appendChild(script);
  }

  window.gtag('js', new Date());
  window.gtag('config', trackingId);
})();
