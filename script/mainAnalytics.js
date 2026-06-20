import { trackClick, trackProject, initScrollTracking } from "./analytics.js";

window.trackClick = trackClick;
window.trackProject = trackProject;

initScrollTracking();
