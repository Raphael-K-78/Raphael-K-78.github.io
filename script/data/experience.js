import { infinySlider } from "../slider.js";
import { convertMarkdown } from "../markdown.js";

fetch('data/experience.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('xp_pro');

    data.experiences.forEach(exp => {
      const competencesHTML = exp.competences.map(c => `
        <div class="logo">
          <img src="${c.src}" alt="${c.alt}" />
        </div>
      `).join('');

      // construire la carte complète
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="content">
          <a class="header" href="${exp.link}">
            <img src="${exp.img}" alt="${exp.entreprise}" />
            <h3 class="title">${exp.poste}: ${exp.entreprise}</h3>
          </a>
        </div>
        <div class="description">
          <div class="logo-slider">
            <md class="mission">${exp.mission}</md>
            <div class="competence logo-track">
              ${competencesHTML}
            </div>
          </div>
        </div>
      `;
      
      container.appendChild(card);
    });
    infinySlider();
    convertMarkdown();

  })
  .catch(err => console.error("[-] Erreur chargement expériences :", err));
