// Inhalt wird im GitHub-Tab direkt ausgeführt
window.repoData = { user: '', repo: '' };

const crumbs = document.querySelectorAll('context-region-crumb');
if (crumbs.length >= 2) {
  window.repoData.user = crumbs[0].getAttribute('data-label') || '';
  window.repoData.repo = crumbs[1].getAttribute('data-label') || '';
}

console.log('Crumbs gefunden:', crumbs.length);
console.log('RepoData:', window.repoData);
