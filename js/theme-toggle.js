(function () {
  const THEME_KEY = 'theme-preference';
  const HTML_ATTR = 'data-theme';

  function getSystemPreference() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getSavedPreference() {
    return localStorage.getItem(THEME_KEY);
  }

  function getEffectiveTheme() {
    return getSavedPreference() || getSystemPreference();
  }

  function setTheme(theme) {
    document.documentElement.setAttribute(HTML_ATTR, theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  function toggle() {
    const current = getEffectiveTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }

  function init() {
    const theme = getEffectiveTheme();
    setTheme(theme);

    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggle);
    }

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', function () {
      const saved = getSavedPreference();
      if (!saved) {
        setTheme(getSystemPreference());
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
