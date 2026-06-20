fetch('data/content.json')
  .then((response) => response.json())
  .then((data) => {
    const subtitle = document.querySelector('.hero-subtitle');
    const description = document.querySelector('.hero-description');
    const footerTitle = document.querySelector('.footer-title');
    const footerLinks = document.querySelector('.footer-links');

    if (subtitle && data.hero?.subtitle) {
      subtitle.textContent = data.hero.subtitle;
    }

    if (description && data.hero?.description) {
      description.textContent = data.hero.description;
    }

    if (footerTitle && data.footer?.title) {
      footerTitle.textContent = data.footer.title;
    }

    if (!footerLinks || !Array.isArray(data.footer?.links)) {
      return;
    }

    footerLinks.innerHTML = '';

    data.footer.links.forEach((item) => {
      const link = document.createElement('a');
      link.className = 'button';
      link.href = item.href || '#';
      link.setAttribute('aria-label', item.label || 'Lien');
      link.onclick = () => trackClick(item.label);

      if (item.external) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }

      // const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      // svg.setAttribute('viewBox', item.viewBox || '0 0 24 24');
      // svg.setAttribute('aria-hidden', 'true');

      // const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      // path.setAttribute('d', item.path || '');
      // svg.appendChild(path);

      const img = document.createElement('img');
      img.src = item.img || '';
      img.alt = item.label || '';
      img.setAttribute('aria-hidden', 'true');


      const text = document.createElement('span');
      text.textContent = item.label || '';

      // link.appendChild(svg);
      link.appendChild(img);
      link.appendChild(text);
      footerLinks.appendChild(link);
    });
  })
  .catch((error) => {
    console.error('[-] Erreur chargement contenu hero/footer :', error);
  });
