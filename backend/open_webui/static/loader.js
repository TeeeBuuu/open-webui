(() => {
  const BRAND_NAME = 'Ask Docis';
  const BRAND_ICON = '/static/brand-favicon.png';
  const BRAND_LOGO = '/static/brand-logo.png';

  function setTitle() {
    if (!document.title.includes(BRAND_NAME)) {
      document.title = document.title.replace(/Open WebUI/gi, BRAND_NAME);
      if (!document.title.includes(BRAND_NAME)) {
        document.title = BRAND_NAME;
      }
    }
  }

  function setFavicons() {
    const selectors = [
      'link[rel="icon"]',
      'link[rel="shortcut icon"]',
      'link[rel="apple-touch-icon"]'
    ];

    document.querySelectorAll(selectors.join(',')).forEach((el) => {
      el.href = BRAND_ICON;
    });
  }

  function replaceText(node) {
    if (!node || node.nodeType !== Node.TEXT_NODE) return;
    if (node.nodeValue && node.nodeValue.includes('Open WebUI')) {
      node.nodeValue = node.nodeValue.replace(/Open WebUI/g, BRAND_NAME);
    }
  }

  function walkText(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      replaceText(node);
    }
  }

  function replaceImages() {
    document.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute('src') || '';

      if (
        src.includes('/static/favicon.png') ||
        src.includes('/favicon.png') ||
        src.includes('/static/logo.png') ||
        src.includes('/static/splash.png') ||
        src.includes('/static/splash-dark.png')
      ) {
        img.src = BRAND_LOGO;
      }
    });
  }

  function patch() {
    setTitle();
    setFavicons();
    walkText(document.body);
    replaceImages();
  }

  const observer = new MutationObserver(() => {
    patch();
  });

  window.addEventListener('load', () => {
    patch();
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true
    });
  });

  setInterval(() => {
    setTitle();
    setFavicons();
  }, 1000);
})();