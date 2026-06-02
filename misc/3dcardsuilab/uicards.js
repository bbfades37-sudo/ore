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


const CK_GAME_UICARDS3D_SEND = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M22 2L11 13"/>
  <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
</svg>
`;

const CK_GAME_UICARDS3D_FLOW = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M4 6h6v4H4z"/>
  <path d="M14 14h6v4h-6z"/>
  <path d="M10 8h4v8h-4z"/>
</svg>
`;

const CK_GAME_UICARDS3D_CHAT = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
</svg>
`;

/* ========== Paid Media ========== */

const CK_GAME_UICARDS3D_USERS = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <circle cx="9" cy="7" r="4"/>
  <path d="M2 21c0-4 3-7 7-7s7 3 7 7"/>
  <path d="M16 4a4 4 0 0 1 0 8"/>
</svg>
`;

const CK_GAME_UICARDS3D_BRUSH = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M18 3l3 3-9 9-4 1 1-4z"/>
  <path d="M8 16c-2 0-4 1-4 4"/>
</svg>
`;

const CK_GAME_UICARDS3D_TARGET = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <circle cx="12" cy="12" r="8"/>
  <circle cx="12" cy="12" r="4"/>
  <circle cx="12" cy="12" r="1"/>
</svg>
`;

/* ========== SEO & GEO ========== */

const CK_GAME_UICARDS3D_SEARCH = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <circle cx="11" cy="11" r="7"/>
  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
</svg>
`;

const CK_GAME_UICARDS3D_FILE = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
  <path d="M14 2v6h6"/>
</svg>
`;

const CK_GAME_UICARDS3D_SPARK = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5z"/>
</svg>
`;

/* ========== RevOps ========== */

const CK_GAME_UICARDS3D_COMPASS = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <circle cx="12" cy="12" r="9"/>
  <polygon points="14,10 17,7 14,14 7,17 10,10"/>
</svg>
`;

const CK_GAME_UICARDS3D_DATABASE = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <ellipse cx="12" cy="5" rx="8" ry="3"/>
  <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/>
</svg>
`;

const CK_GAME_UICARDS3D_TREND = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <polyline points="3 17 9 11 13 15 21 7"/>
  <polyline points="15 7 21 7 21 13"/>
</svg>
`;

/* ========== CRO ========== */

const CK_GAME_UICARDS3D_CLIPBOARD = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <rect x="8" y="2" width="8" height="4" rx="1"/>
  <path d="M6 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1"/>
</svg>
`;

const CK_GAME_UICARDS3D_FLASK = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M10 2v6l-5 8a4 4 0 0 0 3 6h8a4 4 0 0 0 3-6l-5-8V2"/>
</svg>
`;

const CK_GAME_UICARDS3D_FUNNEL = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M3 4h18l-7 8v6l-4 2v-8z"/>
</svg>
`;

/* ========== AI Automation ========== */

const CK_GAME_UICARDS3D_BOT = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <rect x="4" y="8" width="16" height="10" rx="2"/>
  <circle cx="9" cy="13" r="1"/>
  <circle cx="15" cy="13" r="1"/>
  <path d="M12 2v4"/>
</svg>
`;

const CK_GAME_UICARDS3D_CPU = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <rect x="7" y="7" width="10" height="10"/>
  <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4"/>
</svg>
`;

/* ========== Development ========== */

const CK_GAME_UICARDS3D_LAYOUT = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <rect x="3" y="3" width="18" height="18" rx="2"/>
  <line x1="3" y1="9" x2="21" y2="9"/>
  <line x1="9" y1="9" x2="9" y2="21"/>
</svg>
`;

const CK_GAME_UICARDS3D_SERVER = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <rect x="3" y="3" width="18" height="6" rx="1"/>
  <rect x="3" y="15" width="18" height="6" rx="1"/>
</svg>
`;

const CK_GAME_UICARDS3D_CODE = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <polyline points="8 18 2 12 8 6"/>
  <polyline points="16 6 22 12 16 18"/>
</svg>
`;

/* ========== Brand ========== */

