import { initSlider } from "../slider2.js";
import { convertMarkdown } from "../markdown.js";

fetch('data/project.json')
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector('#projects');

    data.projects.forEach((project, index) => {

      const popoverId = `popover-${index}`;

      const slidesHTML = project.img_slide.map(slide => `
        <div class="slide">
          <img src="${slide.src}" alt="${slide.alt}">
        </div>
      `).join('');

      const linksHTML = project.links.map(link => {

        const target = link.external ? '_blank' : '';
        const rel = link.external ? 'noopener noreferrer' : '';

        return `
          <a class="button"
            href="${link.href}"
            target="${target}"
            rel="${rel}">
            <img src="${link.img}" alt="" aria-hidden="true">
            ${link.label}
          </a>
        `;
      }).join('');
      const card = document.createElement('div');
      card.className = 'project';

      card.innerHTML = `
        <div class="project-img-block">
          <img src="${project.img_src}" alt="${project.img_src_alt}">
        </div>
        <div class="project-body">
          <span class="project-num">${String(index + 1).padStart(2, '0')}</span>
          <h3>${project.name}</h3>
          <p>${project.description_courte}</p>
          <div class="project-footer">
            <div class="project-links">
              ${linksHTML}
            </div>
            <button class="project-arrow" onClick="trackProject('${project.name}')" popovertarget="${popoverId}" popovertargetaction="show" aria-label="Voir le projet ${project.name}">➔</button>
          </div>
        </div>

        <div id="${popoverId}" class="popover" popover>
          <button type="button"
                  class="close-btn"
                  popovertarget="${popoverId}"
                  popovertargetaction="hide">×</button>
          <div class="popover-content">
            <h2>${project.name}</h2>
            <div class="slider" data-slider>
              <div class="slides">
                ${slidesHTML}
              </div>
              <button class="nav prev" data-prev>&lt;</button>
              <button class="nav next" data-next>&gt;</button>
            </div>
            <md>${project.description_longue}</md>
            <div class="project-links">
              ${linksHTML}
            </div>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    initSlider();
    convertMarkdown();
  })
  .catch(err => console.error("[-] Erreur chargement projets :", err));