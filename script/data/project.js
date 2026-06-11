import { initSlider } from "../slider2.js";
import { convertMarkdown } from "../markdown.js";

fetch('data/project.json')
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector('#projects > .horizontal');

    data.projects.forEach((project, index) => {

      const popoverId = `popover-${index}`;

      const slidesHTML = project.img_slide.map(slide => `
        <div class="slide">
          <img src="${slide.src}" alt="${slide.alt}">
        </div>
      `).join('');

      const card = document.createElement('div');
      card.className = 'project';

      card.innerHTML = `
        <img src="${project.img_src}" alt="${project.img_src_alt}">
        <h3>${project.name}</h3>
        <p>${project.description_courte}</p>

        <button popovertarget="${popoverId}" popovertargetaction="show">
          En savoir plus
        </button>

        <div id="${popoverId}" class="popover" popover>
          <button type="button"
                  class="close-btn"
                  popovertarget="${popoverId}"
                  popovertargetaction="hide">×</button>

          <h2>${project.name}</h2>
          <md>${project.description_longue}</md>

          <div class="slider" data-slider>
            <div class="slides">
              ${slidesHTML}
            </div>

            <button class="nav prev" data-prev>&lt;</button>
            <button class="nav next" data-next>&gt;</button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    initSlider();
    convertMarkdown();

    const content = document.getElementById('content');
    const horizontal = content?.querySelector('.horizontal');
  })
  .catch(err => console.error("[-] Erreur chargement projets :", err));
