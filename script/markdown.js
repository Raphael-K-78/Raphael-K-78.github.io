import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';

export function convertMarkdown() {
    // Vérifier que marked est chargé
    if (typeof marked === 'undefined') {
      setTimeout(convertMarkdown, 100);
      return;
    }

    document.querySelectorAll('md').forEach(el => {
      if (!el.hasAttribute('data-converted')) {
        try {
          el.innerHTML = marked.parse(el.textContent);
          el.style.display = 'block';
          el.setAttribute('data-converted', 'true');
        } catch(e) {
          console.error('Erreur:', e);
        }
      }
    });
  }