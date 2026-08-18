const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const mapDialog = document.querySelector('#map-dialog');
const dialogImage = mapDialog?.querySelector('.dialog-image-wrap img');
const dialogCaption = mapDialog?.querySelector('#map-dialog-caption');
const dialogClose = mapDialog?.querySelector('.dialog-close');

document.querySelectorAll('.map-zoom').forEach((button) => {
  button.addEventListener('click', () => {
    if (!mapDialog || !dialogImage || !dialogCaption) return;

    const previewImage = button.querySelector('img');
    dialogImage.src = button.dataset.full || previewImage?.src || '';
    dialogImage.alt = previewImage?.alt || '';
    dialogCaption.textContent = button.dataset.caption || previewImage?.alt || '';
    mapDialog.showModal();
    document.body.classList.add('dialog-open');
  });
});

const closeMapDialog = () => {
  if (!mapDialog?.open) return;
  mapDialog.close();
  document.body.classList.remove('dialog-open');
};

dialogClose?.addEventListener('click', closeMapDialog);
mapDialog?.addEventListener('click', (event) => {
  if (event.target === mapDialog) closeMapDialog();
});
mapDialog?.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  if (dialogImage) dialogImage.src = '';
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}
