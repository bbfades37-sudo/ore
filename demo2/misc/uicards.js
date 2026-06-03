

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
<svg viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2">
  <rect x="3" y="3" width="18" height="6" rx="1"/>
  <rect x="3" y="15" width="18" height="6" rx="1"/>
</svg>`,
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
document.getElementById('ck_game_uicards3d_wide-slot_1').appendChild(
ck_game_uicards3d_linkedin_outreach
  );
document.getElementById('ck_game_uicards3d_wide-slot_2').appendChild(
  ck_game_uicards3d_email_marketing
);
document.getElementById('ck_game_uicards3d_wide-slot_3').appendChild(
  ck_game_uicards3d_linkedin_ads
);

document.getElementById('ck_game_uicards3d_wide-slot_4').appendChild(
  ck_game_uicards3d_seo_geo
);
document.getElementById('ck_game_uicards3d_wide-slot_5').appendChild(
  ck_game_uicards3d_growth_revops
);
document.getElementById('ck_game_uicards3d_wide-slot_6').appendChild(
  ck_game_uicards3d_cro
);
document.getElementById('ck_game_uicards3d_wide-slot_7').appendChild(
  ck_game_uicards3d_ai_automation
);

document.getElementById('ck_game_uicards3d_wide-slot_8').appendChild(
  ck_game_uicards3d_web_app_dev
);

document.getElementById('ck_game_uicards3d_wide-slot_9').appendChild(
  ck_game_uicards3d_brand_sprint
);

///////////////////////////////////////////////Services card end //////////////////////
///////////////////////////////////////////////grwoth card starts /////////////////////
/*
const ck_game_uicards3d_wide_slot_1_growthcompany_01 = ck_game_uicards3d_create({
  variant: 'mint',
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

document.getElementById('ck_game_uicards3d_wide-slot_1_growthcompany_01').appendChild(
  ck_game_uicards3d_wide_slot_1_growthcompany_01
);
*/
///////////////////////////////////////////////grwoth card endas //////////////////////
const ck_game_uicards3d_wide_slot_1_growthcompany_01 = ck_game_uicards3d_create({
  variant: 'ocean',
  shape: 'wide',

  title: 'Built For Growth',

  text: `For businesses that take growth seriously. We do not work with every business. We work with companies that understand growth is infrastructure, not campaigns. We build the systems. You scale the business.`,

  socials: [
    {
      label: 'Infrastructure',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="4" y="4" width="6" height="6" rx="1"/>
          <rect x="14" y="4" width="6" height="6" rx="1"/>
          <rect x="9" y="14" width="6" height="6" rx="1"/>
          <path d="M7 10v2h10v-2"/>
        </svg>
      `
    },
    {
      label: 'Outcomes',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="8"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
        </svg>
      `
    },
    {
      label: 'Scale',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 20h16"/>
          <path d="M7 16V10"/>
          <path d="M12 16V6"/>
          <path d="M17 16V12"/>
          <path d="M5 8l4-4 4 2 6-4"/>
        </svg>
      `
    }
  ],

  icon: `
    <svg viewBox="0 0 24 24"
         fill="none"
         stroke="black"
         stroke-width="1.8"
         stroke-linecap="round"
         stroke-linejoin="round">
      <rect x="3" y="4" width="7" height="7" rx="1.5"/>
      <rect x="14" y="4" width="7" height="7" rx="1.5"/>
      <rect x="8.5" y="14" width="7" height="7" rx="1.5"/>
      <path d="M6.5 11v2h11v-2"/>
    </svg>
  `,

  ctaLabel: 'Growth',
  category: 'Systems'
});