const CK_GAME_UICARDS3D_PALETTE = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M12 2a10 10 0 1 0 0 20h1a3 3 0 0 0 0-6h-1a2 2 0 0 1 0-4h4a6 6 0 0 0 0-12z"/>
</svg>
`;

const CK_GAME_UICARDS3D_MESSAGE = `
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
</svg>
`;

const ck_game_uicards3d_linkedin_outreach = ck_game_uicards3d_create({
  variant: 'prism',
  shape:   'wide',
  title:   'LinkedIn Outreach',
  text:    'Profile optimisation, content strategy, outreach sequences, and DM management that books qualified calls.',
  socials: [
  {
    label: 'Profile Optimisation',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>'
  },
  {
    label: 'Outreach Sequences',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>'
  },
  {
    label: 'Booked Calls',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72l.34 2.29a2 2 0 0 1-.57 1.73L7.09 9.91a16 16 0 0 0 7 7l2.17-1.74a2 2 0 0 1 1.73-.57l2.29.34A2 2 0 0 1 22 16.92z"/></svg>'
  }
],
  icon: '<svg viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>',
  ctaLabel: 'Pipeline Gen',
  category: 'Pipeline Gen'
});

document.getElementById('wide-slot').appendChild(
  ck_game_uicards3d_linkedin_outreach
);
const ck_game_uicards3d_email_marketing = ck_game_uicards3d_create({
  variant: 'prism',
  shape: 'wide',
  title: 'Email Marketing',
  text: 'Cold outreach, nurture sequences, and lifecycle campaigns that land in the inbox and generate replies.',
  socials: [
    { label: 'Cold Outreach', icon: CK_GAME_UICARDS3D_SEND },
    { label: 'Sequences', icon: CK_GAME_UICARDS3D_FLOW },
    { label: 'Replies', icon: CK_GAME_UICARDS3D_CHAT }
  ],
  icon: `
    <svg viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  `,
  ctaLabel: 'Pipeline Gen',
  category: 'Pipeline Gen'
});



const ck_game_uicards3d_linkedin_ads = ck_game_uicards3d_create({
  variant: 'prism',
  shape: 'wide',
  title: 'LinkedIn Ads',
  text: 'Campaign strategy, audience build, creative, and ongoing optimisation for B2B paid demand generation.',
  socials: [
    { label: 'Audience', icon: CK_GAME_UICARDS3D_USERS },
    { label: 'Creative', icon: CK_GAME_UICARDS3D_BRUSH },
    { label: 'Optimisation', icon: CK_GAME_UICARDS3D_TARGET }
  ],
  icon: `
    
