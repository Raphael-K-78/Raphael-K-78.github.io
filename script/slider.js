export function infinySlider() {
  const logoTracks = document.querySelectorAll(".logo-track");
  if (!logoTracks.length) return;

  logoTracks.forEach((logoTrack) => {
    const slider = logoTrack.parentElement;
    if (!slider) return;

    const start = () => {
      const logos = Array.from(logoTrack.querySelectorAll(".logo"));
      if (!logos.length) return;

      let trackWidth = logoTrack.scrollWidth;
      const parentWidth = slider.offsetWidth;

      // clone jusqu'à dépasser le parent
      while (trackWidth <= parentWidth && logos.length) {
        logos.forEach((logo) => logoTrack.appendChild(logo.cloneNode(true)));
        trackWidth = logoTrack.scrollWidth;
      }

      // doublement pour animation fluide
      logos.forEach((logo) => logoTrack.appendChild(logo.cloneNode(true)));
      logoTrack.style.width = `${logoTrack.scrollWidth}px`;
      logoTrack.style.animation = "scroll 10s linear infinite";
    };

    const imgs = logoTrack.querySelectorAll("img");
    Promise.all(
      Array.from(imgs).map((img) =>
        img.complete ? Promise.resolve() : new Promise((r) => (img.onload = img.onerror = r))
      )
    ).then(start);
  });
}
