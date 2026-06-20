function gtagEvent(eventName, params = {}) {
  if (typeof gtag !== "undefined") {
    gtag("event", eventName, params);
  }
}

export function trackClick(link) {
  gtagEvent("click", {
    link: link
  });
}

export function trackProject(projectName) {
  gtagEvent("open_project", {
    project: projectName
  });
}

let scroll25 = false;
let scroll50 = false;
let scroll90 = false;

export function initScrollTracking() {
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.body.scrollHeight - window.innerHeight;

    const scrollPercent = (scrollTop / docHeight) * 100;

    if (scrollPercent > 25 && !scroll25) {
      gtagEvent("scroll_depth", { depth: 25 });
      scroll25 = true;
    }

    if (scrollPercent > 50 && !scroll50) {
      gtagEvent("scroll_depth", { depth: 50 });
      scroll50 = true;
    }

    if (scrollPercent > 90 && !scroll90) {
      gtagEvent("scroll_depth", { depth: 90 });
      scroll90 = true;
    }
  });
}