document.getElementById('ck_game_uicards3d_wide-slot_1_growthcompany_01').appendChild(
  ck_game_uicards3d_wide_slot_1_growthcompany_01
);
///////////////////////////////////////////////[ TARGET // SEGMENTATION ]
const ck_game_uicards3d_wide_slot_1_SEGMENTATION_01 = ck_game_uicards3d_create({
  variant: 'violet',
  shape: 'wide',

  title: 'The Founder',

  text: `Doing everything yourself and running out of runway to keep doing it. You have proven the business works. Now you need the system that takes growth off your plate.`,

  socials: [
    {
      label: 'Infrastructure',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="4" y="4" width="6" height="6" rx="1"/>
          <rect x="14" y="4" width="6" height="6" rx="1"/>
          <rect x="9" y="14" width="6" height="6" rx="1"/>
          <path d="M7 10v2h10v-2"/>
        </svg>
      `
    },
    {
      label: 'Outcomes',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="8"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
        </svg>
      `
    },
    {
      label: 'Scale',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 20h16"/>
          <path d="M7 16V10"/>
          <path d="M12 16V6"/>
          <path d="M17 16V12"/>
          <path d="M5 8l4-4 4 2 6-4"/>
        </svg>
      `
    }
  ],

  icon: `
    <svg viewBox="0 0 24 24"
         fill="none"
         stroke="black"
         stroke-width="1.8"
         stroke-linecap="round"
         stroke-linejoin="round">
      <rect x="3" y="4" width="7" height="7" rx="1.5"/>
      <rect x="14" y="4" width="7" height="7" rx="1.5"/>
      <rect x="8.5" y="14" width="7" height="7" rx="1.5"/>
      <path d="M6.5 11v2h11v-2"/>
    </svg>
  `,

  ctaLabel: 'Growth',
  category: 'Systems'
});

document.getElementById('ck_game_uicards3d_wide-slot_1_SEGMENTATION_01').appendChild(
  ck_game_uicards3d_wide_slot_1_SEGMENTATION_01
);

//
const ck_game_uicards3d_wide_slot_1_SEGMENTATION_02 = ck_game_uicards3d_create({
  variant: 'violet',
  shape: 'wide',

  title: 'The Scaling Business',

  text: `Growing fast, but the system underneath cannot keep up with the pace. Pipeline is inconsistent, forecasting is guesswork, and deal blockages remain invisible until they become problems.`,

  socials: [
    {
      label: 'Pipeline',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 12h5v-4h6v8h5"/>
          <circle cx="4" cy="12" r="1.5"/>
          <circle cx="9" cy="8" r="1.5"/>
          <circle cx="15" cy="16" r="1.5"/>
          <circle cx="20" cy="16" r="1.5"/>
        </svg>
      `
    },
    {
      label: 'Forecasting',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 18l5-5 3 3 8-8"/>
          <path d="M16 8h4v4"/>
        </svg>
      `
    },
    {
      label: 'Visibility',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      `
    }
  ],

  icon: `
  <svg viewBox="0 0 24 24"
       fill="none"
       stroke="black"
       stroke-width="1.8"
       stroke-linecap="round"
       stroke-linejoin="round">

    <!-- Central operating system -->
    <rect x="9" y="9" width="6" height="6" rx="1.5"/>

    <!-- Connected growth nodes -->
    <circle cx="12" cy="4.5" r="2"/>
    <circle cx="19.5" cy="12" r="2"/>
    <circle cx="12" cy="19.5" r="2"/>
    <circle cx="4.5" cy="12" r="2"/>

    <!-- Connections -->
    <path d="M12 6.5v2.5"/>
    <path d="M17.5 12H15"/>
    <path d="M12 17.5V15"/>
    <path d="M9 12H6.5"/>

  </svg>
`
  ,

  ctaLabel: 'Scale',
  category: 'Revenue Operations'
});

