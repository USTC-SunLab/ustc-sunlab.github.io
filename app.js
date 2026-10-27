(() => {
  'use strict';
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));
  const params = new URLSearchParams(location.search);
  const menu = $('.menu-toggle');
  const nav = $('#main-nav');
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      menu.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('is-open');
      menu.focus();
    }
  });

  const teamButtons = $$('[data-team-filter]');
  function filterTeam(group) {
    const valid = teamButtons.some(b => b.dataset.teamFilter === group) ? group : 'all';
    teamButtons.forEach(b => {
      const active = b.dataset.teamFilter === valid;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    $$('[data-team-group]').forEach(g => { g.hidden = valid !== 'all' && g.dataset.teamGroup !== valid; });
  }
  teamButtons.forEach(b => b.addEventListener('click', () => filterTeam(b.dataset.teamFilter)));
  if (teamButtons.length) filterTeam(params.get('group') || 'all');

  const newsButtons = $$('[data-news-filter]');
  newsButtons.forEach(b => b.addEventListener('click', () => {
    const category = b.dataset.newsFilter;
    newsButtons.forEach(other => {
      const active = b === other;
      other.classList.toggle('active', active);
      other.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    $$('[data-news-category]').forEach(row => {
      row.hidden = category !== 'all' && row.dataset.newsCategory !== category;
      if (!row.hidden) count++;
    });
    $('#news-count').textContent = `${count} ${count === 1 ? 'update' : 'updates'}`;
  }));

  const pubForm = $('#publication-search');
  if (pubForm) {
    const rows = $$('.publication-row');
    const input = $('#pub-query');
    const year = $('#pub-year');
    const perPage = 20;
    let currentPage = 1;
    let matches = rows;
    input.value = params.get('q') || '';
    if (Array.from(year.options).some(o => o.value === params.get('year'))) year.value = params.get('year');
    const text = new Map(rows.map(row => [row, $('.citation', row).textContent.toLowerCase()]));
    function showPage(scroll = false) {
      const pages = Math.max(1, Math.ceil(matches.length / perPage));
      currentPage = Math.min(currentPage, pages);
      rows.forEach(r => { r.hidden = true; });
      matches.slice((currentPage - 1) * perPage, currentPage * perPage).forEach(r => { r.hidden = false; });
      $('#pub-empty').hidden = matches.length !== 0;
      $('#pub-pagination').hidden = matches.length <= perPage;
      $('#pub-prev').disabled = currentPage === 1;
      $('#pub-next').disabled = currentPage >= pages;
      $('#pub-page').textContent = `Page ${currentPage} of ${pages}`;
      const start = matches.length ? (currentPage - 1) * perPage + 1 : 0;
      const end = Math.min(currentPage * perPage, matches.length);
      $('#pub-count').textContent = matches.length ? `Showing ${start}–${end} of ${matches.length} records` : '0 records';
      if (scroll) {
        input.focus({ preventScroll: true });
        pubForm.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
    }
    function filter() {
      const query = input.value.trim().toLowerCase();
      const exactRecord = /^\d{1,3}$/.test(query);
      const words = query.split(/\s+/).filter(Boolean);
      matches = rows.filter(row => (year.value === 'all' || row.dataset.pubYear === year.value) &&
        (exactRecord ? Number(row.dataset.pubNumber) === Number(query) : words.every(word => text.get(row).includes(word))));
      currentPage = 1;
      showPage();
    }
    input.addEventListener('input', filter);
    year.addEventListener('change', filter);
    pubForm.addEventListener('submit', e => { e.preventDefault(); filter(); });
    pubForm.addEventListener('reset', () => { input.value = ''; year.value = 'all'; filter(); });
    $('#pub-prev').addEventListener('click', () => { currentPage--; showPage(true); });
    $('#pub-next').addEventListener('click', () => { currentPage++; showPage(true); });
    filter();
  }

  const dialog = $('#search-dialog');
  const trigger = $('.search-button');
  const siteInput = $('#site-search');
  const resultBox = $('#search-results');
  const status = $('#search-status');
  trigger?.addEventListener('click', () => { dialog.showModal(); siteInput.focus(); });
  $('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', e => { if (e.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) dialog.close();
  }});
  dialog?.addEventListener('close', () => trigger.focus());
  siteInput?.addEventListener('input', () => {
    const query = siteInput.value.trim().toLowerCase();
    resultBox.replaceChildren();
    if (!query) { status.textContent = 'Start typing to explore the laboratory.'; return; }
    const terms = query.split(/\s+/);
    const matches = (window.LAB_SEARCH || []).filter(item => terms.every(term => `${item.title} ${item.description} ${item.kind}`.toLowerCase().includes(term)));
    status.textContent = matches.length ? `${matches.length} ${matches.length === 1 ? 'result' : 'results'}${matches.length > 30 ? ' · Showing the first 30. Refine your search for more specific results.' : ''}` : 'No results found. Try a name, research topic or publication keyword.';
    matches.slice(0, 30).forEach(item => {
      const a = document.createElement('a'); a.className = 'search-result'; a.href = item.url;
      if (/^https?:\/\//.test(item.url)) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      const kind = document.createElement('span'); kind.textContent = item.kind;
      const title = document.createElement('strong'); title.textContent = item.title;
      const desc = document.createElement('small'); desc.textContent = item.description;
      a.append(kind, title, desc); resultBox.append(a);
    });
  });
})();
