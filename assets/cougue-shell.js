(() => {
  const drawerOverlay = document.querySelector('[data-cougue-drawer-overlay]');
  const drawer = document.querySelector('[data-cougue-drawer]');
  const menuToggle = document.querySelector('[data-cougue-menu-toggle]');
  const drawerClose = document.querySelector('[data-cougue-drawer-close]');
  const searchPanel = document.querySelector('[data-cougue-search-panel]');
  const searchToggle = document.querySelector('[data-cougue-search-toggle]');
  let lastFocused = null;

  const openDrawer = () => {
    if (!drawerOverlay || !menuToggle) return;
    lastFocused = document.activeElement;
    drawerOverlay.classList.add('is-open');
    drawerOverlay.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('cougue-menu-open');
    window.setTimeout(() => drawerClose?.focus(), 20);
  };

  const closeDrawer = () => {
    if (!drawerOverlay || !menuToggle) return;
    drawerOverlay.classList.remove('is-open');
    drawerOverlay.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('cougue-menu-open');
    if (lastFocused instanceof HTMLElement) lastFocused.focus();
  };

  const toggleSearch = () => {
    if (!searchPanel || !searchToggle) return;
    const willOpen = !searchPanel.classList.contains('is-open');
    searchPanel.classList.toggle('is-open', willOpen);
    searchPanel.setAttribute('aria-hidden', String(!willOpen));
    searchToggle.setAttribute('aria-expanded', String(willOpen));
    if (willOpen) window.setTimeout(() => searchPanel.querySelector('input')?.focus(), 20);
  };

  menuToggle?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  drawerOverlay?.addEventListener('click', (event) => {
    if (event.target === drawerOverlay) closeDrawer();
  });
  drawer?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeDrawer));
  searchToggle?.addEventListener('click', toggleSearch);

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (drawerOverlay?.classList.contains('is-open')) closeDrawer();
    if (searchPanel?.classList.contains('is-open')) toggleSearch();
  });
})();