document.getElementById('ck_game_uicards3d_wide-slot_1_SEGMENTATION_02').appendChild(
  ck_game_uicards3d_wide_slot_1_SEGMENTATION_02
);
//
const ck_game_uicards3d_wide_slot_1_SEGMENTATION_03 = ck_game_uicards3d_create({
  variant: 'violet',
  shape: 'wide',

  title: 'The Marketing Leader',

  text: `You have a team, tech stack, and campaigns generating leads—but conversions remain unpredictable. You need visibility into where prospects stall and a system that turns demand into revenue.`,

  socials: [
    {
      label: 'Lead Generation',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="8" r="3"/>
          <path d="M5 20c1.5-3 4-5 7-5s5.5 2 7 5"/>
        </svg>
      `
    },
    {
      label: 'Conversion',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 12h10"/>
          <path d="M10 6l6 6-6 6"/>
        </svg>
      `
    },
    {
      label: 'Optimization',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="8"/>
          <circle cx="12" cy="12" r="3"/>
          <circle cx="12" cy="12" r="1" fill="currentColor"/>
        </svg>
      `
    }
  ],

  icon: `
    <svg viewBox="0 0 24 24"
         fill="none"
         stroke="black"
         stroke-width="1.8"
         stroke-linecap="round"
         stroke-linejoin="round">

      <!-- Funnel -->
      <path d="M4 6h16"/>
      <path d="M7 10h10"/>
      <path d="M10 14h4"/>
      <path d="M12 14v6"/>

      <!-- Conversion point -->
      <circle cx="12" cy="21" r="1.5"/>

    </svg>
  `,

  ctaLabel: 'Optimize',
  category: 'Marketing Operations'
});

document.getElementById('ck_game_uicards3d_wide-slot_1_SEGMENTATION_03').appendChild(
  ck_game_uicards3d_wide_slot_1_SEGMENTATION_03
);
//////////////////////////////////////////


//////////////////////////////////////////
//////////////////////////////////////////
///////////////////////////////////////////////[ wednotworkwith]
//ck_game_uicards3d_wide-slot_1_wedonotworkwith_01// EXCL_01

const ck_game_uicards3d_wide_slot_1_wedonotworkwith_01 = ck_game_uicards3d_create({
  variant: 'violet',
  shape: 'wide',

  title: 'One-Off Campaign Seekers',

  text: `Businesses looking for a one-off campaign with no interest in building a sustainable system. They want short-term activity rather than a repeatable process that consistently generates and converts demand.`,

  socials: [
    {
      label: 'Short-Term Focus',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 3v6"/>
          <path d="M12 15v6"/>
          <path d="M5 12h14"/>
        </svg>
      `
    },
    {
      label: 'Campaign Only',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="4" y="5" width="16" height="14" rx="2"/>
          <path d="M8 9h8"/>
          <path d="M8 13h5"/>
        </svg>
      `
    },
    {
      label: 'No System Building',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="8"/>
          <path d="M8 8l8 8"/>
        </svg>
      `
    }
  ],

  icon: `
    <svg viewBox="0 0 24 24"
         fill="none"
         stroke="black"
         stroke-width="1.8"
         stroke-linecap="round"
         stroke-linejoin="round">

      <path d="M4 6h16"/>
      <path d="M7 10h10"/>
      <path d="M10 14h4"/>
      <path d="M12 14v6"/>
      <circle cx="12" cy="21" r="1.5"/>
      <path d="M6 4l12 12"/>

    </svg>
  `,

  ctaLabel: 'Not a Fit',
  category: 'We Do Not Work With'
});

document.getElementById('ck_game_uicards3d_wide-slot_1_wedonotworkwith_01').appendChild(
  ck_game_uicards3d_wide_slot_1_wedonotworkwith_01
);
//
// EXCL_02

