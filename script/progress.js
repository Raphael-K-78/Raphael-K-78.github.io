const content = document.getElementById('content');
const progressBar = document.getElementById('progress');

content.addEventListener("scroll", () => {
  const scrollTop = content.scrollTop;
  const docHeight = content.scrollHeight - content.clientHeight;

  let progress = 0;
  if (docHeight > 0) {
    progress = Math.round((scrollTop / docHeight) * 100);
  }

  progressBar.value = progress;
});