<svg xmlns="http://www.w3.org/2000/svg" id="b100d072-5c26-428c-aa94-fe2a7fbab69d" data-name="Layer 1" width="75" height="66" viewBox="0 0 75 66"><path id="e8462590-5a8a-492b-9bee-67fe2f65f983" data-name="Fill-1-Copy-6" d="M53.3653,19.386c-9.8693,32.2855,6.1235,31.8329-7.1389,41.2306A29.1943,29.1943,0,0,1,5.3387,53.4179a29.7533,29.7533,0,0,1,7.1385-41.23C25.74,2.79,63.2345-12.8994,53.3653,19.386" style="fill-rule:evenodd;opacity:0.05"></path><path d="M36.3831,33.079a.97.97,0,0,0-1.0894.2261L32,36.7484l-3.2929-3.4433a.9746.9746,0,0,0-1.0894-.2261A1.0466,1.0466,0,0,0,27,34.0443v20.91A1.0224,1.0224,0,0,0,28,56h8a1.0224,1.0224,0,0,0,1-1.0454v-20.91A1.0459,1.0459,0,0,0,36.3831,33.079Zm-1.3823,20.83H29V36.5682l2.2929,2.3979a.9709.9709,0,0,0,1.415,0l2.2929-2.3979Z" style="fill-rule:evenodd"></path><path d="M45.7079,24.3128a.9566.9566,0,0,0-1.415,0l-4,4.2664A1.1022,1.1022,0,0,0,40,29.3334v25.6A1.0339,1.0339,0,0,0,41,56h8a1.0339,1.0339,0,0,0,1-1.0666v-25.6a1.099,1.099,0,0,0-.2929-.7542Zm2.2929,29.554H42V29.7752l3-3.2006,3.0008,3.2006Z" style="fill-rule:evenodd"></path><path d="M57.7079,20.3013a.9814.9814,0,0,0-1.415,0l-4,4.1182A1.0435,1.0435,0,0,0,52,25.1473V53.9706A1.0139,1.0139,0,0,0,53,55h8a1.0139,1.0139,0,0,0,1-1.0294V25.1473a1.04,1.04,0,0,0-.2929-.7278Zm2.2929,32.64H54V25.5737l3-3.0888,3.0008,3.0888Z" style="fill-rule:evenodd"></path><path d="M72.7071,16.3083A.9729.9729,0,0,0,72.0008,16H70a.9758.9758,0,0,0-.7071.3083l-4,4.21A1.08,1.08,0,0,0,65,21.2628V54.9474A1.0262,1.0262,0,0,0,66,56h8a1.0262,1.0262,0,0,0,1-1.0526v-35.79a1.0765,1.0765,0,0,0-.2929-.7442Zm.2937,37.5866H67V21.6988l3.4142-3.5937h1.1724l1.4142,1.4886Z" style="fill-rule:evenodd"></path><path d="M74,5H68a1,1,0,0,0-.7071,1.7069l2.3581,2.3579a1,1,0,0,0-.3974.2406l-8.4859,8.6538-3.3692-3.4359a1.0093,1.0093,0,0,0-1.4478,0l-7.462,7.61L45.1194,18.697a1.0091,1.0091,0,0,0-1.4478,0L32.1161,30.481l-3.3692-3.4359a1.0074,1.0074,0,0,0-1.4462,0,1.0557,1.0557,0,0,0,0,1.4757l4.0919,4.1736a1.01,1.01,0,0,0,1.4478,0L44.3951,20.91l3.37,3.4359a1.0083,1.0083,0,0,0,1.447,0l7.462-7.61,3.37,3.4358a1.01,1.01,0,0,0,1.447,0l9.2094-9.3915a1.0231,1.0231,0,0,0,.24-.4266l2.3521,2.352A1.0018,1.0018,0,0,0,74,13a1.0188,1.0188,0,0,0,.3831-.0766A1.0021,1.0021,0,0,0,75,11.9993V6A.999.999,0,0,0,74,5ZM73,9.5853,70.4141,7H73Z" style="fill-rule:evenodd"></path></svg>`,
  ctaLabel: 'Paid Media',
  category: 'Paid Media'
});

const ck_game_uicards3d_seo_geo = ck_game_uicards3d_create({
  variant: 'prism',
  shape: 'wide',
  title: 'SEO & GEO',
  text: 'Technical SEO, content strategy, and AI search optimisation for Google, ChatGPT, Perplexity, and AI Overviews.',
  socials: [
    { label: 'Technical SEO', icon: CK_GAME_UICARDS3D_SEARCH },
    { label: 'Content', icon: CK_GAME_UICARDS3D_FILE },
    { label: 'AI Search', icon: CK_GAME_UICARDS3D_SPARK }
  ],
  icon: `
    <svg viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `,
  ctaLabel: 'Organic Growth',
  category: 'Organic Growth'
});


const ck_game_uicards3d_growth_revops = ck_game_uicards3d_create({
  variant: 'prism',
  shape: 'wide',
  title: 'Growth & RevOps',
  text: 'GTM strategy, pipeline architecture, CRM setup, and the RevOps infrastructure that makes growth predictable.',
  socials: [
    { label: 'GTM Strategy', icon: CK_GAME_UICARDS3D_COMPASS },
    { label: 'CRM Setup', icon: CK_GAME_UICARDS3D_DATABASE },
    { label: 'Pipeline', icon: CK_GAME_UICARDS3D_TREND }
  ],
  icon: `
    <svg viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  `,
  ctaLabel: 'RevOps',
  category: 'RevOps'
});


const ck_game_uicards3d_cro = ck_game_uicards3d_create({
  variant: 'prism',
  shape: 'wide',
  title: 'CRO',
  text: 'Conversion audits, A/B testing, landing page optimisation, and funnel improvements that increase yield from existing traffic.',
  socials: [
    { label: 'Audits', icon: CK_GAME_UICARDS3D_CLIPBOARD },
    { label: 'A/B Tests', icon: CK_GAME_UICARDS3D_FLASK },
    { label: 'Funnels', icon: CK_GAME_UICARDS3D_FUNNEL }
  ],
  icon: `
    <svg viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2">
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
    </svg>
  `,
  ctaLabel: 'Conversion',
  category: 'Conversion'
});


const ck_game_uicards3d_ai_automation = ck_game_uicards3d_create({
  variant: 'prism',
  shape: 'wide',
  title: 'AI Automation',
  text: 'Workflow automation, AI agent build, process systemisation, and consulting for businesses implementing AI internally.',
  socials: [
    { label: 'Workflows', icon: CK_GAME_UICARDS3D_FLOW },
    { label: 'AI Agents', icon: CK_GAME_UICARDS3D_BOT },
    { label: 'Systems', icon: CK_GAME_UICARDS3D_CPU }
  ],
  icon: `
    <svg viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2">
      <path d="M12 2V10"></path>
      <path d="M18 8V14"></path>
      <path d="M6 6V16"></path>
      <rect x="2" y="16" width="20" height="4" rx="1"></rect>
    </svg>
  `,
  ctaLabel: 'Automation',
  category: 'Automation'
});

const ck_game_uicards3d_web_app_dev = ck_game_uicards3d_create({
  variant: 'prism',
  shape: 'wide',
  title: 'Web & App Dev',
  text: 'Full-stack web and application development. Landing pages, custom builds, and tools that support growth infrastructure.',
  socials: [
    { label: 'Frontend', icon: CK_GAME_UICARDS3D_LAYOUT },
    { label: 'Backend', icon: CK_GAME_UICARDS3D_SERVER },
    { label: 'Apps', icon: CK_GAME_UICARDS3D_CODE }
  ],
  icon: `
    <svg viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  `,
  ctaLabel: 'Build',
  category: 'Build'
});

const ck_game_uicards3d_brand_sprint = ck_game_uicards3d_create({
  variant: 'prism',
  shape: 'wide',
  title: 'Brand Sprint',
  text: 'Fixed-scope brand identity delivered in two weeks. Positioning, visual identity, messaging — built to last.',
  socials: [
    { label: 'Positioning', icon: CK_GAME_UICARDS3D_COMPASS },
    { label: 'Identity', icon: CK_GAME_UICARDS3D_PALETTE },
    { label: 'Messaging', icon: CK_GAME_UICARDS3D_MESSAGE }
  ],
  icon: `
    <svg viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
      <path d="M2 17l10 5 10-5"></path>
      <path d="M2 12l10 5 10-5"></path>
    </svg>
  `,
  ctaLabel: 'Brand',
  category: 'Brand'
});
document.getElementById('wide-slot').appendChild(
ck_game_uicards3d_linkedin_outreach
  );
document.getElementById('wide-slot').appendChild(
  ck_game_uicards3d_email_marketing
);
document.getElementById('wide-slot').appendChild(
  ck_game_uicards3d_linkedin_ads
);

document.getElementById('wide-slot').appendChild(
  ck_game_uicards3d_seo_geo
);
document.getElementById('wide-slot').appendChild(
  ck_game_uicards3d_growth_revops
);
document.getElementById('wide-slot').appendChild(
  ck_game_uicards3d_cro
);
document.getElementById('wide-slot').appendChild(
  ck_game_uicards3d_ai_automation
);

document.getElementById('wide-slot').appendChild(
  ck_game_uicards3d_web_app_dev
);

document.getElementById('wide-slot').appendChild(
  ck_game_uicards3d_brand_sprint
);
