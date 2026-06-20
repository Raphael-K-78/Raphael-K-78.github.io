import { trackClick, trackProject, initScrollTracking } from "./analytics.js";
import { initCookieBanner, getConsent } from "./cookies.js";

window.trackClick = trackClick;
window.trackProject = trackProject;

function startTracking() {
  initScrollTracking();
}

initCookieBanner(startTracking);

if (getConsent() === "accepted") {
  startTracking();
}