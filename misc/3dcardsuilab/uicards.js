
/* ========== ck_game_uicards3d JS ========== */
(function (global) {
  'use strict';

  const CK_GAME_UICARDS3D_VARIANTS = ['mint','violet','solar','ocean','prism','void'];
  const CK_GAME_UICARDS3D_SHAPES   = ['default','cut','wide'];

  const CK_GAME_UICARDS3D_DEFAULT_ICON =
    '<svg viewBox="0 0 24 24" aria-hidden="true">' +
    '<path fill="#fff" d="M12 2l2.39 6.96H22l-6 4.36L18.18 22 12 17.77 5.82 22 8 13.32 2 8.96h7.61z"/>' +
    '</svg>';

  const CK_GAME_UICARDS3D_CHEVRON =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">' +
    '<path d="m6 9 6 6 6-6"/></svg>';

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function ck_game_uicards3d_create(opts) {
    opts = opts || {};
    const variant  = CK_GAME_UICARDS3D_VARIANTS.includes(opts.variant) ? opts.variant : 'mint';
    const shape    = CK_GAME_UICARDS3D_SHAPES.includes(opts.shape)     ? opts.shape   : 'default';
    const title    = opts.title    || '';
    const text     = opts.text     || '';
    const icon     = opts.icon     || CK_GAME_UICARDS3D_DEFAULT_ICON;
    const socials  = Array.isArray(opts.socials) ? opts.socials : [];
    const ctaLabel = opts.ctaLabel || 'Open';
    const onCta    = typeof opts.onCta === 'function' ? opts.onCta : null;

    const parent = el('div',
      'ck_game_uicards3d_parent ck_game_uicards3d_parent--' + variant +
      (shape !== 'default' ? ' ck_game_uicards3d_parent--' + shape : '')
    );

    const card = el('div', 'ck_game_uicards3d_card');
    parent.appendChild(card);

    // logo orbit
    const logo = el('div', 'ck_game_uicards3d_logo');
    logo.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 4; i++) logo.appendChild(el('span', 'ck_game_uicards3d_circle'));
    logo.appendChild(el('span', 'ck_game_uicards3d_circle', icon));
    card.appendChild(logo);

    // glass
    card.appendChild(el('div', 'ck_game_uicards3d_glass'));

    // content
    const content = el('div', 'ck_game_uicards3d_content');
    const tEl = el('span', 'ck_game_uicards3d_title');
    tEl.textContent = title;
    const txt = el('span', 'ck_game_uicards3d_text');
    txt.textContent = text;
    content.appendChild(tEl);
    content.appendChild(txt);
    card.appendChild(content);

    // bottom
    const bottom = el('div', 'ck_game_uicards3d_bottom');
    const socialRow = el('div', 'ck_game_uicards3d_social');
    socials.forEach(function (s) {
      const btn = el('button', 'ck_game_uicards3d_social_btn', s.icon || '');
      btn.type = 'button';
      btn.setAttribute('aria-label', s.label || 'action');
      if (typeof s.onClick === 'function') btn.addEventListener('click', s.onClick);
      socialRow.appendChild(btn);
    });
    bottom.appendChild(socialRow);

    const more = el('div', 'ck_game_uicards3d_more');
    const moreBtn = el('button', 'ck_game_uicards3d_more_btn');
    moreBtn.type = 'button';
    moreBtn.textContent = ctaLabel;
    if (onCta) moreBtn.addEventListener('click', onCta);
    more.appendChild(moreBtn);
    more.insertAdjacentHTML('beforeend', CK_GAME_UICARDS3D_CHEVRON);
    bottom.appendChild(more);

    card.appendChild(bottom);
    return parent;
  }

  function ck_game_uicards3d_init(root) {
    (root || document)
      .querySelectorAll('[data-ck_game_uicards3d]')
      .forEach(function (host) {
        if (host.dataset.ck_game_uicards3dReady === '1') return;
        const node = ck_game_uicards3d_create({
          variant:  host.dataset.variant,
          shape:    host.dataset.shape,
          title:    host.dataset.title,
          text:     host.dataset.text,
          ctaLabel: host.dataset.cta,
        });
        host.innerHTML = '';
        host.appendChild(node);
        host.dataset.ck_game_uicards3dReady = '1';
      });
  }

  // Expose
  global.ck_game_uicards3d_create   = ck_game_uicards3d_create;
  global.ck_game_uicards3d_init     = ck_game_uicards3d_init;
  global.CK_GAME_UICARDS3D_VARIANTS = CK_GAME_UICARDS3D_VARIANTS;
  global.CK_GAME_UICARDS3D_SHAPES   = CK_GAME_UICARDS3D_SHAPES;

  // Auto-init on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { ck_game_uicards3d_init(); });
  } else {
    ck_game_uicards3d_init();
  }
})(window);

/* ========== Demo wide card ========== */
const CK_GAME_UICARDS3D_IG = '<svg viewBox="0 0 30 30"><path d="M10 3C6.13 3 3 6.13 3 10v10c0 3.87 3.13 7 7 7h10c3.87 0 7-3.13 7-7V10c0-3.87-3.13-7-7-7H10zm12 4a1 1 0 110 2 1 1 0 010-2zM15 9a6 6 0 110 12 6 6 0 010-12zm0 2a4 4 0 100 8 4 4 0 000-8z"/></svg>';
const CK_GAME_UICARDS3D_X  = '<svg viewBox="0 0 24 24"><path d="M18.244 2H21l-6.52 7.45L22 22h-6.812l-4.79-6.26L4.8 22H2l7.02-8.02L2 2h6.94l4.33 5.78L18.244 2z"/></svg>';
const CK_GAME_UICARDS3D_DC = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/></svg>';

const wide = ck_game_uicards3d_create({
  variant: 'ocean',
  shape:   'wide',
  title:   'Cinema wide',
  text:    'Landscape canvas for metrics, trailers, or dashboard hero tiles.',
  socials: [
    { label: 'Instagram', icon: CK_GAME_UICARDS3D_IG, onClick: () => console.log('ig') },
    { label: 'X',         icon: CK_GAME_UICARDS3D_X },
    { label: 'Discord',   icon: CK_GAME_UICARDS3D_DC }
  ],
  ctaLabel: 'Open',
  onCta: () => alert('Hello from ck_game_uicards3d!')
});
document.getElementById('wide-slot').appendChild(wide);
