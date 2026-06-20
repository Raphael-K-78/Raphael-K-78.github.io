const COOKIE_KEY = "cookie-consent";

export function getConsent() {
  return localStorage.getItem(COOKIE_KEY);
}

function loadGA() {
  if (window.__ga_loaded) return;
  window.__ga_loaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src =
    "https://www.googletagmanager.com/gtag/js?id=G-HLW2LFRYJV";
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    dataLayer.push(arguments);
  };

  gtag("js", new Date());

  gtag("config", "G-HLW2LFRYJV", {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
}


export function setConsent(value) {
  localStorage.setItem(COOKIE_KEY, value);

  if (value === "accepted") {
    loadGA();
  }
}



export function initCookieBanner(onAccept) {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");
  const declineBtn = document.getElementById("cookie-decline");

  if (!banner || !acceptBtn || !declineBtn) return;

  const consent = getConsent();

  if (!consent) {
    banner.classList.remove("hidden");
  }

  acceptBtn.addEventListener("click", () => {
    setConsent("accepted");
    banner.classList.add("hidden");
    if (onAccept) onAccept();
  });

  declineBtn.addEventListener("click", () => {
    setConsent("declined");
    banner.classList.add("hidden");
  });
}