const ck_game_uicards3d_wide_slot_1_wedonotworkwith_02 = ck_game_uicards3d_create({
  variant: 'violet',
  shape: 'wide',

  title: 'Vanity Metric Chasers',

  text: `Founders who want likes, impressions, clicks, and traffic reported as success instead of measuring what matters most: qualified pipeline, closed deals, and actual revenue growth.`,

  socials: [
    {
      label: 'Impressions',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      `
    },
    {
      label: 'Likes & Clicks',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M7 11v9"/>
          <path d="M11 20h6a2 2 0 0 0 2-2l1-5a2 2 0 0 0-2-2h-5l1-5-4 1-3 5v8z"/>
        </svg>
      `
    },
    {
      label: 'Revenue Ignored',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="8"/>
          <path d="M8 8l8 8"/>
          <path d="M16 8l-8 8"/>
        </svg>
      `
    }
  ],

  icon: `
    <svg viewBox="0 0 24 24"
         fill="none"
         stroke="black"
         stroke-width="1.8"
         stroke-linecap="round"
         stroke-linejoin="round">

      <!-- Analytics chart -->
      <path d="M5 19V9"/>
      <path d="M10 19V5"/>
      <path d="M15 19V11"/>
      <path d="M20 19V7"/>

      <!-- Strike-through showing misleading success -->
      <path d="M4 4l16 16"/>

    </svg>
  `,

  ctaLabel: 'Revenue First',
  category: 'We Do Not Work With'
});

document.getElementById('ck_game_uicards3d_wide-slot_1_wedonotworkwith_02').appendChild(
  ck_game_uicards3d_wide_slot_1_wedonotworkwith_02
);
//
// EXCL_03

const ck_game_uicards3d_wide_slot_1_wedonotworkwith_03 = ck_game_uicards3d_create({
  variant: 'violet',
  shape: 'wide',

  title: 'Hands-Off Growth Expectations',

  text: `Businesses not willing to participate and be involved in the process of mapping growth loops. Sustainable growth requires collaboration, shared insights, and active engagement from both sides.`,

  socials: [
    {
      label: 'No Collaboration',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M8 12h8"/>
          <path d="M6 8l-2 2 2 2"/>
          <path d="M18 16l2-2-2-2"/>
        </svg>
      `
    },
    {
      label: 'Avoids Process',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="8"/>
          <path d="M8 8l8 8"/>
        </svg>
      `
    },
    {
      label: 'Growth Loops',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M7 7h6v4"/>
          <path d="M17 17h-6v-4"/>
          <path d="M13 7l4 4"/>
          <path d="M11 17l-4-4"/>
        </svg>
      `
    }
  ],

  icon: `
    <svg viewBox="0 0 24 24"
         fill="none"
         stroke="black"
         stroke-width="1.8"
         stroke-linecap="round"
         stroke-linejoin="round">

      <!-- Circular growth loop -->
      <path d="M8 6a7 7 0 0 1 9 2"/>
      <path d="M17 8V4"/>
      <path d="M17 4h-4"/>

      <path d="M16 18a7 7 0 0 1-9-2"/>
      <path d="M7 16v4"/>
      <path d="M7 20h4"/>

      <!-- Strike through collaboration -->
      <path d="M4 4l16 16"/>

    </svg>
  `,

  ctaLabel: 'Partnership Required',
  category: 'We Do Not Work With'
});

document.getElementById('ck_game_uicards3d_wide-slot_1_wedonotworkwith_03').appendChild(
  ck_game_uicards3d_wide_slot_1_wedonotworkwith_03
);
//
// EXCL_04

const ck_game_uicards3d_wide_slot_1_wedonotworkwith_04 = ck_game_uicards3d_create({
  variant: 'violet',
  shape: 'wide',

  title: 'Instant Results Expectations',

  text: `Anyone expecting immediate, compounding outcomes in week one without the underlying infrastructure. Sustainable growth comes from systems, data, optimization, and consistency—not overnight results.`,

  socials: [
    {
      label: 'Week One Wins',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="4" y="5" width="16" height="15" rx="2"/>
          <path d="M8 3v4"/>
          <path d="M16 3v4"/>
          <path d="M4 10h16"/>
          <text x="12" y="17" text-anchor="middle" font-size="6" fill="currentColor">1</text>
        </svg>
      `
    },
    {
      label: 'Compounding Growth',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 18l4-4 3 2 7-8"/>
          <path d="M15 8h4v4"/>
        </svg>
      `
    },
    {
      label: 'Missing Foundation',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 20h16"/>
          <path d="M8 20V12"/>
          <path d="M16 20V12"/>
          <path d="M6 12h12"/>
          <path d="M7 7l10 10"/>
        </svg>
      `
    }
  ],

  icon: `
    <svg viewBox="0 0 24 24"
         fill="none"
         stroke="black"
         stroke-width="1.8"
         stroke-linecap="round"
         stroke-linejoin="round">

      <!-- Upward growth chart -->
      <path d="M4 18l5-5 3 2 8-9"/>
      <path d="M16 6h4v4"/>

      <!-- Missing foundation -->
      <path d="M4 21h16"/>
      <path d="M8 21v-2"/>
      <path d="M16 21v-2"/>

      <!-- Unrealistic expectation strike -->
      <path d="M4 4l16 16"/>

    </svg>
  `,

  ctaLabel: 'Build First',
  category: 'We Do Not Work With'
});

document.getElementById('ck_game_uicards3d_wide-slot_1_wedonotworkwith_04').appendChild(
  ck_game_uicards3d_wide_slot_1_wedonotworkwith_04
);
/////////////////////////////////////////