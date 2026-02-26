function checkHorizontal() {
  var content = document.getElementById('content');
  var horizontal = content.querySelector('.horizontal');

  // Hauteur visible de #content
  const contentHeight = content.clientHeight;

  // Position relative à #content
  const scrollTop = content.scrollTop;
  const horizontalTop = horizontal.offsetTop;
  const horizontalBottom = horizontalTop + horizontal.offsetHeight;

  // Vérifie si .horizontal est entièrement visible dans #content
  if (horizontalTop >= scrollTop && horizontalBottom <= scrollTop + contentHeight) {
    console.log("test"); // déclenché quand 100% visible
  }
}

// Écoute le scroll **dans #content*
var content = document.getElementById('content');
var horizontal = content.querySelector('.horizontal');
content.addEventListener('scroll', checkHorizontal);
window.addEventListener('resize', checkHorizontal);

console.log("test2");
