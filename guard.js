/* The safety net. If the site cannot start (a script failed to load, or threw while starting),
   the animation is set aside and the plain page in .fallback is shown instead, so nobody ever
   lands on a blank screen. */
(function () {
  var shown = false;
  function fallback() {
    if (shown || window.__siteReady) return;
    shown = true;
    var b = document.body;
    b.classList.remove('is-loading');
    b.classList.add('is-broken');
    var f = document.querySelector('.fallback');
    if (f) f.hidden = false;
  }
  window.__siteFallback = fallback;
  // runtime errors while starting, and scripts that fail to load (resource errors only reach a capturing listener)
  window.addEventListener('error', function (e) {
    var t = e && e.target;
    if (t && t.tagName === 'SCRIPT') return fallback();
    if (e instanceof ErrorEvent) fallback();
  }, true);
  // if nothing has started after 15 seconds, stop waiting
  setTimeout(fallback, 15000);
})();
