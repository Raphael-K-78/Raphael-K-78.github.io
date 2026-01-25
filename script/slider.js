document.addEventListener("DOMContentLoaded", () => {
  const logoTrack = document.querySelector('.logo-track');
  const slider = logoTrack.parentElement;
  const logos = Array.from(document.querySelectorAll('.logo'));

  // Largeur du track (contenu réel)
  const trackWidth = logoTrack.scrollWidth;

  // Largeur du parent visible
  const parentWidth = slider.offsetWidth;

  if (trackWidth <= parentWidth) {
    logoTrack.style.animation = "none";
    return;
  }

  logos.forEach(logo => {
    const clone = logo.cloneNode(true);
    logoTrack.appendChild(clone);
  });

  logoTrack.style.width = `${trackWidth * 2}px`;
});
