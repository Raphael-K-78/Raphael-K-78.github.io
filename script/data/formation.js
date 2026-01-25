fetch('data/formation.json')
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById('timeline');

    data.formations.forEach(item => {
      const li = document.createElement('li');

      li.innerHTML = `
        <div class="content">
          <h3>${item.formation}</h3>
          <p>${item.description}</p>
        </div>
        <div class="time">
          <h4>${item.date}</h4>
          <small>${item.mention}</small>
        </div>
      `;

      list.appendChild(li);
    });
  })
  .catch(error => {
    console.error('[+] Erreur chargement formations :', error);
  });
