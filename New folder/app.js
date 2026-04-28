/* ═══════════════════════════════════════════════════════════
   ELEVO STORE — Angular-Inspired SPA
   Single-file architecture: Services → Router → Components
═══════════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────
   DATA STORE
───────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1, name: 'ProSound ANC Headphones', category: 'Audio',
    price: 249.99, originalPrice: 329.99, rating: 4.8, reviews: 1284,
    badge: 'sale', inStock: true, featured: true,
    colors: ['#1e293b', '#3b82f6', '#f59e0b'],
    description: 'Studio-quality sound with industry-leading active noise cancellation. Up to 30 hours of playback, foldable design, and premium comfort ear cushions.',
    features: ['30-hour battery life', 'ANC + Transparency mode', 'Multipoint Bluetooth 5.3', 'USB-C fast charging', 'Voice assistant ready'],
    tags: ['wireless', 'headphones', 'noise-cancelling'],
    svgColor: '#3b82f6', svgIcon: 'headphones'
  },
  {
    id: 2, name: 'UltraView 4K Webcam', category: 'Electronics',
    price: 149.99, originalPrice: null, rating: 4.6, reviews: 872,
    badge: 'new', inStock: true, featured: true,
    colors: ['#1e293b', '#64748b'],
    description: 'Crystal-clear 4K video at 60fps with built-in AI auto-framing and background blur. Perfect for remote work and content creation.',
    features: ['4K 60fps video', 'AI auto-framing', 'Dual noise-reducing mics', 'Privacy shutter', 'Plug-and-play USB-C'],
    tags: ['webcam', 'streaming', '4K'],
    svgColor: '#10b981', svgIcon: 'camera'
  },
  {
    id: 3, name: 'SwiftCharge 65W Hub', category: 'Accessories',
    price: 79.99, originalPrice: 99.99, rating: 4.7, reviews: 2103,
    badge: 'hot', inStock: true, featured: true,
    colors: ['#1e293b', '#f1f5f9'],
    description: 'Power up to 4 devices simultaneously with GaN technology. Compact design, universal compatibility, and intelligent power distribution.',
    features: ['65W total output', 'GaN III technology', '4 ports (2× USB-C, 2× USB-A)', 'Smart power distribution', 'Travel-size'],
    tags: ['charger', 'hub', 'USB-C'],
    svgColor: '#f59e0b', svgIcon: 'zap'
  },
  {
    id: 4, name: 'FitPro X3 Smart Watch', category: 'Wearables',
    price: 319.99, originalPrice: 399.99, rating: 4.9, reviews: 3567,
    badge: 'sale', inStock: true, featured: true,
    colors: ['#1e293b', '#e2e8f0', '#ef4444'],
    description: 'Advanced health monitoring with ECG, SpO2, and sleep tracking. A stunning Always-On AMOLED display in a premium titanium case.',
    features: ['Always-On AMOLED', 'ECG + SpO2', 'GPS tracking', '5 ATM water resistant', '7-day battery'],
    tags: ['smartwatch', 'fitness', 'health'],
    svgColor: '#ef4444', svgIcon: 'watch'
  },
  {
    id: 5, name: 'AirGlide True Wireless Earbuds', category: 'Audio',
    price: 189.99, originalPrice: null, rating: 4.5, reviews: 945,
    badge: 'new', inStock: true, featured: false,
    colors: ['#1e293b', '#f1f5f9', '#3b82f6'],
    description: 'Featherlight earbuds with dynamic drivers, 6-mic call clarity, and a compact charging case delivering 32 hours total battery.',
    features: ['32h total battery', '6-mic array', 'IPX5 sweat resistant', 'Wireless charging case', 'Instant pairing'],
    tags: ['earbuds', 'wireless', 'audio'],
    svgColor: '#8b5cf6', svgIcon: 'earbuds'
  },
  {
    id: 6, name: 'SlimDesk Laptop Stand', category: 'Accessories',
    price: 59.99, originalPrice: 79.99, rating: 4.4, reviews: 631,
    badge: null, inStock: true, featured: false,
    colors: ['#64748b', '#1e293b'],
    description: 'Ergonomic aluminum stand with 6 height adjustments. Promotes better posture and improves airflow for any laptop up to 17".',
    features: ['6 height levels', 'Anodized aluminum', 'Foldable & portable', 'Non-slip pads', 'Universal fit'],
    tags: ['stand', 'ergonomic', 'desk'],
    svgColor: '#64748b', svgIcon: 'stand'
  },
  {
    id: 7, name: 'MechType Pro Keyboard', category: 'Electronics',
    price: 139.99, originalPrice: null, rating: 4.7, reviews: 1482,
    badge: null, inStock: true, featured: false,
    colors: ['#1e293b', '#f1f5f9'],
    description: 'Compact 75% mechanical keyboard with hot-swap switches, per-key RGB lighting, and a premium aluminum case with gasket mount.',
    features: ['Hot-swap PCB', 'Per-key RGB', 'Gasket mount', 'USB-C detachable cable', 'Mac & Windows'],
    tags: ['keyboard', 'mechanical', 'RGB'],
    svgColor: '#0f172a', svgIcon: 'keyboard'
  },
  {
    id: 8, name: 'NanoTrack Wireless Mouse', category: 'Electronics',
    price: 69.99, originalPrice: 89.99, rating: 4.6, reviews: 2089,
    badge: 'sale', inStock: true, featured: false,
    colors: ['#1e293b', '#94a3b8', '#3b82f6'],
    description: 'Ultra-precise 25,600 DPI sensor with tri-mode connectivity. 70-day battery life in a whisper-quiet, ergonomic shell.',
    features: ['25,600 DPI sensor', 'Tri-mode (BT/2.4G/USB)', '70-day battery', 'Silent clicks', '6 programmable buttons'],
    tags: ['mouse', 'wireless', 'ergonomic'],
    svgColor: '#475569', svgIcon: 'mouse'
  },
  {
    id: 9, name: 'PortableBeam Projector', category: 'Electronics',
    price: 429.99, originalPrice: 549.99, rating: 4.5, reviews: 388,
    badge: 'sale', inStock: false, featured: false,
    colors: ['#1e293b'],
    description: 'Full HD 1080p smart projector with 600 ANSI lumens, built-in Android TV, and a 3-hour battery. Movie night anywhere.',
    features: ['1080p Full HD', '600 ANSI lumens', 'Android TV built-in', '3h battery', 'Bluetooth speakers'],
    tags: ['projector', 'home theater', 'portable'],
    svgColor: '#1e293b', svgIcon: 'projector'
  },
  {
    id: 10, name: 'ShieldCase MagSafe', category: 'Accessories',
    price: 34.99, originalPrice: null, rating: 4.3, reviews: 4201,
    badge: null, inStock: true, featured: false,
    colors: ['#1e293b', '#3b82f6', '#ef4444', '#10b981', '#f59e0b'],
    description: 'MagSafe-compatible case with military-grade drop protection. Crystal-clear back with edge-to-edge raised bezels.',
    features: ['MIL-STD-810G drop protection', 'MagSafe compatible', 'Raised camera bezel', 'Slim 1.5mm profile', 'Wireless charging through'],
    tags: ['case', 'magsafe', 'protection'],
    svgColor: '#3b82f6', svgIcon: 'phone'
  },
  {
    id: 11, name: 'DeskLight Pro LED', category: 'Accessories',
    price: 89.99, originalPrice: 119.99, rating: 4.8, reviews: 763,
    badge: 'sale', inStock: true, featured: false,
    colors: ['#1e293b', '#f1f5f9'],
    description: 'Eye-care LED desk lamp with 5 color temperatures, 10 brightness levels, wireless charging base, and USB-A port.',
    features: ['Eye-care flicker-free', '5 color temps', 'Wireless charging base', 'Touch controls', 'USB-A pass-through'],
    tags: ['lamp', 'LED', 'desk'],
    svgColor: '#f59e0b', svgIcon: 'lamp'
  },
  {
    id: 12, name: 'ClearView Monitor 27"', category: 'Electronics',
    price: 549.99, originalPrice: 699.99, rating: 4.9, reviews: 1127,
    badge: 'sale', inStock: true, featured: false,
    colors: ['#1e293b'],
    description: '27" QHD IPS display with 165Hz refresh rate, 1ms response time, and full sRGB coverage. The ultimate productivity and gaming monitor.',
    features: ['2560×1440 QHD', '165Hz / 1ms', '99% sRGB', 'DisplayHDR 400', 'USB-C 65W PD'],
    tags: ['monitor', 'QHD', 'gaming'],
    svgColor: '#334155', svgIcon: 'monitor'
  }
];

const CATEGORIES = [
  { name: 'All', icon: '🛒', count: PRODUCTS.length },
  { name: 'Electronics', icon: '💻', count: PRODUCTS.filter(p => p.category === 'Electronics').length },
  { name: 'Audio', icon: '🎧', count: PRODUCTS.filter(p => p.category === 'Audio').length },
  { name: 'Wearables', icon: '⌚', count: PRODUCTS.filter(p => p.category === 'Wearables').length },
  { name: 'Accessories', icon: '🔌', count: PRODUCTS.filter(p => p.category === 'Accessories').length }
];

const ORDERS = [
  { id: '#ORD-8821', customer: 'Alex Johnson', date: '2026-04-04', total: '$419.98', status: 'delivered', items: 2 },
  { id: '#ORD-8820', customer: 'Maria Garcia', date: '2026-04-04', total: '$149.99', status: 'shipped', items: 1 },
  { id: '#ORD-8819', customer: 'James Wilson', date: '2026-04-03', total: '$729.97', status: 'processing', items: 3 },
  { id: '#ORD-8818', customer: 'Sarah Chen', date: '2026-04-03', total: '$34.99', status: 'pending', items: 1 },
  { id: '#ORD-8817', customer: 'Mike Thompson', date: '2026-04-02', total: '$979.97', status: 'delivered', items: 4 },
  { id: '#ORD-8816', customer: 'Emma Davis', date: '2026-04-02', total: '$189.99', status: 'cancelled', items: 1 },
];

const CUSTOMERS = [
  { id: 'C001', name: 'Alex Johnson', email: 'alex@example.com', orders: 8, spent: '$1,842', status: 'active', joined: '2024-01' },
  { id: 'C002', name: 'Maria Garcia', email: 'maria@example.com', orders: 3, spent: '$449.97', status: 'active', joined: '2025-03' },
  { id: 'C003', name: 'James Wilson', email: 'james@example.com', orders: 15, spent: '$3,219', status: 'active', joined: '2023-08' },
  { id: 'C004', name: 'Sarah Chen', email: 'sarah@example.com', orders: 1, spent: '$34.99', status: 'pending', joined: '2026-04' },
  { id: 'C005', name: 'Mike Thompson', email: 'mike@example.com', orders: 22, spent: '$6,104', status: 'active', joined: '2022-11' },
  { id: 'C006', name: 'Emma Davis', email: 'emma@example.com', orders: 5, spent: '$983', status: 'inactive', joined: '2024-06' },
];

/* ─────────────────────────────────────────────
   SVG PRODUCT ILLUSTRATION GENERATOR
───────────────────────────────────────────── */
function getProductSVG(product, size = 200) {
  const c = product.svgColor;
  const icons = {
    headphones: `<circle cx="100" cy="90" r="45" fill="none" stroke="${c}" stroke-width="12"/>
      <path d="M55 90 Q55 145 75 145 L75 125 Q75 110 90 110 L90 125" fill="${c}" rx="8"/>
      <path d="M145 90 Q145 145 125 145 L125 125 Q125 110 110 110 L110 125" fill="${c}" rx="8"/>
      <rect x="75" y="108" width="15" height="38" rx="6" fill="${c}"/>
      <rect x="110" y="108" width="15" height="38" rx="6" fill="${c}"/>`,
    camera: `<rect x="45" y="65" width="110" height="80" rx="12" fill="${c}"/>
      <circle cx="100" cy="105" r="28" fill="none" stroke="white" stroke-width="6"/>
      <circle cx="100" cy="105" r="18" fill="white" opacity=".3"/>
      <rect x="75" y="52" width="30" height="16" rx="4" fill="${c}"/>
      <circle cx="130" cy="80" r="7" fill="white" opacity=".7"/>`,
    zap: `<polygon points="110,45 75,108 98,108 90,155 125,92 102,92" fill="${c}" stroke="${c}" stroke-linejoin="round"/>`,
    watch: `<rect x="70" y="55" width="60" height="90" rx="18" fill="${c}"/>
      <rect x="82" y="38" width="12" height="20" rx="4" fill="${c}" opacity=".6"/>
      <rect x="106" y="38" width="12" height="20" rx="4" fill="${c}" opacity=".6"/>
      <rect x="82" y="142" width="12" height="20" rx="4" fill="${c}" opacity=".6"/>
      <rect x="106" y="142" width="12" height="20" rx="4" fill="${c}" opacity=".6"/>
      <circle cx="100" cy="100" r="24" fill="white" opacity=".15"/>
      <line x1="100" y1="82" x2="100" y2="100" stroke="white" stroke-width="3" stroke-linecap="round"/>
      <line x1="100" y1="100" x2="112" y2="108" stroke="white" stroke-width="2" stroke-linecap="round"/>`,
    earbuds: `<ellipse cx="75" cy="100" rx="22" ry="30" fill="${c}"/>
      <ellipse cx="125" cy="100" rx="22" ry="30" fill="${c}"/>
      <circle cx="75" cy="88" r="10" fill="white" opacity=".25"/>
      <circle cx="125" cy="88" r="10" fill="white" opacity=".25"/>
      <path d="M75 130 Q100 148 125 130" fill="none" stroke="${c}" stroke-width="4" stroke-dasharray="6 4"/>`,
    stand: `<rect x="75" y="60" width="50" height="6" rx="3" fill="${c}"/>
      <line x1="100" y1="66" x2="100" y2="130" stroke="${c}" stroke-width="8" stroke-linecap="round"/>
      <ellipse cx="100" cy="140" rx="45" ry="8" fill="${c}"/>`,
    keyboard: `<rect x="35" y="75" width="130" height="70" rx="8" fill="${c}"/>
      ${Array.from({ length: 4 }, (_, r) => Array.from({ length: 8 }, (_, k) =>
      `<rect x="${44 + k * 15}" y="${85 + r * 15}" width="10" height="10" rx="2" fill="white" opacity=".25"/>`
    ).join('')).join('')}`,
    mouse: `<ellipse cx="100" cy="105" rx="35" ry="50" fill="${c}"/>
      <line x1="100" y1="56" x2="100" y2="100" stroke="white" stroke-width="3" opacity=".4"/>
      <ellipse cx="100" cy="90" rx="8" ry="12" fill="white" opacity=".35"/>`,
    projector: `<rect x="45" y="80" width="110" height="55" rx="10" fill="${c}"/>
      <circle cx="80" cy="107" r="18" fill="white" opacity=".15"/>
      <circle cx="80" cy="107" r="10" fill="white" opacity=".3"/>
      <path d="M155 90 L175 72 L175 142 L155 125" fill="${c}" opacity=".7"/>`,
    phone: `<rect x="68" y="45" width="64" height="110" rx="14" fill="${c}"/>
      <rect x="75" y="55" width="50" height="85" rx="8" fill="white" opacity=".15"/>
      <rect x="85" y="50" width="30" height="5" rx="2" fill="white" opacity=".4"/>
      <circle cx="100" cy="147" r="5" fill="white" opacity=".4"/>`,
    lamp: `<line x1="100" y1="150" x2="100" y2="95" stroke="${c}" stroke-width="6" stroke-linecap="round"/>
      <path d="M65 95 Q100 45 135 95 Z" fill="${c}"/>
      <ellipse cx="100" cy="150" rx="38" ry="7" fill="${c}" opacity=".5"/>
      <ellipse cx="100" cy="97" rx="35" ry="5" fill="white" opacity=".3"/>`,
    monitor: `<rect x="35" y="50" width="130" height="90" rx="8" fill="${c}"/>
      <rect x="43" y="58" width="114" height="72" rx="4" fill="white" opacity=".12"/>
      <rect x="85" y="140" width="30" height="16" rx="2" fill="${c}" opacity=".7"/>
      <rect x="65" y="154" width="70" height="6" rx="3" fill="${c}"/>`
  };
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="background:${c}18">
    ${icons[product.svgIcon] || `<rect x="60" y="60" width="80" height="80" rx="12" fill="${c}"/>`}
  </svg>`;
}

/* ─────────────────────────────────────────────
   CART SERVICE
───────────────────────────────────────────── */
const CartService = {
  items: JSON.parse(localStorage.getItem('elevo_cart') || '[]'),

  save() { localStorage.setItem('elevo_cart', JSON.stringify(this.items)); },

  add(productId, qty = 1, color = null) {
    const existing = this.items.find(i => i.id === productId && i.color === color);
    if (existing) {
      existing.qty = Math.min(existing.qty + qty, 10);
    } else {
      const p = PRODUCTS.find(p => p.id === productId);
      this.items.push({ id: productId, qty, color: color || p.colors[0], name: p.name, price: p.price });
    }
    this.save();
    this.updateBadge();
    Toast.show(`"${PRODUCTS.find(p => p.id === productId).name}" added to cart`, 'success');
  },

  remove(productId, color) {
    this.items = this.items.filter(i => !(i.id === productId && i.color === color));
    this.save();
    this.updateBadge();
  },

  updateQty(productId, color, qty) {
    const item = this.items.find(i => i.id === productId && i.color === color);
    if (item) { item.qty = Math.max(1, Math.min(qty, 10)); this.save(); }
  },

  get count() { return this.items.reduce((s, i) => s + i.qty, 0); },

  get subtotal() { return this.items.reduce((s, i) => s + i.price * i.qty, 0); },

  clear() { this.items = []; this.save(); this.updateBadge(); },

  updateBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    badge.textContent = this.count;
    badge.classList.remove('bump');
    void badge.offsetWidth;
    badge.classList.add('bump');
  }
};

/* ─────────────────────────────────────────────
   WISHLIST SERVICE
───────────────────────────────────────────── */
const WishlistService = {
  items: JSON.parse(localStorage.getItem('elevo_wishlist') || '[]'),
  save() { localStorage.setItem('elevo_wishlist', JSON.stringify(this.items)); },
  toggle(id) {
    if (this.has(id)) {
      this.items = this.items.filter(i => i !== id);
      Toast.show('Removed from wishlist', 'warning');
    } else {
      this.items.push(id);
      Toast.show('Added to wishlist ♡', 'success');
    }
    this.save();
  },
  has(id) { return this.items.includes(id); }
};

/* ─────────────────────────────────────────────
   AUTH SERVICE (demo)
───────────────────────────────────────────── */
const AuthService = {
  user: JSON.parse(localStorage.getItem('elevo_user') || 'null'),
  login(name, email) {
    this.user = { name, email, avatar: name[0].toUpperCase() };
    localStorage.setItem('elevo_user', JSON.stringify(this.user));
  },
  logout() {
    this.user = null;
    localStorage.removeItem('elevo_user');
  },
  get isLoggedIn() { return !!this.user; }
};

/* ─────────────────────────────────────────────
   TOAST SERVICE
───────────────────────────────────────────── */
const Toast = {
  show(msg, type = 'success', duration = 3000) {
    const icons = {
      success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
      error: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
      warning: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
      info: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
    };
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<span class="toast-icon">${icons[type] || icons.info}</span><span>${msg}</span>`;
    document.getElementById('toast-container').appendChild(el);
    setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 300); }, duration);
  }
};

/* ─────────────────────────────────────────────
   ROUTER
───────────────────────────────────────────── */
const Router = {
  current: 'home',

  routes: {
    home:      () => renderHome(),
    shop:      (cat) => renderShop(cat),
    cart:      () => renderCart(),
    checkout:  () => renderCheckout(),
    wishlist:  () => renderWishlist(),
    admin:     () => renderAdmin(),
    privacy:   () => renderPrivacy(),
    about:     () => renderAbout(),
    help:      () => renderHelp(),
    track:     () => renderTrack(),
    returns:   () => renderReturns(),
    shipping:  () => renderShipping(),
    sizeguide: () => renderSizeGuide(),
    careers:   () => renderCareers(),
    press:     () => renderPress(),
    terms:     () => renderTerms(),
    contact:   () => renderContact(),
  },

  go(name, param) {
    this.current = name;
    const root = document.getElementById('app-root');
    root.innerHTML = '';
    const view = document.createElement('div');
    view.className = 'view';
    root.appendChild(view);
    (this.routes[name] || this.routes.home)(param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.updateNav(name);
  },

  updateNav(name) {
    document.querySelectorAll('.nav-link, .nav-link-btn').forEach(l => l.classList.remove('active'));
    // Map child routes back to their parent nav item
    const parentMap = {
      shop: 'shop', cart: 'shop', checkout: 'shop', wishlist: 'shop',
      home: 'home',
      about: 'about',
      contact: 'contact',
      admin: 'admin',
      privacy: 'privacy', terms: 'privacy',
      help: 'contact', track: 'contact', returns: 'contact',
      shipping: 'contact', sizeguide: 'contact',
    };
    const target = parentMap[name] || name;
    document.querySelectorAll(`.nav-link[onclick*="${target}"], .nav-link-btn[onclick*="${target}"]`)
      .forEach(el => el.classList.add('active'));
  }
};

function navigate(page, param) {
  Router.go(page, param);
  closeAccountMenu();
}

/* ─────────────────────────────────────────────
   STAR RATING HELPER
───────────────────────────────────────────── */
function stars(rating) {
  const full = Math.floor(rating), half = rating % 1 >= 0.5;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half ? 1 : 0));
}

/* ─────────────────────────────────────────────
   PRODUCT CARD COMPONENT
───────────────────────────────────────────── */
function ProductCard(p) {
  const disc = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : null;
  const wished = WishlistService.has(p.id);
  return `
    <div class="product-card" onclick="openProductModal(${p.id})">
      <div class="product-img-wrap">
        ${getProductSVG(p)}
        <div class="product-badges">
          ${p.badge === 'sale' ? `<span class="badge badge-sale">−${disc}%</span>` : ''}
          ${p.badge === 'new' ? `<span class="badge badge-new">NEW</span>` : ''}
          ${p.badge === 'hot' ? `<span class="badge badge-hot">🔥 HOT</span>` : ''}
          ${!p.inStock ? `<span class="badge" style="background:#94a3b8;color:#fff">Out of Stock</span>` : ''}
        </div>
        <div class="card-actions" onclick="event.stopPropagation()">
          <button class="btn btn-primary btn-sm" style="flex:1" onclick="CartService.add(${p.id})" ${!p.inStock ? 'disabled' : ''}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            ${p.inStock ? 'Add to Cart' : 'Sold Out'}
          </button>
          <button class="card-wishlist-btn ${wished ? 'active' : ''}" onclick="toggleWishlistCard(this,${p.id})" title="Wishlist">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${wished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="card-category">${p.category}</div>
        <div class="card-title">${p.name}</div>
        <div class="card-rating">
          <span class="stars">${stars(p.rating)}</span>
          <span style="font-size:.82rem;font-weight:600;color:var(--gray-700)">${p.rating}</span>
          <span class="rating-count">(${p.reviews.toLocaleString()})</span>
        </div>
        <div class="card-price">
          <span class="price-current">$${p.price.toFixed(2)}</span>
          ${p.originalPrice ? `<span class="price-original">$${p.originalPrice.toFixed(2)}</span>` : ''}
          ${disc ? `<span class="price-discount">-${disc}%</span>` : ''}
        </div>
      </div>
    </div>`;
}

function toggleWishlistCard(btn, id) {
  WishlistService.toggle(id);
  const wished = WishlistService.has(id);
  btn.classList.toggle('active', wished);
  btn.querySelector('svg').setAttribute('fill', wished ? 'currentColor' : 'none');
}

/* ─────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────── */
function renderHome() {
  const root = document.querySelector('.view');
  const featured = PRODUCTS.filter(p => p.featured);
  const popular = PRODUCTS.slice(0, 8);

  root.innerHTML = `
    <!-- Announcement -->
    <div class="announcement-bar">
      🚀 Free shipping on orders over $75 &nbsp;·&nbsp; Use code <strong>ELEVO10</strong> for 10% off your first order
    </div>

    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <div>
          <div class="hero-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            Trusted by 50,000+ customers
          </div>
          <h1>Tech that <span class="highlight">elevates</span> your everyday</h1>
          <p class="hero-sub">Curated premium electronics and accessories. Hand-picked for quality, backed by our 30-day guarantee.</p>
          <div class="hero-ctas">
            <button class="btn btn-primary btn-lg" onclick="navigate('shop')">
              Shop Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button class="btn btn-secondary btn-lg" onclick="navigate('about')" style="border-color:rgba(255,255,255,.3);color:#fff">
              Our Story
            </button>
          </div>
          <div class="hero-stats">
            <div><div class="hero-stat-num">50K+</div><div class="hero-stat-label">Happy Customers</div></div>
            <div><div class="hero-stat-num">4.9★</div><div class="hero-stat-label">Avg Rating</div></div>
            <div><div class="hero-stat-num">200+</div><div class="hero-stat-label">Products</div></div>
            <div><div class="hero-stat-num">30d</div><div class="hero-stat-label">Free Returns</div></div>
          </div>
        </div>
        <div class="hero-visual">
          <svg viewBox="0 0 400 400" width="360" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="hg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#3b82f6" stop-opacity=".18"/>
                <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
              </radialGradient>
            </defs>
            <circle cx="200" cy="200" r="180" fill="url(#hg)"/>
            <!-- Monitor -->
            <rect x="100" y="120" width="200" height="140" rx="12" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.15)" stroke-width="1.5"/>
            <rect x="112" y="132" width="176" height="110" rx="6" fill="rgba(59,130,246,.15)"/>
            <rect x="168" y="260" width="64" height="20" rx="4" fill="rgba(255,255,255,.08)"/>
            <rect x="140" y="278" width="120" height="6" rx="3" fill="rgba(255,255,255,.08)"/>
            <!-- Screen content lines -->
            <rect x="125" y="148" width="100" height="8" rx="4" fill="rgba(255,255,255,.2)"/>
            <rect x="125" y="162" width="150" height="5" rx="3" fill="rgba(255,255,255,.1)"/>
            <rect x="125" y="172" width="130" height="5" rx="3" fill="rgba(255,255,255,.08)"/>
            <rect x="125" y="190" width="80" height="28" rx="6" fill="rgba(59,130,246,.6)"/>
            <!-- Phone -->
            <rect x="290" y="160" width="60" height="105" rx="12" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.15)" stroke-width="1.5"/>
            <rect x="297" y="172" width="46" height="78" rx="6" fill="rgba(59,130,246,.12)"/>
            <rect x="307" y="265" width="26" height="4" rx="2" fill="rgba(255,255,255,.15)"/>
            <!-- Earbuds floating -->
            <circle cx="68" cy="190" r="22" fill="rgba(139,92,246,.25)" stroke="rgba(139,92,246,.4)" stroke-width="1.5"/>
            <circle cx="68" cy="190" r="10" fill="rgba(139,92,246,.5)"/>
            <circle cx="110" cy="210" r="22" fill="rgba(139,92,246,.2)" stroke="rgba(139,92,246,.35)" stroke-width="1.5"/>
            <circle cx="110" cy="210" r="10" fill="rgba(139,92,246,.45)"/>
            <!-- Watch -->
            <rect x="58" y="280" width="44" height="62" rx="12" fill="rgba(239,68,68,.2)" stroke="rgba(239,68,68,.4)" stroke-width="1.5"/>
            <rect x="64" y="292" width="32" height="38" rx="5" fill="rgba(239,68,68,.15)"/>
            <line x1="80" y1="299" x2="80" y2="311" stroke="rgba(255,255,255,.6)" stroke-width="2" stroke-linecap="round"/>
            <line x1="80" y1="311" x2="88" y2="315" stroke="rgba(255,255,255,.5)" stroke-width="1.5" stroke-linecap="round"/>
            <!-- Floating dots -->
            <circle cx="320" cy="130" r="5" fill="rgba(59,130,246,.6)"/>
            <circle cx="340" cy="150" r="3" fill="rgba(245,158,11,.5)"/>
            <circle cx="60" cy="140" r="4" fill="rgba(16,185,129,.5)"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- Brands -->
    <div class="brands-strip">
      <div class="container">
        <span class="brands-label">As featured in</span>
        <div class="brand-logos">
          <span class="brand-logo-item">TechCrunch</span>
          <span class="brand-logo-item">Wired</span>
          <span class="brand-logo-item">CNET</span>
          <span class="brand-logo-item">The Verge</span>
          <span class="brand-logo-item">Engadget</span>
        </div>
      </div>
    </div>

    <!-- Categories -->
    <section class="section categories-section">
      <div class="container">
        <div class="section-header">
          <div class="section-label">Browse by type</div>
          <h2 class="section-title">Shop Categories</h2>
        </div>
        <div class="categories-grid">
          ${CATEGORIES.map(cat => `
            <div class="category-card" onclick="navigate('shop','${cat.name === 'All' ? '' : cat.name}')">
              <div class="cat-icon">${cat.icon}</div>
              <div class="cat-name">${cat.name}</div>
              <div class="cat-count">${cat.count} products</div>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="section" style="background:var(--gray-50)">
      <div class="container">
        <div class="section-header">
          <div class="section-label">Editor's pick</div>
          <h2 class="section-title">Featured Products</h2>
          <p class="section-sub">Handpicked by our experts — the best of the best right now.</p>
        </div>
        <div class="products-grid">
          ${featured.map(ProductCard).join('')}
        </div>
        <div class="text-center" style="margin-top:2.5rem">
          <button class="btn btn-secondary btn-lg" onclick="navigate('shop')">View All Products</button>
        </div>
      </div>
    </section>

    <!-- Features Strip -->
    <div class="features-strip">
      <div class="container">
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
            <div class="feature-text"><h4>Free Shipping</h4><p>On all orders over $75</p></div>
          </div>
          <div class="feature-item">
            <div class="feature-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
            <div class="feature-text"><h4>30-Day Returns</h4><p>Hassle-free return policy</p></div>
          </div>
          <div class="feature-item">
            <div class="feature-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
            <div class="feature-text"><h4>Secure Payments</h4><p>256-bit SSL encryption</p></div>
          </div>
          <div class="feature-item">
            <div class="feature-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.19h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
            <div class="feature-text"><h4>24/7 Support</h4><p>Live chat & email help</p></div>
          </div>
          <div class="feature-item">
            <div class="feature-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg></div>
            <div class="feature-text"><h4>2-Year Warranty</h4><p>On all products</p></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Popular Products -->
    <section class="section" style="background:var(--white)">
      <div class="container">
        <div class="section-header">
          <div class="section-label">Best sellers</div>
          <h2 class="section-title">Popular Right Now</h2>
        </div>
        <div class="products-grid">
          ${popular.map(ProductCard).join('')}
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section testimonials-section">
      <div class="container">
        <div class="section-header">
          <div class="section-label">Customer reviews</div>
          <h2 class="section-title">What People Say</h2>
        </div>
        <div class="testimonials-grid">
          ${[
      { text: "The ProSound headphones are absolutely incredible. The ANC is class-leading and the build quality is premium. Worth every penny.", name: "Alex J.", role: "Verified Buyer", rating: 5 },
      { text: "Shipping was fast, packaging was premium and the FitPro X3 works exactly as advertised. My sleep tracking has never been more accurate.", name: "Maria G.", role: "Verified Buyer", rating: 5 },
      { text: "I was skeptical about buying electronics online but Elevo's 30-day return policy gave me confidence. Now I'm a repeat customer!", name: "James W.", role: "Verified Buyer", rating: 5 },
      { text: "The customer support team went above and beyond to help me choose the right webcam for my setup. Great service!", name: "Sarah C.", role: "Verified Buyer", rating: 5 },
      { text: "Everything from browsing to delivery was seamless. The product quality exceeded my expectations. Will definitely shop here again.", name: "Mike T.", role: "Verified Buyer", rating: 5 },
      { text: "Ordered the SwiftCharge hub and it transformed my desk setup. One port rules them all. Sleek, powerful, highly recommended.", name: "Emma D.", role: "Verified Buyer", rating: 5 },
    ].map(t => `
            <div class="testimonial-card">
              <div class="testi-stars">${'★'.repeat(t.rating)}</div>
              <p class="testi-text">"${t.text}"</p>
              <div class="testi-author">
                <div class="testi-avatar" style="background:linear-gradient(135deg,var(--primary),#8b5cf6);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:.9rem">${t.name[0]}</div>
                <div><div class="testi-name">${t.name}</div><div class="testi-role">${t.role}</div></div>
              </div>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter-section">
      <div class="container">
        <div class="section-label" style="color:rgba(255,255,255,.6)">Stay in the loop</div>
        <h2 class="section-title">Get Exclusive Deals</h2>
        <p class="section-sub">Join 25,000+ subscribers and get early access to sales, new arrivals, and special member pricing.</p>
        <form class="newsletter-form" onsubmit="handleNewsletter(event)">
          <input type="email" placeholder="Enter your email address" required />
          <button type="submit" class="btn btn-accent">Subscribe</button>
        </form>
        <p style="font-size:.78rem;color:rgba(255,255,255,.45);margin-top:.75rem">No spam, ever. Unsubscribe anytime.</p>
      </div>
    </section>`;
}

function handleNewsletter(e) {
  e.preventDefault();
  Toast.show('You\'re subscribed! Check your inbox for a welcome gift.', 'success', 4000);
  e.target.reset();
}

/* ─────────────────────────────────────────────
   SHOP PAGE
───────────────────────────────────────────── */
let shopState = {
  category: '', priceMin: 0, priceMax: 1000,
  sortBy: 'featured', viewMode: 'grid', page: 1,
  ratingFilter: 0, inStockOnly: false, searchQuery: ''
};

function renderShop(initialCat = '') {
  if (initialCat) shopState.category = initialCat;
  const root = document.querySelector('.view');

  root.innerHTML = `
    <div class="page-banner">
      <div class="container">
        <nav class="breadcrumb">
          <a onclick="navigate('home')">Home</a>
          <span class="breadcrumb-sep">›</span>
          <span>Shop</span>
          ${shopState.category ? `<span class="breadcrumb-sep">›</span><span>${shopState.category}</span>` : ''}
        </nav>
        <h1>${shopState.category || 'All Products'}</h1>
        <p>${getFilteredProducts().length} products available</p>
      </div>
    </div>
    <div class="container">
      <div class="shop-layout">
        <!-- Sidebar Filters -->
        <aside class="filters-sidebar" id="filters-sidebar">
          <div class="filters-title">
            <span>Filters</span>
            <button onclick="clearFilters()">Clear all</button>
          </div>

          <div class="filter-group">
            <div class="filter-group-label">Category</div>
            ${CATEGORIES.map(c => `
              <label class="filter-option">
                <input type="checkbox" ${shopState.category === c.name || (c.name === 'All' && !shopState.category) ? 'checked' : ''}
                  onchange="setCategory('${c.name === 'All' ? '' : c.name}')">
                <label>${c.name}</label>
                <span class="filter-count">${c.count}</span>
              </label>`).join('')}
          </div>

          <div class="filter-group">
            <div class="filter-group-label">Price Range</div>
            <div class="price-range-inputs">
              <input type="number" id="priceMin" value="${shopState.priceMin}" min="0" max="1000" placeholder="Min"
                onchange="shopState.priceMin=+this.value;refreshShopProducts()">
              <span>—</span>
              <input type="number" id="priceMax" value="${shopState.priceMax}" min="0" max="1000" placeholder="Max"
                onchange="shopState.priceMax=+this.value;refreshShopProducts()">
            </div>
          </div>

          <div class="filter-group">
            <div class="filter-group-label">Minimum Rating</div>
            <div class="rating-filter">
              ${[4.5, 4, 3.5, 0].map(r => `
                <button class="rating-btn ${shopState.ratingFilter === r ? 'active' : ''}"
                  onclick="shopState.ratingFilter=${r};refreshShopProducts()">
                  <span style="color:var(--accent)">${r > 0 ? '★'.repeat(Math.floor(r)) : '★★★★★'}</span>
                  <span>${r > 0 ? `${r}+ stars` : 'All ratings'}</span>
                </button>`).join('')}
            </div>
          </div>

          <div class="filter-group">
            <div class="filter-group-label">Availability</div>
            <label class="filter-option">
              <input type="checkbox" ${shopState.inStockOnly ? 'checked' : ''}
                onchange="shopState.inStockOnly=this.checked;refreshShopProducts()">
              <label>In Stock Only</label>
            </label>
          </div>

          <button class="btn btn-primary btn-block btn-sm" onclick="refreshShopProducts()">Apply Filters</button>
        </aside>

        <!-- Products Main -->
        <div>
          <!-- Toolbar -->
          <div class="shop-toolbar">
            <button class="mobile-filter-btn" onclick="toggleMobileFilters()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              Filters
            </button>
            <span class="results-count" id="results-count"></span>
            <select class="sort-select" onchange="shopState.sortBy=this.value;refreshShopProducts()">
              <option value="featured" ${shopState.sortBy === 'featured' ? 'selected' : ''}>Featured</option>
              <option value="price-asc" ${shopState.sortBy === 'price-asc' ? 'selected' : ''}>Price: Low to High</option>
              <option value="price-desc" ${shopState.sortBy === 'price-desc' ? 'selected' : ''}>Price: High to Low</option>
              <option value="rating" ${shopState.sortBy === 'rating' ? 'selected' : ''}>Top Rated</option>
              <option value="newest" ${shopState.sortBy === 'newest' ? 'selected' : ''}>Newest</option>
              <option value="reviews" ${shopState.sortBy === 'reviews' ? 'selected' : ''}>Most Reviewed</option>
            </select>
            <div class="view-toggle">
              <button class="view-btn ${shopState.viewMode === 'grid' ? 'active' : ''}" onclick="setViewMode('grid')" title="Grid view">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              </button>
              <button class="view-btn ${shopState.viewMode === 'list' ? 'active' : ''}" onclick="setViewMode('list')" title="List view">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              </button>
            </div>
          </div>

          <!-- Active Filters -->
          <div class="active-filters" id="active-filters"></div>

          <!-- Products Grid -->
          <div id="shop-products"></div>

          <!-- Pagination -->
          <div id="shop-pagination"></div>
        </div>
      </div>
    </div>`;

  refreshShopProducts();
}

function getFilteredProducts() {
  let list = [...PRODUCTS];
  if (shopState.category) list = list.filter(p => p.category === shopState.category);
  if (shopState.inStockOnly) list = list.filter(p => p.inStock);
  if (shopState.ratingFilter > 0) list = list.filter(p => p.rating >= shopState.ratingFilter);
  list = list.filter(p => p.price >= shopState.priceMin && p.price <= shopState.priceMax);
  if (shopState.searchQuery) {
    const q = shopState.searchQuery.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.tags.some(t => t.includes(q)));
  }
  switch (shopState.sortBy) {
    case 'price-asc': list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'rating': list.sort((a, b) => b.rating - a.rating); break;
    case 'reviews': list.sort((a, b) => b.reviews - a.reviews); break;
    case 'newest': list.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0)); break;
    default: list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
  return list;
}

function refreshShopProducts() {
  const perPage = 8;
  const all = getFilteredProducts();
  const total = all.length;
  const pages = Math.ceil(total / perPage);
  shopState.page = Math.min(shopState.page, Math.max(1, pages));
  const slice = all.slice((shopState.page - 1) * perPage, shopState.page * perPage);

  const countEl = document.getElementById('results-count');
  if (countEl) countEl.textContent = `${total} product${total !== 1 ? 's' : ''} found`;

  const grid = document.getElementById('shop-products');
  if (!grid) return;

  if (slice.length === 0) {
    grid.innerHTML = `<div class="cart-empty"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg><h3>No products found</h3><p>Try adjusting your filters or search terms.</p><button class="btn btn-primary mt-2" onclick="clearFilters()">Clear Filters</button></div>`;
  } else {
    grid.className = shopState.viewMode === 'grid' ? 'products-grid' : 'products-list';
    grid.innerHTML = slice.map(ProductCard).join('');
  }

  // Active filters
  const af = document.getElementById('active-filters');
  if (af) {
    let tags = [];
    if (shopState.category) tags.push(`<div class="filter-tag">${shopState.category}<button onclick="shopState.category='';refreshShopProducts()">×</button></div>`);
    if (shopState.inStockOnly) tags.push(`<div class="filter-tag">In Stock<button onclick="shopState.inStockOnly=false;refreshShopProducts()">×</button></div>`);
    if (shopState.ratingFilter > 0) tags.push(`<div class="filter-tag">${shopState.ratingFilter}+ Stars<button onclick="shopState.ratingFilter=0;refreshShopProducts()">×</button></div>`);
    af.innerHTML = tags.join('');
  }

  // Pagination
  const pag = document.getElementById('shop-pagination');
  if (pag && pages > 1) {
    let html = `<div class="pagination">`;
    html += `<button class="page-btn" onclick="shopState.page--;refreshShopProducts()" ${shopState.page === 1 ? 'disabled' : ''}>‹</button>`;
    for (let i = 1; i <= pages; i++) {
      html += `<button class="page-btn ${i === shopState.page ? 'active' : ''}" onclick="shopState.page=${i};refreshShopProducts()">${i}</button>`;
    }
    html += `<button class="page-btn" onclick="shopState.page++;refreshShopProducts()" ${shopState.page === pages ? 'disabled' : ''}>›</button>`;
    html += `</div>`;
    pag.innerHTML = html;
  } else if (pag) pag.innerHTML = '';
}

function setCategory(cat) {
  shopState.category = cat;
  shopState.page = 1;
  refreshShopProducts();
  // Update checkboxes
  document.querySelectorAll('.filter-option input[type=checkbox]').forEach(cb => cb.checked = false);
}
function setViewMode(mode) {
  shopState.viewMode = mode;
  document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
  event.currentTarget.classList.add('active');
  refreshShopProducts();
}
function clearFilters() {
  shopState = { ...shopState, category: '', priceMin: 0, priceMax: 1000, ratingFilter: 0, inStockOnly: false, page: 1 };
  if (Router.current === 'shop') renderShop();
}
function toggleMobileFilters() {
  document.getElementById('filters-sidebar')?.classList.toggle('mobile-open');
}

/* ─────────────────────────────────────────────
   PRODUCT DETAIL MODAL
───────────────────────────────────────────── */
let modalQty = 1, modalColor = null, modalProductId = null;

function openProductModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  modalProductId = id;
  modalQty = 1;
  modalColor = p.colors[0];

  const disc = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : null;
  const wished = WishlistService.has(p.id);

  document.getElementById('modal-content').innerHTML = `
    <button class="close-modal-btn" onclick="closeProductModal()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>
    <div class="product-detail-inner">
      <div class="pd-gallery">
        <div class="pd-main-img" id="pd-main">${getProductSVG(p, 400)}</div>
        <div class="pd-thumbs">
          ${[0, 1, 2].map(i => `<div class="pd-thumb ${i === 0 ? 'active' : ''}" onclick="selectThumb(this)" style="background:${p.svgColor}${i === 0 ? '20' : '10'}">${getProductSVG(p)}</div>`).join('')}
        </div>
      </div>
      <div class="pd-info">
        <div class="pd-category">${p.category}</div>
        <h2 class="pd-title">${p.name}</h2>
        <div class="pd-rating">
          <span style="color:var(--accent)">${stars(p.rating)}</span>
          <strong style="font-size:.9rem">${p.rating}</strong>
          <span style="color:var(--gray-400);font-size:.85rem">(${p.reviews.toLocaleString()} reviews)</span>
          ${p.inStock ? '<span style="color:var(--success);font-size:.82rem;font-weight:600;margin-left:.5rem">● In Stock</span>' : '<span style="color:var(--error);font-size:.82rem;font-weight:600;margin-left:.5rem">● Out of Stock</span>'}
        </div>
        <div class="pd-price-wrap">
          <span class="pd-price">$${p.price.toFixed(2)}</span>
          ${p.originalPrice ? `<span class="pd-original">$${p.originalPrice.toFixed(2)}</span>` : ''}
          ${disc ? `<span class="pd-discount">Save ${disc}%</span>` : ''}
        </div>
        <p class="pd-desc">${p.description}</p>

        <div class="pd-option-label">Color</div>
        <div class="pd-colors" id="pd-colors">
          ${p.colors.map((col, i) => `
            <div class="color-swatch ${i === 0 ? 'active' : ''}"
              style="background:${col}"
              onclick="selectModalColor(this,'${col}')"
              title="${col}"></div>`).join('')}
        </div>

        <div class="pd-option-label">Quantity</div>
        <div class="pd-qty-add">
          <div class="qty-control">
            <button class="qty-btn" onclick="changeModalQty(-1)">−</button>
            <span class="qty-val" id="modal-qty">1</span>
            <button class="qty-btn" onclick="changeModalQty(1)">+</button>
          </div>
          <button class="btn btn-primary" style="flex:1" onclick="addModalToCart()" ${!p.inStock ? 'disabled' : ''}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            ${p.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <button class="card-wishlist-btn ${wished ? 'active' : ''}" id="modal-wishlist-btn" onclick="toggleModalWishlist()" title="Add to wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${wished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>

        <div class="pd-features">
          ${p.features.map(f => `
            <div class="pd-feature-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              ${f}
            </div>`).join('')}
        </div>

        <div style="display:flex;gap:.5rem;margin-top:1.25rem;padding-top:1.25rem;border-top:1px solid var(--gray-100)">
          <div style="display:flex;align-items:center;gap:.4rem;font-size:.78rem;color:var(--gray-500)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            Free delivery
          </div>
          <span style="color:var(--gray-200)">|</span>
          <div style="display:flex;align-items:center;gap:.4rem;font-size:.78rem;color:var(--gray-500)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            30-day returns
          </div>
          <span style="color:var(--gray-200)">|</span>
          <div style="display:flex;align-items:center;gap:.4rem;font-size:.78rem;color:var(--gray-500)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            2-yr warranty
          </div>
        </div>
      </div>
    </div>`;

  document.getElementById('product-modal').classList.add('open');
  lockScroll();
}

function closeProductModal(e) {
  if (e && e.target !== document.getElementById('product-modal')) return;
  document.getElementById('product-modal').classList.remove('open');
  unlockScroll();
}
function selectThumb(el) {
  document.querySelectorAll('.pd-thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}
function selectModalColor(el, color) {
  modalColor = color;
  document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
}
function changeModalQty(delta) {
  modalQty = Math.max(1, Math.min(10, modalQty + delta));
  document.getElementById('modal-qty').textContent = modalQty;
}
function addModalToCart() {
  CartService.add(modalProductId, modalQty, modalColor);
  document.getElementById('product-modal').classList.remove('open');
  unlockScroll();
}
function toggleModalWishlist() {
  WishlistService.toggle(modalProductId);
  const btn = document.getElementById('modal-wishlist-btn');
  const wished = WishlistService.has(modalProductId);
  btn.classList.toggle('active', wished);
  btn.querySelector('svg').setAttribute('fill', wished ? 'currentColor' : 'none');
}

/* ─────────────────────────────────────────────
   CART PAGE
───────────────────────────────────────────── */
function renderCart() {
  const root = document.querySelector('.view');
  const items = CartService.items;
  const subtotal = CartService.subtotal;
  const shipping = subtotal >= 75 ? 0 : 7.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  root.innerHTML = `
    <div class="page-banner">
      <div class="container">
        <nav class="breadcrumb">
          <a onclick="navigate('home')">Home</a>
          <span class="breadcrumb-sep">›</span>
          <span>Shopping Cart</span>
        </nav>
        <h1>Your Cart</h1>
        <p>${CartService.count} item${CartService.count !== 1 ? 's' : ''}</p>
      </div>
    </div>
    <div class="container cart-page">
      ${items.length === 0 ? `
        <div class="cart-empty">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything yet.</p>
          <button class="btn btn-primary mt-2" onclick="navigate('shop')">Start Shopping</button>
        </div>` : `
        <div class="cart-layout">
          <div>
            <div class="cart-table-wrap">
              <div class="cart-table-header">
                <span>Product</span><span>Price</span><span>Quantity</span><span>Total</span><span></span>
              </div>
              ${items.map(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    return `
                  <div class="cart-item" id="ci-${item.id}-${item.color}">
                    <div class="ci-product">
                      <div class="ci-img">${getProductSVG(p)}</div>
                      <div>
                        <div class="ci-name">${p.name}</div>
                        <div class="ci-variant" style="display:flex;align-items:center;gap:.4rem">
                          Color: <span style="width:14px;height:14px;border-radius:50%;background:${item.color};display:inline-block;border:1px solid rgba(0,0,0,.1)"></span>
                        </div>
                      </div>
                    </div>
                    <div class="ci-price">$${item.price.toFixed(2)}</div>
                    <div class="qty-control">
                      <button class="qty-btn" onclick="cartUpdateQty(${item.id},'${item.color}',-1)">−</button>
                      <span class="qty-val" id="qty-${item.id}">${item.qty}</span>
                      <button class="qty-btn" onclick="cartUpdateQty(${item.id},'${item.color}',1)">+</button>
                    </div>
                    <div class="ci-total">$${(item.price * item.qty).toFixed(2)}</div>
                    <button class="ci-remove" onclick="cartRemove(${item.id},'${item.color}')">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                    </button>
                  </div>`;
  }).join('')}
            </div>
            <div style="display:flex;justify-content:space-between;margin-top:1rem;flex-wrap:wrap;gap:.75rem">
              <button class="btn btn-secondary" onclick="navigate('shop')">← Continue Shopping</button>
              <button class="btn" style="color:var(--error);border:1.5px solid var(--error)" onclick="CartService.clear();renderCart()">Clear Cart</button>
            </div>
          </div>

          <!-- Summary -->
          <div class="cart-summary">
            <h3>Order Summary</h3>
            <div class="summary-line"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
            <div class="summary-line"><span>Shipping</span><span>${shipping === 0 ? '<span style="color:var(--success)">FREE</span>' : `$${shipping.toFixed(2)}`}</span></div>
            <div class="summary-line"><span>Tax (8%)</span><span>$${tax.toFixed(2)}</span></div>
            <div class="summary-line total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
            ${shipping > 0 ? `<p style="font-size:.78rem;color:var(--primary);margin-bottom:.75rem">Add $${(75 - subtotal).toFixed(2)} more for free shipping!</p>` : ''}
            <div class="coupon-form">
              <input type="text" placeholder="Coupon code" id="coupon-input" />
              <button class="btn btn-secondary btn-sm" onclick="applyCoupon()">Apply</button>
            </div>
            <button class="btn btn-primary btn-block btn-lg" onclick="navigate('checkout')">
              Proceed to Checkout
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <div style="display:flex;justify-content:center;gap:.75rem;margin-top:1rem">
              <span class="pay-badge" style="border-color:var(--gray-300);color:var(--gray-600)">Visa</span>
              <span class="pay-badge" style="border-color:var(--gray-300);color:var(--gray-600)">MC</span>
              <span class="pay-badge" style="border-color:var(--gray-300);color:var(--gray-600)">PayPal</span>
              <span class="pay-badge" style="border-color:var(--gray-300);color:var(--gray-600)">Amex</span>
            </div>
          </div>
        </div>`}
    </div>`;
}

function cartUpdateQty(id, color, delta) {
  const item = CartService.items.find(i => i.id === id && i.color === color);
  if (!item) return;
  const newQty = item.qty + delta;
  if (newQty < 1) { cartRemove(id, color); return; }
  CartService.updateQty(id, color, newQty);
  renderCart();
}
function cartRemove(id, color) {
  CartService.remove(id, color);
  Toast.show('Item removed from cart', 'warning');
  renderCart();
}
function applyCoupon() {
  const val = document.getElementById('coupon-input').value.trim().toUpperCase();
  if (val === 'ELEVO10') Toast.show('Coupon applied! 10% off your order.', 'success');
  else Toast.show('Invalid coupon code.', 'error');
}

/* ─────────────────────────────────────────────
   CHECKOUT PAGE
───────────────────────────────────────────── */
let checkoutStep = 1, paymentMethod = 'card';

function renderCheckout() {
  if (CartService.items.length === 0) { navigate('cart'); return; }
  const root = document.querySelector('.view');
  const subtotal = CartService.subtotal;
  const shipping = subtotal >= 75 ? 0 : 7.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  root.innerHTML = `
    <div class="page-banner">
      <div class="container">
        <nav class="breadcrumb">
          <a onclick="navigate('home')">Home</a><span class="breadcrumb-sep">›</span>
          <a onclick="navigate('cart')">Cart</a><span class="breadcrumb-sep">›</span>
          <span>Checkout</span>
        </nav>
        <h1>Checkout</h1>
      </div>
    </div>
    <div class="container checkout-page">
      <div class="checkout-steps">
        ${[['1', 'Shipping'], ['2', 'Payment'], ['3', 'Review']].map(([n, l]) => `
          <div class="checkout-step ${checkoutStep == n ? 'active' : checkoutStep > n ? 'done' : ''}">
            <div class="step-num">${checkoutStep > n ? '✓' : n}</div>
            <div>${l}</div>
          </div>`).join('')}
      </div>
      <div class="checkout-layout">
        <div class="checkout-form-wrap" id="checkout-form-wrap">
          ${renderCheckoutStep()}
        </div>
        <!-- Order Summary -->
        <div class="order-summary">
          <h3>Order Summary</h3>
          ${CartService.items.map(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    return `<div class="os-item">
              <div class="os-img">
                ${getProductSVG(p)}
                <span class="os-qty-badge">${item.qty}</span>
              </div>
              <div class="os-details">
                <div class="os-name">${p.name}</div>
                <div class="os-variant" style="display:flex;align-items:center;gap:.3rem;font-size:.72rem;color:var(--gray-400)">
                  <span style="width:10px;height:10px;border-radius:50%;background:${item.color};display:inline-block"></span>
                </div>
              </div>
              <div class="os-price">$${(item.price * item.qty).toFixed(2)}</div>
            </div>`;
  }).join('')}
          <div class="divider"></div>
          <div class="summary-line"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
          <div class="summary-line"><span>Shipping</span><span>${shipping === 0 ? '<span style="color:var(--success)">FREE</span>' : '$' + shipping.toFixed(2)}</span></div>
          <div class="summary-line"><span>Tax</span><span>$${tax.toFixed(2)}</span></div>
          <div class="summary-line total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
          <div style="display:flex;align-items:center;gap:.5rem;margin-top:1rem;font-size:.78rem;color:var(--gray-500)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Secure 256-bit SSL checkout
          </div>
        </div>
      </div>
    </div>`;
}

function renderCheckoutStep() {
  if (checkoutStep === 1) return `
    <div class="form-section-title">Shipping Information</div>
    <div class="form-row">
      <div class="form-group"><label>First Name *</label><input id="f-first" type="text" placeholder="John" /></div>
      <div class="form-group"><label>Last Name *</label><input id="f-last" type="text" placeholder="Doe" /></div>
    </div>
    <div class="form-group"><label>Email Address *</label><input id="f-email" type="email" placeholder="john@example.com" /></div>
    <div class="form-group"><label>Phone Number</label><input id="f-phone" type="tel" placeholder="+1 (555) 000-0000" /></div>
    <div class="form-group"><label>Address *</label><input id="f-addr" type="text" placeholder="123 Main Street" /></div>
    <div class="form-row">
      <div class="form-group"><label>City *</label><input id="f-city" type="text" placeholder="New York" /></div>
      <div class="form-group"><label>ZIP Code *</label><input id="f-zip" type="text" placeholder="10001" /></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>State *</label>
        <select id="f-state">
          <option value="">Select state</option>
          ${['Alabama', 'Alaska', 'Arizona', 'California', 'Colorado', 'Florida', 'Georgia', 'Illinois', 'New York', 'Texas', 'Washington'].map(s => `<option>${s}</option>`).join('')}
        </select>
      </div>
      <div class="form-group"><label>Country</label>
        <select id="f-country"><option>United States</option><option>Canada</option><option>United Kingdom</option></select>
      </div>
    </div>
    <div style="margin-top:.5rem">
      <label style="display:flex;align-items:center;gap:.5rem;font-size:.88rem;cursor:pointer">
        <input type="checkbox" style="accent-color:var(--primary)"> Save this address for future orders
      </label>
    </div>
    <div style="display:flex;justify-content:flex-end;margin-top:1.5rem">
      <button class="btn btn-primary" onclick="nextCheckoutStep()">Continue to Payment →</button>
    </div>`;

  if (checkoutStep === 2) return `
    <div class="form-section-title">Payment Method</div>
    <div class="payment-methods">
      ${[
      ['card', '💳', 'Credit / Debit Card', 'Visa, Mastercard, Amex'],
      ['paypal', '🅿', 'PayPal', 'Fast & secure checkout'],
      ['apple', '🍎', 'Apple Pay', 'Touch or Face ID'],
      ['crypto', '₿', 'Cryptocurrency', 'BTC, ETH, USDC'],
    ].map(([val, icon, label, sub]) => `
        <div class="payment-option ${paymentMethod === val ? 'selected' : ''}" onclick="selectPayment('${val}')">
          <input type="radio" name="payment" ${paymentMethod === val ? 'checked' : ''} onchange="selectPayment('${val}')">
          <span class="pay-icon">${icon}</span>
          <div><div class="pay-label">${label}</div><div class="pay-sub">${sub}</div></div>
        </div>`).join('')}
    </div>
    <div class="card-fields ${paymentMethod === 'card' ? 'show' : ''}">
      <div class="form-group"><label>Card Number *</label>
        <input type="text" placeholder="1234 5678 9012 3456" maxlength="19" oninput="formatCard(this)" />
      </div>
      <div class="form-row">
        <div class="form-group"><label>Expiry Date *</label><input type="text" placeholder="MM / YY" maxlength="7" /></div>
        <div class="form-group"><label>CVV *</label><input type="text" placeholder="•••" maxlength="4" /></div>
      </div>
      <div class="form-group"><label>Name on Card *</label><input type="text" placeholder="John Doe" /></div>
    </div>
    <div style="display:flex;justify-content:space-between;margin-top:1.5rem">
      <button class="btn btn-secondary" onclick="prevCheckoutStep()">← Back</button>
      <button class="btn btn-primary" onclick="nextCheckoutStep()">Review Order →</button>
    </div>`;

  if (checkoutStep === 3) {
    const subtotal = CartService.subtotal, shipping = subtotal >= 75 ? 0 : 7.99, tax = subtotal * .08, total = subtotal + shipping + tax;
    return `
    <div class="form-section-title">Review Your Order</div>
    <div style="background:var(--gray-50);border-radius:var(--radius-sm);padding:1rem;margin-bottom:1.25rem">
      <div style="font-size:.82rem;font-weight:700;color:var(--gray-500);text-transform:uppercase;letter-spacing:.06em;margin-bottom:.75rem">Shipping to</div>
      <p style="font-size:.9rem;color:var(--gray-700);line-height:1.7">John Doe · john@example.com<br>123 Main Street, New York, NY 10001</p>
    </div>
    <div style="background:var(--gray-50);border-radius:var(--radius-sm);padding:1rem;margin-bottom:1.25rem">
      <div style="font-size:.82rem;font-weight:700;color:var(--gray-500);text-transform:uppercase;letter-spacing:.06em;margin-bottom:.75rem">Payment</div>
      <p style="font-size:.9rem;color:var(--gray-700)">💳 Credit Card ending in •••• 3456</p>
    </div>
    <div style="display:flex;align-items:center;gap:.75rem;padding:1rem;background:var(--primary-light);border-radius:var(--radius-sm);margin-bottom:1.25rem">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      <span style="font-size:.85rem;color:var(--primary)">Your payment is protected by 256-bit SSL encryption</span>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;padding:1rem 0;border-top:1px solid var(--gray-100);border-bottom:1px solid var(--gray-100);margin-bottom:1.25rem">
      <span style="font-size:1rem;font-weight:700">Order Total</span>
      <span style="font-size:1.3rem;font-weight:800;color:var(--dark)">$${total.toFixed(2)}</span>
    </div>
    <label style="display:flex;align-items:flex-start;gap:.6rem;font-size:.85rem;color:var(--gray-600);margin-bottom:1.5rem;cursor:pointer">
      <input type="checkbox" id="terms-agree" style="accent-color:var(--primary);margin-top:2px">
      I agree to the <a onclick="navigate('privacy')" style="color:var(--primary);cursor:pointer">Terms of Service</a> and <a onclick="navigate('privacy')" style="color:var(--primary);cursor:pointer">Privacy Policy</a>
    </label>
    <div style="display:flex;justify-content:space-between">
      <button class="btn btn-secondary" onclick="prevCheckoutStep()">← Back</button>
      <button class="btn btn-primary btn-lg" onclick="placeOrder()">
        🔒 Place Order · $${total.toFixed(2)}
      </button>
    </div>`;
  }
}

function nextCheckoutStep() {
  if (checkoutStep < 3) { checkoutStep++; updateCheckoutSteps(); }
}
function prevCheckoutStep() {
  if (checkoutStep > 1) { checkoutStep--; updateCheckoutSteps(); }
}
function updateCheckoutSteps() {
  document.querySelectorAll('.checkout-step').forEach((el, i) => {
    el.className = `checkout-step ${checkoutStep === i + 1 ? 'active' : checkoutStep > i + 1 ? 'done' : ''}`;
    el.querySelector('.step-num').textContent = checkoutStep > i + 1 ? '✓' : String(i + 1);
  });
  const wrap = document.getElementById('checkout-form-wrap');
  if (wrap) wrap.innerHTML = renderCheckoutStep();
}
function selectPayment(method) {
  paymentMethod = method;
  document.querySelectorAll('.payment-option').forEach(el => el.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
  const cf = document.querySelector('.card-fields');
  if (cf) cf.className = `card-fields ${method === 'card' ? 'show' : ''}`;
}
function formatCard(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = val.match(/.{1,4}/g)?.join(' ') || val;
}
function placeOrder() {
  const agree = document.getElementById('terms-agree');
  if (!agree.checked) { Toast.show('Please agree to the Terms of Service.', 'error'); return; }
  const root = document.querySelector('.view');
  CartService.clear();
  document.getElementById('checkout-form-wrap').innerHTML = `
    <div class="checkout-success">
      <div class="success-icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h2 style="font-size:1.5rem;font-weight:800;margin-bottom:.75rem">Order Placed!</h2>
      <p style="color:var(--gray-600);margin-bottom:.5rem">Thank you for your purchase.</p>
      <p style="color:var(--gray-500);font-size:.9rem;margin-bottom:2rem">Order <strong>#ORD-8822</strong> confirmed. A confirmation email has been sent to <strong>john@example.com</strong>.</p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-primary" onclick="navigate('home')">Continue Shopping</button>
        <button class="btn btn-secondary" onclick="navigate('admin')">Track Order</button>
      </div>
    </div>`;
  Toast.show('Order placed successfully! 🎉', 'success', 4000);
  checkoutStep = 1;
}

/* ─────────────────────────────────────────────
   WISHLIST PAGE
───────────────────────────────────────────── */
function renderWishlist() {
  const root = document.querySelector('.view');
  const wished = PRODUCTS.filter(p => WishlistService.has(p.id));
  root.innerHTML = `
    <div class="page-banner">
      <div class="container">
        <nav class="breadcrumb"><a onclick="navigate('home')">Home</a><span class="breadcrumb-sep">›</span><span>Wishlist</span></nav>
        <h1>My Wishlist</h1>
        <p>${wished.length} saved item${wished.length !== 1 ? 's' : ''}</p>
      </div>
    </div>
    <div class="container wishlist-page">
      ${wished.length === 0 ? `
        <div class="cart-empty">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <h3>Your wishlist is empty</h3>
          <p>Save products you love to buy later.</p>
          <button class="btn btn-primary mt-2" onclick="navigate('shop')">Browse Products</button>
        </div>` : `
        <div class="products-grid">${wished.map(ProductCard).join('')}</div>`}
    </div>`;
}

/* ─────────────────────────────────────────────
   ADMIN PAGE
───────────────────────────────────────────── */
let adminTab = 'dashboard', adminProducts = [...PRODUCTS];
let editingId = null;

function renderAdmin() {
  const root = document.querySelector('.view');
  root.innerHTML = `
    <div style="background:var(--dark);padding:1.25rem 0;border-bottom:1px solid rgba(255,255,255,.08)">
      <div class="container">
        <div class="flex items-center justify-between" style="flex-wrap:wrap;gap:1rem">
          <div>
            <div style="color:#94a3b8;font-size:.78rem;font-weight:600;text-transform:uppercase;letter-spacing:.1em">Admin Panel</div>
            <div style="color:#fff;font-weight:800;font-size:1.3rem">Elevo Dashboard</div>
          </div>
          <div style="display:flex;gap:.75rem;align-items:center">
            <span style="padding:.35rem .85rem;background:rgba(16,185,129,.15);color:#34d399;border-radius:999px;font-size:.75rem;font-weight:700">● Live</span>
            <button class="btn btn-secondary btn-sm" onclick="navigate('home')" style="border-color:rgba(255,255,255,.2);color:#94a3b8">← Back to Store</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container admin-page">
      <div class="admin-tabs">
        ${[['dashboard', '📊 Dashboard'], ['products', '📦 Products'], ['orders', '🛒 Orders'], ['customers', '👥 Customers'], ['analytics', '📈 Analytics']].map(([key, label]) =>
    `<button class="admin-tab ${adminTab === key ? 'active' : ''}" onclick="switchAdminTab('${key}')">${label}</button>`
  ).join('')}
      </div>
      <div id="admin-content"></div>
    </div>`;
  renderAdminTab();
}

function switchAdminTab(tab) {
  adminTab = tab;
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  event.currentTarget.classList.add('active');
  renderAdminTab();
}

function renderAdminTab() {
  const el = document.getElementById('admin-content');
  if (!el) return;
  switch (adminTab) {
    case 'dashboard': el.innerHTML = renderDashboard(); break;
    case 'products': el.innerHTML = renderAdminProducts(); break;
    case 'orders': el.innerHTML = renderAdminOrders(); break;
    case 'customers': el.innerHTML = renderAdminCustomers(); break;
    case 'analytics': el.innerHTML = renderAnalytics(); break;
  }
}

function renderDashboard() {
  const totalRev = ORDERS.filter(o => o.status !== 'cancelled').reduce((s, o) => s + parseFloat(o.total.replace('$', '')), 0);
  return `
    <div class="stats-grid">
      ${[
      { label: 'Total Revenue', value: `$${totalRev.toLocaleString('en', { minimumFractionDigits: 2 })}`, change: '+12.5% vs last month', dir: 'up', icon: '💰', cls: 'green' },
      { label: 'Total Orders', value: '1,284', change: '+8.2% vs last month', dir: 'up', icon: '📦', cls: 'blue' },
      { label: 'Products', value: adminProducts.length, change: `${adminProducts.filter(p => p.inStock).length} in stock`, dir: 'up', icon: '🏷️', cls: 'yellow' },
      { label: 'Customers', value: '3,842', change: '+23 this week', dir: 'up', icon: '👥', cls: 'red' },
    ].map(s => `
        <div class="stat-card">
          <div class="stat-icon ${s.cls}">${s.icon}</div>
          <div>
            <div class="stat-label">${s.label}</div>
            <div class="stat-value">${s.value}</div>
            <div class="stat-change ${s.dir}">↑ ${s.change}</div>
          </div>
        </div>`).join('')}
    </div>

    <!-- Revenue Chart -->
    <div class="chart-card">
      <div class="chart-header">
        <div class="chart-title">Revenue Overview</div>
        <select class="sort-select" style="font-size:.78rem;padding:.35rem .7rem">
          <option>Last 7 days</option><option>Last 30 days</option><option>Last year</option>
        </select>
      </div>
      <div class="chart-bar-wrap">
        ${[
      ['Mon', 68, '#3b82f6'], ['Tue', 82, '#3b82f6'], ['Wed', 55, '#3b82f6'],
      ['Thu', 90, '#3b82f6'], ['Fri', 95, '#f59e0b'], ['Sat', 78, '#3b82f6'], ['Sun', 44, '#3b82f6']
    ].map(([day, pct, col]) => `
          <div class="chart-bar-group">
            <div class="chart-bar" style="height:${pct}%;background:${col};min-height:8px" title="${day}: ${pct}%"></div>
            <span class="chart-bar-label">${day}</span>
          </div>`).join('')}
      </div>
      <div class="chart-legend">
        <div class="legend-item"><div class="legend-dot" style="background:#3b82f6"></div>Revenue</div>
        <div class="legend-item"><div class="legend-dot" style="background:#f59e0b"></div>Peak</div>
      </div>
    </div>

    <!-- Recent Orders -->
    <div class="admin-table-wrap">
      <div class="admin-table-header">
        <span class="admin-table-title">Recent Orders</span>
        <button class="btn btn-primary btn-sm" onclick="switchAdminTab('orders');adminTab='orders'">View All</button>
      </div>
      <table>
        <thead><tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${ORDERS.slice(0, 5).map(o => `
            <tr>
              <td><strong>${o.id}</strong></td>
              <td>${o.customer}</td>
              <td>${o.date}</td>
              <td>${o.items}</td>
              <td><strong>${o.total}</strong></td>
              <td><span class="status-badge status-${o.status}">${o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span></td>
              <td><div class="row-actions">
                <button class="row-action-btn view">View</button>
              </div></td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function renderAdminProducts() {
  return `
    <div class="admin-table-wrap">
      <div class="admin-table-header">
        <span class="admin-table-title">Products (${adminProducts.length})</span>
        <div class="admin-search">
          <input type="text" placeholder="Search products..." oninput="adminFilterProducts(this.value)" />
          <button class="btn btn-primary btn-sm" onclick="showAddProductForm()">+ Add Product</button>
        </div>
      </div>
      <div id="admin-product-form-area"></div>
      <table id="admin-products-table">
        <thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Rating</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody id="admin-products-body">
          ${renderProductRows(adminProducts)}
        </tbody>
      </table>
    </div>`;
}

function renderProductRows(list) {
  return list.map(p => `
    <tr>
      <td><div class="table-img">${getProductSVG(p)}</div></td>
      <td><strong>${p.name}</strong></td>
      <td>${p.category}</td>
      <td>$${p.price.toFixed(2)} ${p.originalPrice ? `<br><span style="font-size:.72rem;color:var(--gray-400);text-decoration:line-through">$${p.originalPrice.toFixed(2)}</span>` : ''}</td>
      <td>${p.inStock ? '<span style="color:var(--success);font-weight:600">In Stock</span>' : '<span style="color:var(--error);font-weight:600">Out of Stock</span>'}</td>
      <td><span style="color:var(--accent)">★</span> ${p.rating} <span style="color:var(--gray-400);font-size:.78rem">(${p.reviews})</span></td>
      <td><span class="status-badge ${p.inStock ? 'status-active' : 'status-inactive'}">${p.inStock ? 'Active' : 'Inactive'}</span></td>
      <td><div class="row-actions">
        <button class="row-action-btn edit" onclick="editProduct(${p.id})">Edit</button>
        <button class="row-action-btn delete" onclick="deleteProduct(${p.id})">Delete</button>
      </div></td>
    </tr>`).join('');
}

function adminFilterProducts(q) {
  const filtered = adminProducts.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase()));
  const tbody = document.getElementById('admin-products-body');
  if (tbody) tbody.innerHTML = renderProductRows(filtered);
}

function showAddProductForm() {
  editingId = null;
  document.getElementById('admin-product-form-area').innerHTML = productForm(null);
}
function editProduct(id) {
  editingId = id;
  const p = adminProducts.find(x => x.id === id);
  document.getElementById('admin-product-form-area').innerHTML = productForm(p);
  document.getElementById('admin-product-form-area').scrollIntoView({ behavior: 'smooth' });
}
function productForm(p) {
  return `
    <div style="padding:1.5rem;border-bottom:1px solid var(--gray-200);background:var(--gray-50)">
      <h4 style="margin-bottom:1.25rem;font-weight:700">${p ? 'Edit Product' : 'Add New Product'}</h4>
      <div class="admin-form-grid">
        <div class="form-group"><label>Product Name</label><input id="pf-name" value="${p?.name || ''}" placeholder="Product name" /></div>
        <div class="form-group"><label>Category</label>
          <select id="pf-cat">${['Electronics', 'Audio', 'Wearables', 'Accessories'].map(c => `<option ${p?.category === c ? 'selected' : ''}>${c}</option>`).join('')}</select>
        </div>
        <div class="form-group"><label>Price ($)</label><input id="pf-price" type="number" value="${p?.price || ''}" placeholder="0.00" step=".01" /></div>
        <div class="form-group"><label>Original Price ($)</label><input id="pf-orig" type="number" value="${p?.originalPrice || ''}" placeholder="0.00" step=".01" /></div>
        <div class="form-group" style="grid-column:1/-1"><label>Description</label><textarea id="pf-desc" rows="2">${p?.description || ''}</textarea></div>
        <div class="form-group"><label>Stock Status</label>
          <select id="pf-stock"><option value="true" ${p?.inStock !== false ? 'selected' : ''}>In Stock</option><option value="false" ${p?.inStock === false ? 'selected' : ''}>Out of Stock</option></select>
        </div>
        <div class="form-group"><label>Badge</label>
          <select id="pf-badge"><option value="">None</option>${['sale', 'new', 'hot'].map(b => `<option ${p?.badge === b ? 'selected' : ''}>${b}</option>`).join('')}</select>
        </div>
      </div>
      <div style="display:flex;gap:.75rem;margin-top:1rem">
        <button class="btn btn-primary btn-sm" onclick="saveProduct()">Save Product</button>
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('admin-product-form-area').innerHTML=''">Cancel</button>
      </div>
    </div>`;
}
function saveProduct() {
  const name = document.getElementById('pf-name').value;
  const cat = document.getElementById('pf-cat').value;
  const price = parseFloat(document.getElementById('pf-price').value);
  const orig = parseFloat(document.getElementById('pf-orig').value) || null;
  const desc = document.getElementById('pf-desc').value;
  const inStock = document.getElementById('pf-stock').value === 'true';
  const badge = document.getElementById('pf-badge').value || null;
  if (!name || !price) { Toast.show('Name and price are required.', 'error'); return; }
  if (editingId) {
    const idx = adminProducts.findIndex(p => p.id === editingId);
    adminProducts[idx] = { ...adminProducts[idx], name, category: cat, price, originalPrice: orig, description: desc, inStock, badge };
    Toast.show('Product updated!', 'success');
  } else {
    const newId = Math.max(...adminProducts.map(p => p.id)) + 1;
    adminProducts.push({ id: newId, name, category: cat, price, originalPrice: orig, description: desc, inStock, badge, rating: 4.5, reviews: 0, featured: false, colors: ['#1e293b'], features: [], tags: [], svgColor: '#3b82f6', svgIcon: 'monitor' });
    Toast.show('Product added!', 'success');
  }
  document.getElementById('admin-product-form-area').innerHTML = '';
  document.getElementById('admin-products-body').innerHTML = renderProductRows(adminProducts);
}
function deleteProduct(id) {
  adminProducts = adminProducts.filter(p => p.id !== id);
  Toast.show('Product deleted.', 'warning');
  document.getElementById('admin-products-body').innerHTML = renderProductRows(adminProducts);
}

function renderAdminOrders() {
  return `
    <div class="stats-grid" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr));margin-bottom:1.5rem">
      ${[
      ['Total Orders', '1,284', 'blue', '📦'], ['Pending', '24', 'yellow', '⏳'],
      ['Processing', '38', 'blue', '⚙️'], ['Delivered', '1,186', 'green', '✅'], ['Cancelled', '12', 'red', '❌'],
    ].map(([l, v, c, i]) => `<div class="stat-card"><div class="stat-icon ${c}">${i}</div><div><div class="stat-label">${l}</div><div class="stat-value" style="font-size:1.3rem">${v}</div></div></div>`).join('')}
    </div>
    <div class="admin-table-wrap">
      <div class="admin-table-header">
        <span class="admin-table-title">All Orders</span>
        <div class="admin-search">
          <input type="text" placeholder="Search orders..." />
          <button class="btn btn-secondary btn-sm">Export CSV</button>
        </div>
      </div>
      <table>
        <thead><tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${ORDERS.map(o => `
            <tr>
              <td><strong>${o.id}</strong></td>
              <td>${o.customer}</td>
              <td>${o.date}</td>
              <td>${o.items} item${o.items > 1 ? 's' : ''}</td>
              <td><strong>${o.total}</strong></td>
              <td>
                <select class="sort-select" style="font-size:.75rem;padding:.25rem .5rem" onchange="updateOrderStatus('${o.id}',this.value)">
                  ${['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(s =>
      `<option ${s === o.status ? 'selected' : ''}>${s.charAt(0).toUpperCase() + s.slice(1)}</option>`
    ).join('')}
                </select>
              </td>
              <td><div class="row-actions">
                <button class="row-action-btn view">View</button>
                <button class="row-action-btn edit">Invoice</button>
              </div></td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}
function updateOrderStatus(id, status) {
  Toast.show(`Order ${id} marked as ${status}`, 'success');
}

function renderAdminCustomers() {
  return `
    <div class="admin-table-wrap">
      <div class="admin-table-header">
        <span class="admin-table-title">Customers (${CUSTOMERS.length})</span>
        <div class="admin-search">
          <input type="text" placeholder="Search customers..." />
          <button class="btn btn-primary btn-sm">+ Invite</button>
        </div>
      </div>
      <table>
        <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Orders</th><th>Total Spent</th><th>Joined</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${CUSTOMERS.map(c => `
            <tr>
              <td style="color:var(--gray-400)">${c.id}</td>
              <td><div style="display:flex;align-items:center;gap:.6rem">
                <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--primary),#8b5cf6);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:.8rem">${c.name[0]}</div>
                <strong>${c.name}</strong>
              </div></td>
              <td>${c.email}</td>
              <td>${c.orders}</td>
              <td><strong>${c.spent}</strong></td>
              <td>${c.joined}</td>
              <td><span class="status-badge status-${c.status}">${c.status.charAt(0).toUpperCase() + c.status.slice(1)}</span></td>
              <td><div class="row-actions">
                <button class="row-action-btn view" onclick="Toast.show('Viewing ${c.name}','info')">View</button>
                <button class="row-action-btn edit">Email</button>
              </div></td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function renderAnalytics() {
  const categories = ['Electronics', 'Audio', 'Wearables', 'Accessories'];
  const sales = [42, 28, 18, 12];
  return `
    <div class="stats-grid">
      ${[
      ['Conversion Rate', '3.42%', '↑ 0.8% this week', 'up'],
      ['Avg Order Value', '$187.40', '↑ $12 vs last month', 'up'],
      ['Cart Abandonment', '68.4%', '↓ 2.1% this month', 'up'],
      ['Return Rate', '2.8%', '↓ 0.4% this month', 'up'],
    ].map(([l, v, c, d]) => `<div class="stat-card" style="flex-direction:column;gap:.5rem">
        <div class="stat-label">${l}</div>
        <div class="stat-value" style="font-size:1.4rem">${v}</div>
        <div class="stat-change ${d}">${c}</div>
      </div>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
      <div class="chart-card">
        <div class="chart-title" style="margin-bottom:1.25rem">Sales by Category</div>
        ${categories.map((cat, i) => `
          <div style="margin-bottom:1rem">
            <div style="display:flex;justify-content:space-between;font-size:.85rem;margin-bottom:.3rem">
              <span>${cat}</span><span style="font-weight:700">${sales[i]}%</span>
            </div>
            <div style="height:8px;background:var(--gray-100);border-radius:99px;overflow:hidden">
              <div style="height:100%;width:${sales[i]}%;background:var(--primary);border-radius:99px;transition:width .6s ease"></div>
            </div>
          </div>`).join('')}
      </div>
      <div class="chart-card">
        <div class="chart-title" style="margin-bottom:1.25rem">Traffic Sources</div>
        ${[['Organic Search', '45%', '#3b82f6'], ['Direct', '22%', '#10b981'], ['Social Media', '18%', '#f59e0b'], ['Email', '10%', '#8b5cf6'], ['Referral', '5%', '#ef4444']].map(([src, pct, col]) => `
          <div style="margin-bottom:1rem">
            <div style="display:flex;justify-content:space-between;font-size:.85rem;margin-bottom:.3rem">
              <span>${src}</span><span style="font-weight:700">${pct}</span>
            </div>
            <div style="height:8px;background:var(--gray-100);border-radius:99px;overflow:hidden">
              <div style="height:100%;width:${pct};background:${col};border-radius:99px"></div>
            </div>
          </div>`).join('')}
      </div>
    </div>`;
}

/* ─────────────────────────────────────────────
   PRIVACY PAGE
───────────────────────────────────────────── */
function renderPrivacy() {
  const root = document.querySelector('.view');
  root.innerHTML = `
    <div class="privacy-hero">
      <div class="container">
        <div class="section-label" style="color:rgba(255,255,255,.5);margin-bottom:.75rem">Legal</div>
        <h1>Privacy & Security</h1>
        <p>Last updated: April 5, 2026 · Effective immediately</p>
      </div>
    </div>
    <div class="container">
      <div class="privacy-layout">
        <nav class="privacy-nav">
          <h4>On this page</h4>
          ${['Introduction', 'Information We Collect', 'How We Use Data', 'Sharing & Disclosure', 'Cookies', 'Data Security', 'Your Rights', 'Children\'s Privacy', 'Contact Us'].map((s, i) => `
            <a class="privacy-nav-link" id="pnl-${i}" onclick="privacyScrollTo(${i})">${s}</a>`).join('')}
        </nav>

        <div class="privacy-content">

          <section id="ps-0">
            <h2><span class="section-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></span>Introduction</h2>
            <p>Welcome to Elevo Store. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and make purchases from us.</p>
            <p>Please read this policy carefully. If you disagree with its terms, please discontinue use of our site. We reserve the right to make changes at any time and will alert you by updating the "Last Updated" date.</p>
            <div class="security-badges">
              ${[
      ['🔒', 'SSL Encrypted', '256-bit TLS encryption'],
      ['🛡️', 'GDPR Compliant', 'Full EU data protection'],
      ['🏆', 'PCI DSS Level 1', 'Payment card security'],
      ['✅', 'SOC 2 Certified', 'Security audit certified'],
    ].map(([icon, title, sub]) => `
                <div class="security-badge">
                  <div class="sb-icon">${icon}</div>
                  <div class="sb-text"><h4>${title}</h4><p>${sub}</p></div>
                </div>`).join('')}
            </div>
          </section>

          <section id="ps-1">
            <h2><span class="section-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>Information We Collect</h2>
            <p>We collect information you provide directly to us and information automatically gathered when you use our services.</p>
            <h3>Personal Information You Provide</h3>
            <ul>
              <li>Name, email address, mailing address, and phone number</li>
              <li>Payment information (credit card numbers processed via PCI-compliant third parties — we never store raw card data)</li>
              <li>Account credentials if you create an account</li>
              <li>Order history, returns, and product reviews</li>
              <li>Communications you send us via support channels</li>
            </ul>
            <h3>Information Collected Automatically</h3>
            <ul>
              <li>Device information: IP address, browser type and version, operating system</li>
              <li>Usage data: pages visited, time spent, clicks, referral URLs</li>
              <li>Location data (country/region level only, derived from IP)</li>
              <li>Cookies and similar tracking technologies (see Cookie Policy below)</li>
            </ul>
          </section>

          <section id="ps-2">
            <h2><span class="section-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></span>How We Use Your Data</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul>
              <li><strong>Order fulfillment:</strong> Processing purchases, shipping, and returns</li>
              <li><strong>Account management:</strong> Creating and maintaining your account</li>
              <li><strong>Customer support:</strong> Responding to inquiries and resolving disputes</li>
              <li><strong>Marketing:</strong> Sending promotional emails (with your consent, unsubscribe anytime)</li>
              <li><strong>Personalization:</strong> Recommending products based on your browsing history</li>
              <li><strong>Analytics:</strong> Understanding how our site is used to improve the experience</li>
              <li><strong>Legal compliance:</strong> Meeting legal obligations and enforcing our terms</li>
              <li><strong>Fraud prevention:</strong> Detecting and preventing unauthorized transactions</li>
            </ul>
            <p>We only process your data where we have a lawful basis to do so, including your consent, contract performance, legitimate business interests, or legal obligation.</p>
          </section>

          <section id="ps-3">
            <h2><span class="section-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></span>Sharing & Disclosure</h2>
            <p>We do not sell, rent, or trade your personal information to third parties for their marketing purposes. We may share your data in the following limited circumstances:</p>
            <ul>
              <li><strong>Service providers:</strong> Shipping partners (FedEx, UPS), payment processors (Stripe), analytics (privacy-mode Google Analytics)</li>
              <li><strong>Legal requirements:</strong> When required by law, court order, or governmental authority</li>
              <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>Protection of rights:</strong> When necessary to protect our rights, property, or safety</li>
            </ul>
            <p>All third-party service providers are contractually obligated to keep your information confidential and use it only for the services they provide to us.</p>
          </section>

          <section id="ps-4">
            <h2><span class="section-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></span>Cookies & Tracking</h2>
            <p>We use cookies and similar tracking technologies to enhance your experience on our site. You can control cookies through your browser settings at any time.</p>
            <h3>Types of cookies we use</h3>
            <ul>
              <li><strong>Essential cookies:</strong> Required for basic functionality (shopping cart, login sessions)</li>
              <li><strong>Analytics cookies:</strong> Help us understand site usage (anonymized)</li>
              <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Marketing cookies:</strong> Deliver relevant advertisements (only with consent)</li>
            </ul>
            <p>You may opt out of non-essential cookies. Note that disabling cookies may affect some site functionality.</p>
          </section>

          <section id="ps-5">
            <h2><span class="section-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>Data Security</h2>
            <p>We implement industry-leading security measures to protect your personal information:</p>
            <ul>
              <li><strong>Encryption in transit:</strong> All data transmitted via TLS 1.3 (256-bit encryption)</li>
              <li><strong>Encryption at rest:</strong> Sensitive data stored using AES-256 encryption</li>
              <li><strong>Payment security:</strong> PCI DSS Level 1 compliant — card data processed by Stripe, never stored on our servers</li>
              <li><strong>Access controls:</strong> Role-based access, multi-factor authentication for all staff</li>
              <li><strong>Security audits:</strong> Regular third-party penetration testing and vulnerability assessments</li>
              <li><strong>Monitoring:</strong> 24/7 intrusion detection and anomaly monitoring</li>
              <li><strong>Incident response:</strong> Documented breach response plan; notification within 72 hours as required by law</li>
            </ul>
            <p>While we employ best-in-class security measures, no system is 100% secure. We encourage you to use strong, unique passwords and enable two-factor authentication where available.</p>
          </section>

          <section id="ps-6">
            <h2><span class="section-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Erasure:</strong> Request deletion of your personal data ("right to be forgotten")</li>
              <li><strong>Restriction:</strong> Request we limit how we process your data</li>
              <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
              <li><strong>Objection:</strong> Object to processing based on legitimate interests or direct marketing</li>
              <li><strong>Withdraw consent:</strong> Withdraw consent at any time where processing is consent-based</li>
            </ul>
            <p>To exercise any of these rights, contact us at <strong>privacy@elevo.store</strong>. We will respond within 30 days. You also have the right to lodge a complaint with your local data protection authority.</p>
          </section>

          <section id="ps-7">
            <h2><span class="section-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></span>Children's Privacy</h2>
            <p>Our services are not directed to children under 13 years of age (or 16 in the EU). We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately and we will take steps to delete such information.</p>
          </section>

          <section id="ps-8">
            <h2><span class="section-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.19h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>Contact Us</h2>
            <p>If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please reach out:</p>
            <div style="background:var(--gray-50);border-radius:var(--radius);padding:1.5rem;margin-top:1rem">
              <p><strong>Elevo Store Privacy Team</strong></p>
              <p>📧 privacy@elevo.store</p>
              <p>📬 123 Commerce Ave, Suite 400, New York, NY 10001</p>
              <p>📞 +1 (800) ELEVO-01</p>
              <p style="margin-top:1rem;font-size:.85rem;color:var(--gray-500)">Response time: within 2 business days for general inquiries, 30 days for data subject requests.</p>
            </div>
            <div style="margin-top:2rem;padding:1.25rem;border-radius:var(--radius-sm);background:var(--primary-light);border-left:4px solid var(--primary)">
              <p style="font-size:.9rem;color:var(--primary-dark);margin:0"><strong>Data Protection Officer:</strong> Our DPO can be reached at dpo@elevo.store for GDPR-related inquiries.</p>
            </div>
          </section>

        </div>
      </div>
    </div>`;

  // Scroll-active detection for privacy sidebar
  requestAnimationFrame(() => {
    const sections = document.querySelectorAll('.privacy-content section[id]');
    const links = document.querySelectorAll('.privacy-nav-link');
    // Set first link active immediately on load
    if (links.length) links[0].classList.add('active');
    const obs = new IntersectionObserver((entries) => {
      // Pick the topmost visible section
      const visible = entries.filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (!visible.length) return;
      const idx = visible[0].target.id.replace('ps-', '');
      links.forEach(l => l.classList.remove('active'));
      document.getElementById(`pnl-${idx}`)?.classList.add('active');
    }, { rootMargin: '-5% 0px -60% 0px', threshold: 0 });
    sections.forEach(s => obs.observe(s));
  });
}

function privacyScrollTo(i) {
  document.getElementById(`ps-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.querySelectorAll('.privacy-nav-link').forEach(l => l.classList.remove('active'));
  document.getElementById(`pnl-${i}`)?.classList.add('active');
}

/* ─────────────────────────────────────────────
   ABOUT PAGE
───────────────────────────────────────────── */
function renderAbout() {
  const root = document.querySelector('.view');
  root.innerHTML = `
    <div class="about-hero">
      <div class="container">
        <div class="section-label" style="color:rgba(255,255,255,.5);margin-bottom:.75rem">Our Story</div>
        <h1>Built for the curious,<br>the creative, the connected.</h1>
        <p>Elevo started in 2020 with a simple idea — make premium tech accessible to everyone, with honest reviews and fair prices.</p>
      </div>
    </div>

    <div class="about-section">
      <div class="container">
        <div class="section-header">
          <div class="section-label">What drives us</div>
          <h2 class="section-title">Our Values</h2>
        </div>
        <div class="values-grid">
          ${[
      ['🎯', 'Quality First', 'Every product on Elevo is hand-tested by our team. If we wouldn\'t use it ourselves, it doesn\'t make the cut.'],
      ['💬', 'Radical Honesty', 'We publish every review — the good, the bad, and the brutally honest. No cherry-picking.'],
      ['🌍', 'Sustainability', 'We offset carbon for every shipment and partner with brands committed to responsible manufacturing.'],
      ['⚡', 'Customer Obsessed', 'Our support team is real people who actually know the products. Available 24/7, 365 days a year.'],
    ].map(([icon, title, desc]) => `
            <div class="value-card">
              <div class="value-icon">${icon}</div>
              <h3>${title}</h3>
              <p>${desc}</p>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <div class="about-section">
      <div class="container">
        <div class="section-header">
          <div class="section-label">The team</div>
          <h2 class="section-title">Meet the People Behind Elevo</h2>
        </div>
        <div class="team-grid">
          ${[
      ['Sarah Chen', 'CEO & Co-Founder', 'SC'],
      ['Marcus Webb', 'CTO', 'MW'],
      ['Aiko Tanaka', 'Head of Product', 'AT'],
      ['Jordan Lee', 'Head of Design', 'JL'],
      ['Priya Patel', 'Head of Operations', 'PP'],
      ['Theo Rousseau', 'Head of Marketing', 'TR'],
    ].map(([name, role, init]) => `
            <div class="team-card">
              <div class="team-avatar" style="background:linear-gradient(135deg,var(--primary),#8b5cf6);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:1.1rem">${init}</div>
              <div class="team-name">${name}</div>
              <div class="team-role">${role}</div>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <div class="newsletter-section">
      <div class="container text-center">
        <h2 class="section-title">Join the Elevo Community</h2>
        <p class="section-sub">Get product drops, honest reviews, and exclusive deals — every week.</p>
        <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-accent btn-lg" onclick="navigate('shop')">Shop Now</button>
          <button class="btn btn-secondary btn-lg" style="border-color:rgba(255,255,255,.3);color:#fff">Follow Us</button>
        </div>
      </div>
    </div>`;
}

/* ═══════════════════════════════════════════════════════════
   FOOTER PAGES
═══════════════════════════════════════════════════════════ */

/* shared layout builder */
function infoPageShell(heroBg, heroLabel, heroTitle, heroSub, sidebarSections, contentHTML) {
  return `
    <div class="info-hero" style="background:${heroBg};color:#fff;text-align:center">
      <div class="container">
        <div class="section-label" style="color:rgba(255,255,255,.5);margin-bottom:.75rem">${heroLabel}</div>
        <h1 style="font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;margin-bottom:.65rem">${heroTitle}</h1>
        <p style="color:rgba(255,255,255,.65);font-size:1rem;max-width:500px;margin:0 auto">${heroSub}</p>
      </div>
    </div>
    <div class="container info-page">
      <div class="info-grid">
        <aside class="info-sidebar">
          <h4>On this page</h4>
          ${sidebarSections.map((s, i) => `<a class="info-sidebar-link" id="isl-${i}" onclick="infoScrollTo(${i},'is')">${s}</a>`).join('')}
        </aside>
        <div class="info-content" id="info-content">
          ${contentHTML}
        </div>
      </div>
    </div>`;
}

function initInfoScroll() {
  requestAnimationFrame(() => {
    const sections = document.querySelectorAll('.info-content section[id^="is-"]');
    const links = document.querySelectorAll('.info-sidebar-link');
    if (!sections.length) return;
    // Set first link active immediately on load
    if (links.length) links[0].classList.add('active');
    const obs = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (!visible.length) return;
      const idx = visible[0].target.id.replace('is-', '');
      links.forEach(l => l.classList.remove('active'));
      document.getElementById(`isl-${idx}`)?.classList.add('active');
    }, { rootMargin: '-5% 0px -60% 0px', threshold: 0 });
    sections.forEach(s => obs.observe(s));
  });
}

function infoScrollTo(i, prefix) {
  document.getElementById(`${prefix}-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.querySelectorAll('.info-sidebar-link, .privacy-nav-link').forEach(l => l.classList.remove('active'));
  document.getElementById(`isl-${i}`)?.classList.add('active');
}

function infoSecIcon(svg) {
  return `<span class="sec-icon">${svg}</span>`;
}

/* ─────────────────────────────────────────────
   HELP CENTER
───────────────────────────────────────────── */
function renderHelp() {
  const root = document.querySelector('.view');
  const faqs = {
    'Orders & Payments': [
      ['How do I place an order?', 'Browse our shop, add items to your cart, then click "Proceed to Checkout". Follow the 3-step checkout to enter your shipping details, choose a payment method, and confirm your order.'],
      ['What payment methods do you accept?', 'We accept Visa, Mastercard, American Express, PayPal, Apple Pay, and major cryptocurrencies (BTC, ETH, USDC).'],
      ['Can I change or cancel my order?', 'Orders can be modified or cancelled within 30 minutes of placing them. After that, if the order has shipped you\'ll need to use our Returns process.'],
      ['Is it safe to use my credit card on Elevo?', 'Absolutely. We use PCI DSS Level 1 compliant processing via Stripe. Your card details never touch our servers.'],
    ],
    'Shipping & Delivery': [
      ['How long does delivery take?', 'Standard shipping takes 3–5 business days. Express (1–2 days) and same-day options are available at checkout for eligible zip codes.'],
      ['Do you ship internationally?', 'We currently ship to the US, Canada, UK, and EU countries. More regions are being added — check back soon.'],
      ['How do I track my order?', 'Once shipped, you\'ll receive a tracking email. You can also use our Track Order page and enter your order number.'],
      ['My order is late. What should I do?', 'If your order is more than 2 days past the estimated delivery, contact us via live chat or email support@elevo.store — we\'ll investigate immediately.'],
    ],
    'Returns & Refunds': [
      ['What is your return policy?', 'We offer a no-questions-asked 30-day return policy on all products. Items must be in original condition with packaging.'],
      ['How do I start a return?', 'Visit our Returns & Refunds page, enter your order number, select the items to return, and print a prepaid label.'],
      ['When will I get my refund?', 'Refunds are processed within 2 business days of receiving your return. It may take 3–5 days to appear on your statement.'],
    ],
    'Account & Technical': [
      ['How do I create an account?', 'Click the person icon in the top-right header and select "Create Account". You can also check out as a guest.'],
      ['I forgot my password. How do I reset it?', 'Click "Sign In", then "Forgot password?" Enter your email and we\'ll send a secure reset link within a few minutes.'],
      ['How do I update my shipping address?', 'Go to Account → Address Book to add or edit saved addresses.'],
    ],
  };

  const sections = Object.keys(faqs);
  let content = sections.map((cat, si) => `
    <section id="is-${si}" style="scroll-margin-top:calc(var(--header-h) + 1.5rem)">
      <h2>${infoSecIcon('❓')} ${cat}</h2>
      <div class="faq-list">
        ${faqs[cat].map((faq) => `
          <div class="faq-item">
            <button class="faq-question" onclick="toggleFaq(this)">
              <span>${faq[0]}</span>
              <svg class="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="faq-answer">${faq[1]}</div>
          </div>`).join('')}
      </div>
    </section>`).join('');

  content += `
    <section id="is-${sections.length}" style="scroll-margin-top:calc(var(--header-h) + 1.5rem)">
      <h2>${infoSecIcon('💬')} Still need help?</h2>
      <p>Our support team is available 24/7. Pick the channel that works best for you.</p>
      <div class="contact-cards-grid">
        ${[
          ['💬', 'Live Chat', 'Avg response: under 2 min', 'onclick="Toast.show(\'Opening live chat...\',\'info\')"'],
          ['📧', 'Email Support', 'support@elevo.store', ''],
          ['📞', 'Phone', '+1 (800) ELEVO-01', ''],
          ['🐦', 'Twitter / X', '@ElevoCare', ''],
        ].map(([icon, title, sub, action]) => `
          <div class="contact-card" style="cursor:pointer" ${action}>
            <div class="cc-icon">${icon}</div>
            <div class="cc-info"><h4>${title}</h4><p>${sub}</p></div>
          </div>`).join('')}
      </div>
    </section>`;

  root.innerHTML = infoPageShell(
    'linear-gradient(135deg,#0f172a,#1e3a5f)',
    'Support',
    'Help Center',
    'Find answers to common questions or get in touch with our team.',
    [...sections, 'Contact Support'],
    content
  );
  initInfoScroll();
}

function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');
  // Close all in same list
  btn.closest('.faq-list').querySelectorAll('.faq-question.open').forEach(b => {
    b.classList.remove('open');
    b.nextElementSibling.classList.remove('open');
  });
  if (!isOpen) {
    btn.classList.add('open');
    answer.classList.add('open');
  }
}

/* ─────────────────────────────────────────────
   TRACK ORDER
───────────────────────────────────────────── */
function renderTrack() {
  const root = document.querySelector('.view');
  root.innerHTML = `
    <div class="info-hero" style="background:linear-gradient(135deg,#0f172a,#1e3a5f);color:#fff;text-align:center">
      <div class="container">
        <div class="section-label" style="color:rgba(255,255,255,.5);margin-bottom:.75rem">Shipping</div>
        <h1 style="font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;margin-bottom:.65rem">Track Your Order</h1>
        <p style="color:rgba(255,255,255,.65)">Enter your order ID to see real-time status updates.</p>
      </div>
    </div>
    <div class="container" style="padding:3rem 1.25rem 5rem">
      <div class="track-form">
        <h3 style="font-size:1.1rem;font-weight:700;margin-bottom:.35rem">Order Lookup</h3>
        <p style="font-size:.88rem;color:var(--gray-500);margin-bottom:1.5rem">Your order ID was included in your confirmation email.</p>
        <div class="form-group">
          <label>Order ID</label>
          <input type="text" id="track-id-input" placeholder="e.g. #ORD-8821" value="#ORD-8821" />
        </div>
        <div class="form-group">
          <label>Email Address</label>
          <input type="email" id="track-email-input" placeholder="Email used at checkout" value="demo@elevo.store" />
        </div>
        <button class="btn btn-primary btn-block" onclick="showTrackResult()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          Track Order
        </button>
      </div>
      <div id="track-result"></div>
    </div>`;
}

function showTrackResult() {
  const id = document.getElementById('track-id-input').value.trim() || '#ORD-8821';
  document.getElementById('track-result').innerHTML = `
    <div class="track-result">
      <div style="padding:1.5rem;border-bottom:1px solid var(--gray-100);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
        <div>
          <div style="font-size:.78rem;color:var(--gray-400);font-weight:600;text-transform:uppercase;letter-spacing:.06em">Order ID</div>
          <div style="font-weight:800;font-size:1.1rem;color:var(--dark)">${id}</div>
        </div>
        <div><span class="status-badge status-shipped" style="font-size:.85rem;padding:.35rem .9rem">Shipped · On the way</span></div>
        <div style="text-align:right">
          <div style="font-size:.78rem;color:var(--gray-400)">Est. Delivery</div>
          <div style="font-weight:700;color:var(--dark)">April 7, 2026</div>
        </div>
      </div>
      <div class="track-timeline">
        ${[
          { label: 'Order Placed', sub: 'We received your order and payment confirmed.', time: 'Apr 4, 2026 · 10:22 AM', done: true },
          { label: 'Processing', sub: 'Your items are being picked, packed, and inspected.', time: 'Apr 4, 2026 · 2:05 PM', done: true },
          { label: 'Dispatched', sub: 'Handed to FedEx. Tracking: 7489204820482.', time: 'Apr 5, 2026 · 9:14 AM', done: true },
          { label: 'In Transit', sub: 'Package is on its way to your address in New York, NY.', time: 'Apr 5, 2026 · 3:41 PM', current: true },
          { label: 'Out for Delivery', sub: 'Your package will be delivered today between 9AM – 6PM.', time: '', done: false },
          { label: 'Delivered', sub: 'Package delivered and signed for.', time: '', done: false },
        ].map(step => `
          <div class="timeline-step ${step.done ? 'done' : ''} ${step.current ? 'current' : ''}">
            <div class="ts-dot">
              ${step.done ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>` :
                step.current ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>` :
                `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`}
            </div>
            <div class="ts-info">
              <h4>${step.label}</h4>
              <p>${step.sub}</p>
              ${step.time ? `<div class="ts-time">${step.time}</div>` : ''}
            </div>
          </div>`).join('')}
      </div>
    </div>`;
}

/* ─────────────────────────────────────────────
   RETURNS & REFUNDS
───────────────────────────────────────────── */
function renderReturns() {
  const root = document.querySelector('.view');
  const steps = [
    ['1', 'Initiate Return', 'Fill out the return form below or visit your Account → Orders page. Select the item(s) and reason for return.'],
    ['2', 'Print Label', 'We\'ll email you a prepaid return shipping label within 5 minutes. Print and attach it to your package.'],
    ['3', 'Drop Off', 'Drop your sealed package at any FedEx, UPS, or USPS location. No need to schedule a pickup.'],
    ['4', 'Inspection', 'We inspect returned items within 1 business day of receipt to confirm condition.'],
    ['5', 'Refund Issued', 'Your refund is issued within 2 business days. Credit card refunds typically appear in 3–5 days.'],
  ];

  const content = `
    <section id="is-0" style="scroll-margin-top:calc(var(--header-h) + 1.5rem)">
      <h2>${infoSecIcon('🔄')} Return Process</h2>
      <p>We want you to love everything you buy from Elevo. If something isn't right, our 30-day return policy has you covered — no questions asked.</p>
      <div style="display:flex;flex-direction:column;gap:1rem;margin:1.5rem 0">
        ${steps.map(([n, title, desc]) => `
          <div style="display:flex;gap:1rem;align-items:flex-start;padding:1.1rem;background:var(--white);border:1px solid var(--gray-200);border-radius:var(--radius)">
            <div style="width:36px;height:36px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:.9rem;flex-shrink:0">${n}</div>
            <div><h4 style="font-weight:700;color:var(--dark);margin-bottom:.3rem">${title}</h4><p style="font-size:.9rem;color:var(--gray-600);margin:0">${desc}</p></div>
          </div>`).join('')}
      </div>
    </section>
    <section id="is-1" style="scroll-margin-top:calc(var(--header-h) + 1.5rem)">
      <h2>${infoSecIcon('📋')} Eligibility</h2>
      <p>Most items qualify for return within 30 days of delivery. Exceptions include:</p>
      <ul>
        <li>Digital downloads and software licenses (non-refundable after activation)</li>
        <li>Personalized or custom-engraved products</li>
        <li>Hazardous materials or items with broken safety seals</li>
        <li>Items purchased during a Final Sale event (clearly marked at checkout)</li>
      </ul>
      <p>Items must be in their original condition — unused, in original packaging, with all accessories and documentation.</p>
    </section>
    <section id="is-2" style="scroll-margin-top:calc(var(--header-h) + 1.5rem)">
      <h2>${infoSecIcon('💰')} Refund Options</h2>
      ${[
        ['Original Payment', 'Refunded to the card or PayPal account used at checkout.', '3–5 business days to reflect'],
        ['Elevo Store Credit', 'Instant credit added to your account. Use on any future order.', 'Immediate'],
        ['Exchange', 'We\'ll ship the replacement as soon as the return is scanned by the carrier.', 'Fastest option'],
      ].map(([method, desc, time]) => `
        <div style="display:grid;grid-template-columns:1fr 1fr auto;gap:1rem;padding:1rem;background:var(--white);border:1px solid var(--gray-200);border-radius:var(--radius-sm);margin-bottom:.75rem;align-items:center;flex-wrap:wrap">
          <div><strong style="font-size:.9rem">${method}</strong><p style="font-size:.82rem;color:var(--gray-500);margin:.25rem 0 0">${desc}</p></div>
          <div style="font-size:.82rem;color:var(--gray-600)">${time}</div>
          <button class="btn btn-primary btn-sm" onclick="Toast.show('Return initiated!','success')">Start Return</button>
        </div>`).join('')}
    </section>
    <section id="is-3" style="scroll-margin-top:calc(var(--header-h) + 1.5rem)">
      <h2>${infoSecIcon('📦')} Start a Return</h2>
      <div style="background:var(--white);border:1px solid var(--gray-200);border-radius:var(--radius);padding:1.75rem;max-width:480px">
        <div class="form-group"><label>Order ID</label><input type="text" placeholder="#ORD-8821" /></div>
        <div class="form-group"><label>Email Address</label><input type="email" placeholder="Your order email" /></div>
        <div class="form-group"><label>Reason for Return</label>
          <select>
            <option>Select reason...</option>
            <option>Changed my mind</option>
            <option>Item doesn't match description</option>
            <option>Defective or damaged</option>
            <option>Wrong item received</option>
            <option>Better price elsewhere</option>
          </select>
        </div>
        <div class="form-group"><label>Additional Comments</label><textarea rows="3" placeholder="Tell us more (optional)..."></textarea></div>
        <button class="btn btn-primary btn-block" onclick="Toast.show('Return request submitted! Check your email for a prepaid label.','success',4000)">Submit Return Request</button>
      </div>
    </section>`;

  root.innerHTML = infoPageShell(
    'linear-gradient(135deg,#0f172a,#1e3a5f)',
    'Returns',
    'Returns & Refunds',
    '30-day hassle-free returns on all products.',
    ['Return Process', 'Eligibility', 'Refund Options', 'Start a Return'],
    content
  );
  initInfoScroll();
}

/* ─────────────────────────────────────────────
   SHIPPING INFO
───────────────────────────────────────────── */
function renderShipping() {
  const root = document.querySelector('.view');
  const content = `
    <section id="is-0" style="scroll-margin-top:calc(var(--header-h) + 1.5rem)">
      <h2>${infoSecIcon('🚚')} Delivery Options</h2>
      <p>We ship with FedEx, UPS, and USPS depending on your location. All orders include free tracking.</p>
      <table class="shipping-table">
        <thead><tr><th>Method</th><th>Estimated Time</th><th>Cost</th><th>Details</th></tr></thead>
        <tbody>
          <tr><td><strong>Standard Shipping</strong></td><td>3–5 business days</td><td>$7.99<br><span class="free-tag">FREE over $75</span></td><td>Most locations in the contiguous US</td></tr>
          <tr><td><strong>Express Shipping</strong></td><td>1–2 business days</td><td>$19.99</td><td>Order before 2 PM ET for next-day</td></tr>
          <tr><td><strong>Same-Day Delivery</strong></td><td>Same day</td><td>$29.99</td><td>Available in select cities only</td></tr>
          <tr><td><strong>Scheduled Delivery</strong></td><td>Your chosen date</td><td>$14.99</td><td>Choose any date up to 14 days out</td></tr>
          <tr><td><strong>In-Store Pickup</strong></td><td>Ready in 2 hrs</td><td><span class="free-tag">FREE</span></td><td>Select locations; see map at checkout</td></tr>
        </tbody>
      </table>
    </section>
    <section id="is-1" style="scroll-margin-top:calc(var(--header-h) + 1.5rem)">
      <h2>${infoSecIcon('🌍')} International Shipping</h2>
      <p>We ship to over 40 countries. Import duties and taxes are the responsibility of the buyer and vary by country.</p>
      <table class="shipping-table">
        <thead><tr><th>Region</th><th>Estimated Time</th><th>Cost</th></tr></thead>
        <tbody>
          <tr><td>Canada</td><td>5–8 business days</td><td>$12.99</td></tr>
          <tr><td>United Kingdom</td><td>6–10 business days</td><td>$18.99</td></tr>
          <tr><td>European Union</td><td>7–12 business days</td><td>$18.99</td></tr>
          <tr><td>Australia / NZ</td><td>10–16 business days</td><td>$24.99</td></tr>
          <tr><td>Rest of World</td><td>14–21 business days</td><td>$29.99</td></tr>
        </tbody>
      </table>
    </section>
    <section id="is-2" style="scroll-margin-top:calc(var(--header-h) + 1.5rem)">
      <h2>${infoSecIcon('📦')} Packaging</h2>
      <p>All Elevo orders are packed with care to ensure they arrive in perfect condition. We use:</p>
      <ul>
        <li>Recyclable corrugated cardboard boxes — 100% recycled content</li>
        <li>Paper void fill instead of plastic packing peanuts</li>
        <li>Compostable poly mailers for small items</li>
        <li>Branded tissue paper and thank-you notes for gift orders</li>
      </ul>
      <p>For fragile electronics we use custom-cut foam inserts to prevent movement and damage in transit.</p>
    </section>
    <section id="is-3" style="scroll-margin-top:calc(var(--header-h) + 1.5rem)">
      <h2>${infoSecIcon('⚡')} Order Cut-Off Times</h2>
      <p>Orders placed before the following times on business days ship the same day:</p>
      <table class="shipping-table">
        <thead><tr><th>Shipping Method</th><th>Cut-off (ET)</th><th>Ships</th></tr></thead>
        <tbody>
          <tr><td>Standard</td><td>5:00 PM</td><td>Same day</td></tr>
          <tr><td>Express</td><td>2:00 PM</td><td>Same day</td></tr>
          <tr><td>Same-Day</td><td>11:00 AM</td><td>Same day</td></tr>
        </tbody>
      </table>
      <p style="font-size:.85rem;color:var(--gray-500)">Orders placed on weekends or holidays ship the next business day. Holiday shipping schedules are posted on the homepage during peak seasons.</p>
    </section>
    <section id="is-4" style="scroll-margin-top:calc(var(--header-h) + 1.5rem)">
      <h2>${infoSecIcon('❓')} Lost or Damaged Packages</h2>
      <p>In the rare event your package is lost or arrives damaged, we make it right — always.</p>
      <ul>
        <li><strong>Lost in transit:</strong> If your tracking shows no movement for 5+ days, contact us and we'll file a claim and reship or refund immediately.</li>
        <li><strong>Damaged on arrival:</strong> Take photos of the packaging and contents, then email us at support@elevo.store. We'll send a replacement within 24 hours.</li>
        <li><strong>Wrong item received:</strong> We'll arrange a free return pickup and expedite the correct item to you.</li>
      </ul>
    </section>`;

  root.innerHTML = infoPageShell(
    'linear-gradient(135deg,#0f172a,#1e3a5f)',
    'Delivery',
    'Shipping Information',
    'Everything you need to know about getting your order.',
    ['Delivery Options', 'International', 'Packaging', 'Cut-Off Times', 'Lost / Damaged'],
    content
  );
  initInfoScroll();
}

/* ─────────────────────────────────────────────
   SIZE GUIDE
───────────────────────────────────────────── */
function renderSizeGuide() {
  const root = document.querySelector('.view');
  const content = `
    <section id="is-0" style="scroll-margin-top:calc(var(--header-h) + 1.5rem)">
      <h2>${infoSecIcon('📏')} How to Measure</h2>
      <p>For the best fit, use a soft measuring tape. Measure snugly but not tightly. All measurements below are in centimeters and inches.</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin:1.25rem 0">
        ${[
          ['Wrist', 'Wrap the tape around your wrist just above the wrist bone.'],
          ['Head Circumference', 'Measure around the fullest part of your head, just above the ears.'],
          ['Neck', 'Wrap tape around the base of your neck where a collar sits.'],
          ['Chest', 'Measure around the fullest part of your chest, keeping tape level.'],
        ].map(([name, tip]) => `
          <div style="padding:1rem;background:var(--white);border:1px solid var(--gray-200);border-radius:var(--radius)">
            <h4 style="font-size:.9rem;font-weight:700;color:var(--primary);margin-bottom:.4rem">${name}</h4>
            <p style="font-size:.82rem;color:var(--gray-600);margin:0;line-height:1.6">${tip}</p>
          </div>`).join('')}
      </div>
    </section>
    <section id="is-1" style="scroll-margin-top:calc(var(--header-h) + 1.5rem)">
      <h2>${infoSecIcon('⌚')} Smartwatch Band Sizes</h2>
      <p>FitPro X3 and all Elevo smartwatches use standard quick-release bands. Find your wrist size below:</p>
      <table class="size-table">
        <thead><tr><th>Size</th><th>Wrist Circumference</th><th>Band Width</th><th>Fits</th></tr></thead>
        <tbody>
          <tr><td>XS</td><td>13–15 cm / 5.1–5.9"</td><td>18 mm</td><td>Small wrists</td></tr>
          <tr class="highlight-row"><td>S / M</td><td>15–18 cm / 5.9–7.1"</td><td>20 mm</td><td>Most common</td></tr>
          <tr><td>L / XL</td><td>18–22 cm / 7.1–8.7"</td><td>22 mm</td><td>Larger wrists</td></tr>
        </tbody>
      </table>
      <p style="font-size:.82rem;color:var(--gray-500)">★ S/M is the default band included with all FitPro X3 orders.</p>
    </section>
    <section id="is-2" style="scroll-margin-top:calc(var(--header-h) + 1.5rem)">
      <h2>${infoSecIcon('🎧')} Headphone Headband Sizes</h2>
      <table class="size-table">
        <thead><tr><th>Head Circumference</th><th>Recommended Setting</th><th>Range</th></tr></thead>
        <tbody>
          <tr><td>Under 54 cm / 21.3"</td><td>Position 1–3</td><td>Small</td></tr>
          <tr class="highlight-row"><td>54–58 cm / 21.3–22.8"</td><td>Position 4–6</td><td>Medium (Default)</td></tr>
          <tr><td>58–62 cm / 22.8–24.4"</td><td>Position 7–9</td><td>Large</td></tr>
          <tr><td>Over 62 cm / 24.4"</td><td>Position 10</td><td>XL</td></tr>
        </tbody>
      </table>
    </section>
    <section id="is-3" style="scroll-margin-top:calc(var(--header-h) + 1.5rem)">
      <h2>${infoSecIcon('📱')} Phone Case Compatibility</h2>
      <p>Our ShieldCase MagSafe line is designed for a precise fit. Check your exact model below:</p>
      <table class="size-table">
        <thead><tr><th>Device</th><th>Case Model</th><th>MagSafe</th></tr></thead>
        <tbody>
          <tr><td>iPhone 16 Pro Max</td><td>SC-16PM</td><td>✅ Yes</td></tr>
          <tr><td>iPhone 16 Pro</td><td>SC-16P</td><td>✅ Yes</td></tr>
          <tr><td>iPhone 16 / Plus</td><td>SC-16</td><td>✅ Yes</td></tr>
          <tr><td>iPhone 15 Series</td><td>SC-15x</td><td>✅ Yes</td></tr>
          <tr><td>iPhone 14 Series</td><td>SC-14x</td><td>✅ Yes</td></tr>
          <tr><td>Samsung Galaxy S25</td><td>SC-SG25</td><td>❌ No (USB-C charging)</td></tr>
        </tbody>
      </table>
    </section>`;

  root.innerHTML = infoPageShell(
    'linear-gradient(135deg,#0f172a,#1e3a5f)',
    'Fit Guide',
    'Size Guide',
    'Find your perfect fit for every Elevo product.',
    ['How to Measure', 'Smartwatch Bands', 'Headphones', 'Phone Cases'],
    content
  );
  initInfoScroll();
}

/* ─────────────────────────────────────────────
   CAREERS
───────────────────────────────────────────── */
function renderCareers() {
  const root = document.querySelector('.view');
  const jobs = [
    { dept: 'Engineering', title: 'Senior Frontend Engineer', location: 'New York, NY', type: 'Full-Time', remote: true, desc: 'Build and maintain our customer-facing storefront and internal tools using React, TypeScript, and modern web standards.' },
    { dept: 'Engineering', title: 'Backend Engineer — Payments', location: 'Remote', type: 'Full-Time', remote: true, desc: 'Own our payments infrastructure: Stripe integration, fraud prevention, and transaction reconciliation at scale.' },
    { dept: 'Design', title: 'Product Designer', location: 'New York, NY', type: 'Full-Time', remote: false, desc: 'Shape the Elevo product experience from research to high-fidelity prototypes. You\'ll own end-to-end design for our checkout flow.' },
    { dept: 'Marketing', title: 'Performance Marketing Manager', location: 'Remote', type: 'Full-Time', remote: true, desc: 'Drive customer acquisition through paid social, Google Ads, and affiliate channels. Own a 7-figure monthly budget.' },
    { dept: 'Operations', title: 'Supply Chain Analyst', location: 'New York, NY', type: 'Full-Time', remote: false, desc: 'Manage vendor relationships, inventory forecasting, and logistics optimization across our global supplier network.' },
    { dept: 'Customer Success', title: 'Customer Experience Lead', location: 'Remote', type: 'Full-Time', remote: true, desc: 'Lead a team of 8 support specialists, design escalation processes, and drive our CSAT toward 98%.' },
    { dept: 'Engineering', title: 'iOS Engineer', location: 'Remote', type: 'Full-Time', remote: true, desc: 'Build the Elevo iOS app from the ground up — companion app for FitPro and AirGlide products.' },
    { dept: 'Data', title: 'Data Scientist', location: 'New York, NY', type: 'Full-Time', remote: false, desc: 'Build recommendation models, analyze conversion funnels, and provide data-driven insights to product and marketing.' },
  ];

  const depts = [...new Set(jobs.map(j => j.dept))];
  const perks = ['🏠 Remote-first culture', '🏥 Full health, dental & vision', '💰 Competitive equity packages', '📚 $2,000 annual learning budget', '🏋️ Gym & wellness stipend', '✈️ Annual company retreat', '🍼 Generous parental leave', '🌍 Work from anywhere (up to 3 months/yr)'];

  root.innerHTML = `
    <div class="info-hero" style="background:linear-gradient(135deg,#0f172a,#1e3a5f);color:#fff;text-align:center">
      <div class="container">
        <div class="section-label" style="color:rgba(255,255,255,.5);margin-bottom:.75rem">We're hiring</div>
        <h1 style="font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;margin-bottom:.65rem">Join the Elevo Team</h1>
        <p style="color:rgba(255,255,255,.65);max-width:500px;margin:0 auto">Help us build the world's best tech shopping experience. ${jobs.length} open roles across ${depts.length} teams.</p>
      </div>
    </div>
    <div class="container info-page">

      <!-- Perks -->
      <section style="margin-bottom:3rem">
        <div class="section-header"><div class="section-label">Why Elevo</div><h2 class="section-title">Perks & Benefits</h2></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:.75rem">
          ${perks.map(p => `
            <div style="padding:.9rem 1rem;background:var(--white);border:1px solid var(--gray-200);border-radius:var(--radius);font-size:.9rem;font-weight:500;color:var(--dark)">${p}</div>`).join('')}
        </div>
      </section>

      <!-- Job listings -->
      <section>
        <div class="flex items-center justify-between mb-2" style="margin-bottom:1.5rem;flex-wrap:wrap;gap:1rem">
          <div><div class="section-label">Open Positions</div><h2 class="section-title" style="margin-bottom:0">${jobs.length} Roles</h2></div>
          <div style="display:flex;gap:.5rem;flex-wrap:wrap">
            ${depts.map(d => `<button class="filter-tag" style="cursor:pointer;font-size:.8rem" onclick="filterJobs('${d}',this)">${d}</button>`).join('')}
            <button class="filter-tag" style="cursor:pointer;background:var(--gray-100);color:var(--gray-600)" onclick="filterJobs('',this)">All</button>
          </div>
        </div>
        <div class="jobs-grid" id="jobs-grid">
          ${jobs.map((j) => `
            <div class="job-card" data-dept="${j.dept}">
              <div class="job-header">
                <div>
                  <div class="job-dept">${j.dept}</div>
                  <div class="job-title">${j.title}</div>
                </div>
                <button class="btn btn-primary btn-sm" onclick="Toast.show('Application form opening...','info')">Apply Now</button>
              </div>
              <p style="font-size:.88rem;color:var(--gray-600);margin:0;line-height:1.6">${j.desc}</p>
              <div class="job-tags">
                <span class="job-tag">📍 ${j.location}</span>
                <span class="job-tag fulltime">${j.type}</span>
                ${j.remote ? '<span class="job-tag remote">Remote OK</span>' : ''}
              </div>
            </div>`).join('')}
        </div>
      </section>
    </div>`;
}

function filterJobs(dept) {
  document.querySelectorAll('.job-card').forEach(card => {
    card.style.display = (!dept || card.dataset.dept === dept) ? '' : 'none';
  });
}

/* ─────────────────────────────────────────────
   PRESS
───────────────────────────────────────────── */
function renderPress() {
  const root = document.querySelector('.view');
  const coverage = [
    { source: 'TechCrunch', headline: '"Elevo is quietly becoming the go-to destination for discerning tech buyers"', date: 'March 2026', icon: '🟢' },
    { source: 'Wired', headline: '"The Elevo ProSound headphones beat every rival at half the price"', date: 'February 2026', icon: '⚫' },
    { source: 'The Verge', headline: '"FitPro X3 review: The best smartwatch nobody\'s talking about"', date: 'January 2026', icon: '🔴' },
    { source: 'CNET', headline: '"Editors\' Choice: Elevo\'s AirGlide earbuds deliver premium sound at a mid-range price"', date: 'December 2025', icon: '🔵' },
    { source: 'Engadget', headline: '"SwiftCharge 65W Hub is the last charger you\'ll ever need"', date: 'November 2025', icon: '🟡' },
    { source: 'Forbes', headline: '"Elevo raises $40M Series B to accelerate international expansion"', date: 'October 2025', icon: '🟣' },
  ];

  root.innerHTML = `
    <div class="info-hero" style="background:linear-gradient(135deg,#0f172a,#1e3a5f);color:#fff;text-align:center">
      <div class="container">
        <div class="section-label" style="color:rgba(255,255,255,.5);margin-bottom:.75rem">Media</div>
        <h1 style="font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;margin-bottom:.65rem">Elevo in the Press</h1>
        <p style="color:rgba(255,255,255,.65)">Media inquiries: <strong>press@elevo.store</strong></p>
      </div>
    </div>
    <div class="container info-page">

      <!-- Brand Kit -->
      <section style="margin-bottom:3rem">
        <div class="section-header"><div class="section-label">Brand Assets</div><h2 class="section-title">Press Kit</h2></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.25rem">
          ${[
            ['📦', 'Brand Package', 'Logo, icons, wordmarks in SVG, PNG & PDF.', 'Download Kit'],
            ['🎨', 'Color Palette', 'Primary and secondary brand colors with hex codes.', 'Download'],
            ['✍️', 'Font Guide', 'Inter typeface usage guidelines and weights.', 'Download'],
            ['📸', 'Product Photos', 'High-res lifestyle and product photography.', 'Download (ZIP, 240 MB)'],
          ].map(([icon, title, desc, cta]) => `
            <div class="press-card">
              <div style="font-size:2rem;margin-bottom:.75rem">${icon}</div>
              <div style="font-weight:700;color:var(--dark);margin-bottom:.3rem">${title}</div>
              <p>${desc}</p>
              <button class="btn btn-secondary btn-sm btn-block" style="margin-top:.75rem" onclick="Toast.show('Downloading ${title}...','info')">${cta}</button>
            </div>`).join('')}
        </div>
      </section>

      <!-- Featured In -->
      <section style="margin-bottom:3rem">
        <div class="section-header"><div class="section-label">Featured In</div><h2 class="section-title">Media Coverage</h2></div>
        <div class="press-grid">
          ${['TechCrunch','Wired','The Verge','CNET','Engadget','Forbes','Fast Company','Bloomberg'].map(name => `
            <div class="press-card"><div class="press-logo-text">${name}</div></div>`).join('')}
        </div>
      </section>

      <!-- Articles -->
      <section>
        <div class="section-header"><div class="section-label">Recent</div><h2 class="section-title">Latest Coverage</h2></div>
        ${coverage.map(c => `
          <div class="press-coverage">
            <span style="font-size:1.5rem">${c.icon}</span>
            <div>
              <div class="press-source">${c.source}</div>
              <div class="press-headline">${c.headline}</div>
              <div class="press-date">${c.date}</div>
            </div>
          </div>`).join('')}
      </section>

      <!-- Contact -->
      <section style="margin-top:3rem;padding:2rem;background:var(--primary-light);border-radius:var(--radius-lg);text-align:center">
        <h3 style="font-size:1.2rem;font-weight:700;margin-bottom:.5rem">Media Inquiries</h3>
        <p style="color:var(--gray-600);margin-bottom:1.25rem">For interviews, product demos, or exclusive stories, reach out to our communications team.</p>
        <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-primary" onclick="Toast.show('Email copied: press@elevo.store','success')">📧 press@elevo.store</button>
          <button class="btn btn-secondary">📞 Schedule a Call</button>
        </div>
      </section>
    </div>`;
}

/* ─────────────────────────────────────────────
   TERMS OF SERVICE
───────────────────────────────────────────── */
function renderTerms() {
  const root = document.querySelector('.view');
  const sections = [
    'Acceptance of Terms', 'Use of the Service', 'Account Registration',
    'Purchases & Payments', 'Intellectual Property', 'Prohibited Conduct',
    'Disclaimer of Warranties', 'Limitation of Liability', 'Governing Law', 'Contact'
  ];

  const termsContent = [
    `By accessing and using the Elevo Store website and services, you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services. We reserve the right to update these terms at any time; your continued use constitutes acceptance of the revised terms.`,
    `You may use our services only for lawful purposes and in accordance with these Terms. You agree not to use the service: in any way that violates applicable law; to transmit unsolicited commercial communications; to impersonate any person or entity; or to interfere with the proper working of the platform.`,
    `To access certain features you must create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account. You must notify us immediately of any unauthorized use. We reserve the right to terminate accounts that violate these Terms.`,
    `All prices are in USD. We reserve the right to change prices without notice. Payment is due at the time of purchase. We accept major credit cards, PayPal, Apple Pay, and cryptocurrency. By providing payment information you represent that you are authorized to use the payment method and authorize us to charge the amount due.`,
    `All content on this site — including text, graphics, logos, product images, and software — is the property of Elevo Store or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.`,
    `You agree not to: scrape or spider our website; attempt to gain unauthorized access to any portion of the site; use automated tools to make purchases; post false reviews; or engage in any activity that could harm other users or the integrity of the platform.`,
    `THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE ERROR-FREE OR UNINTERRUPTED.`,
    `TO THE MAXIMUM EXTENT PERMITTED BY LAW, ELEVO STORE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, ARISING OUT OF OR RELATING TO YOUR USE OF THE SERVICE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID IN THE 12 MONTHS PRECEDING THE CLAIM.`,
    `These Terms shall be governed by and construed in accordance with the laws of the State of New York, United States, without regard to its conflict of law provisions. Any disputes shall be resolved through binding arbitration in New York County, NY, except that either party may seek injunctive relief in court for intellectual property infringement.`,
    `For questions about these Terms of Service, contact us at: <strong>legal@elevo.store</strong> · 123 Commerce Ave, Suite 400, New York, NY 10001. For urgent legal matters: +1 (800) ELEVO-01.`
  ];

  const icons = ['📜','🖥️','👤','💳','©️','🚫','⚠️','⚖️','🏛️','📞'];

  const content = sections.map((title, i) => `
    <section id="is-${i}" style="scroll-margin-top:calc(var(--header-h) + 1.5rem)">
      <h2>${infoSecIcon(icons[i])} ${title}</h2>
      <p>${termsContent[i]}</p>
    </section>`).join('');

  root.innerHTML = infoPageShell(
    'linear-gradient(135deg,#0f172a,#1e3a5f)',
    'Legal',
    'Terms of Service',
    `Last updated: April 5, 2026 · Please read these terms carefully before using Elevo Store.`,
    sections,
    content
  );
  initInfoScroll();
}

/* ─────────────────────────────────────────────
   CONTACT PAGE
───────────────────────────────────────────── */
function renderContact() {
  const root = document.querySelector('.view');
  root.innerHTML = `
    <div class="info-hero" style="background:linear-gradient(135deg,#0f172a,#1e3a5f);color:#fff;text-align:center">
      <div class="container">
        <div class="section-label" style="color:rgba(255,255,255,.5);margin-bottom:.75rem">Get in touch</div>
        <h1 style="font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;margin-bottom:.65rem">Contact Us</h1>
        <p style="color:rgba(255,255,255,.65);max-width:480px;margin:0 auto">We're here to help — reach out any time and we'll get back to you within 2 business hours.</p>
      </div>
    </div>

    <div class="container info-page">
      <!-- Contact channels -->
      <div class="contact-cards-grid" style="margin-bottom:3rem">
        ${[
          ['💬','Live Chat','Start an instant conversation','Available 24 / 7','onclick="Toast.show(\'Opening live chat…\',\'info\')"'],
          ['📧','Email','support@elevo.store','Reply within 2 h on business days',''],
          ['📞','Phone','+1 (800) ELEVO-01','Mon – Fri, 9 AM – 8 PM ET',''],
          ['📍','Visit Us','123 Commerce Ave, Suite 400','New York, NY 10001',''],
        ].map(([icon,title,line1,line2,action]) => `
          <div class="contact-card" style="cursor:pointer;flex-direction:column;text-align:center;padding:1.75rem 1.25rem" ${action}>
            <div class="cc-icon" style="margin:0 auto 1rem;width:56px;height:56px;font-size:1.6rem">${icon}</div>
            <h4 style="font-size:1rem;font-weight:700;color:var(--dark);margin-bottom:.35rem">${title}</h4>
            <p style="font-size:.9rem;font-weight:600;color:var(--gray-700);margin:0">${line1}</p>
            <p style="font-size:.78rem;color:var(--gray-400);margin:.2rem 0 0">${line2}</p>
          </div>`).join('')}
      </div>

      <!-- Contact form + map side by side -->
      <div style="display:grid;grid-template-columns:1fr 420px;gap:2rem;align-items:start">

        <!-- Form -->
        <div style="background:var(--white);border:1px solid var(--gray-200);border-radius:var(--radius-lg);padding:2rem">
          <h2 style="font-size:1.2rem;font-weight:800;margin-bottom:.35rem">Send us a message</h2>
          <p style="font-size:.88rem;color:var(--gray-500);margin-bottom:1.5rem">Fill in the form and our team will respond within 2 business hours.</p>

          <div class="form-row">
            <div class="form-group"><label>First Name *</label><input type="text" placeholder="John" /></div>
            <div class="form-group"><label>Last Name *</label><input type="text" placeholder="Doe" /></div>
          </div>
          <div class="form-group"><label>Email Address *</label><input type="email" placeholder="john@example.com" /></div>
          <div class="form-group"><label>Order ID <span style="color:var(--gray-400);font-weight:400">(optional)</span></label><input type="text" placeholder="#ORD-0000" /></div>
          <div class="form-group"><label>Subject *</label>
            <select>
              <option value="">Select a topic…</option>
              <option>Order Status / Tracking</option>
              <option>Returns &amp; Refunds</option>
              <option>Product Question</option>
              <option>Technical Support</option>
              <option>Billing &amp; Payments</option>
              <option>Partnership / Press</option>
              <option>Other</option>
            </select>
          </div>
          <div class="form-group"><label>Message *</label><textarea rows="5" placeholder="Describe your issue or question in detail…"></textarea></div>
          <div style="margin-bottom:1.25rem">
            <label style="display:flex;align-items:center;gap:.6rem;font-size:.85rem;color:var(--gray-600);cursor:pointer">
              <input type="checkbox" style="accent-color:var(--primary)">
              I agree to the <a onclick="navigate('privacy')" style="color:var(--primary);cursor:pointer">Privacy Policy</a>
            </label>
          </div>
          <button class="btn btn-primary btn-block btn-lg" onclick="submitContact()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Send Message
          </button>
        </div>

        <!-- Info sidebar -->
        <div style="display:flex;flex-direction:column;gap:1.25rem">
          <!-- Hours card -->
          <div style="background:var(--white);border:1px solid var(--gray-200);border-radius:var(--radius);padding:1.5rem">
            <h3 style="font-size:1rem;font-weight:700;margin-bottom:1rem;display:flex;align-items:center;gap:.5rem">
              🕒 Business Hours
            </h3>
            ${[
              ['Monday – Friday','9:00 AM – 8:00 PM ET',true],
              ['Saturday','10:00 AM – 6:00 PM ET',true],
              ['Sunday','12:00 PM – 5:00 PM ET',false],
            ].map(([day,hrs,open]) => `
              <div style="display:flex;justify-content:space-between;align-items:center;padding:.5rem 0;border-bottom:1px solid var(--gray-100);font-size:.88rem">
                <span style="color:var(--gray-700)">${day}</span>
                <span style="color:${open?'var(--success)':'var(--gray-400)'};font-weight:600">${hrs}</span>
              </div>`).join('')}
            <p style="font-size:.78rem;color:var(--gray-400);margin:.75rem 0 0">Live chat is available 24 / 7 even outside these hours.</p>
          </div>

          <!-- Response time card -->
          <div style="background:var(--primary-light);border:1px solid rgba(59,130,246,.2);border-radius:var(--radius);padding:1.5rem">
            <h3 style="font-size:.95rem;font-weight:700;color:var(--primary-dark);margin-bottom:.75rem">⚡ Avg Response Times</h3>
            ${[['Live Chat','&lt; 2 minutes'],['Email','&lt; 2 hours'],['Phone','Immediate']].map(([ch,t]) => `
              <div style="display:flex;justify-content:space-between;font-size:.85rem;padding:.35rem 0;border-bottom:1px solid rgba(59,130,246,.15)">
                <span style="color:var(--gray-700)">${ch}</span>
                <strong style="color:var(--primary)">${t}</strong>
              </div>`).join('')}
          </div>

          <!-- FAQ shortcut -->
          <div style="background:var(--white);border:1px solid var(--gray-200);border-radius:var(--radius);padding:1.5rem;text-align:center">
            <div style="font-size:2rem;margin-bottom:.5rem">🔍</div>
            <h4 style="font-weight:700;margin-bottom:.35rem">Check our Help Center</h4>
            <p style="font-size:.82rem;color:var(--gray-500);margin-bottom:1rem">Find instant answers to the most common questions.</p>
            <button class="btn btn-secondary btn-block btn-sm" onclick="navigate('help')">Browse FAQs →</button>
          </div>
        </div>
      </div>

      <!-- Map placeholder -->
      <div style="margin-top:2.5rem;background:var(--gray-100);border:1px solid var(--gray-200);border-radius:var(--radius-lg);height:260px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:.75rem;color:var(--gray-400)">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        <span style="font-size:.9rem;font-weight:500">123 Commerce Ave, Suite 400 · New York, NY 10001</span>
        <span style="font-size:.78rem">Map embed would appear here in production</span>
      </div>
    </div>`;
}

function submitContact() {
  Toast.show('Message sent! We\'ll get back to you within 2 hours.', 'success', 4000);
}

/* ─────────────────────────────────────────────
   SEARCH
───────────────────────────────────────────── */
function toggleSearch() {
  const overlay = document.getElementById('search-overlay');
  overlay.classList.toggle('open');
  if (overlay.classList.contains('open')) {
    document.getElementById('search-input').focus();
    document.getElementById('search-results').innerHTML = '';
  }
}
function liveSearch(query) {
  const container = document.getElementById('search-results');
  if (!query.trim()) { container.innerHTML = ''; return; }
  const results = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.tags.some(t => t.includes(query.toLowerCase()))
  ).slice(0, 6);
  if (results.length === 0) {
    container.innerHTML = `<div style="padding:1.5rem;text-align:center;color:var(--gray-400)">No results for "${query}"</div>`;
    return;
  }
  container.innerHTML = `<div class="container">` +
    results.map(p => `
      <div class="search-result-item" onclick="toggleSearch();openProductModal(${p.id})">
        <div class="sri-img">${getProductSVG(p)}</div>
        <div class="sri-info">
          <h5>${p.name}</h5>
          <p>${p.category}</p>
        </div>
        <div class="sri-price">$${p.price.toFixed(2)}</div>
      </div>`).join('') + `</div>`;
}

/* ─────────────────────────────────────────────
   ACCOUNT MENU
───────────────────────────────────────────── */
function toggleAccountMenu() {
  const menu = document.getElementById('account-menu');
  menu.classList.toggle('open');
  renderAccountMenu();
  document.addEventListener('click', closeMenuOnOutsideClick, { once: true });
}
function closeAccountMenu() {
  document.getElementById('account-menu')?.classList.remove('open');
}
function closeMenuOnOutsideClick(e) {
  if (!document.getElementById('account-menu')?.contains(e.target)) closeAccountMenu();
}
function renderAccountMenu() {
  const el = document.getElementById('account-menu-content');
  if (!el) return;
  if (AuthService.isLoggedIn) {
    el.innerHTML = `
      <div style="padding:.75rem 1.25rem;border-bottom:1px solid var(--gray-100)">
        <div style="font-weight:700;font-size:.9rem">${AuthService.user.name}</div>
        <div style="font-size:.78rem;color:var(--gray-400)">${AuthService.user.email}</div>
      </div>
      <a onclick="navigate('wishlist');closeAccountMenu()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> Wishlist</a>
      <a onclick="navigate('cart');closeAccountMenu()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> My Orders</a>
      <div class="am-divider"></div>
      <button class="am-item" onclick="AuthService.logout();renderAccountMenu();Toast.show('Signed out','info');closeAccountMenu()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Sign Out
      </button>`;
  } else {
    el.innerHTML = `
      <div style="padding:1.25rem">
        <button class="btn btn-primary btn-block btn-sm" onclick="quickLogin()">Sign In</button>
        <div style="text-align:center;font-size:.78rem;color:var(--gray-400);margin:.5rem 0">or</div>
        <button class="btn btn-secondary btn-block btn-sm" onclick="quickLogin()">Create Account</button>
      </div>
      <div class="am-divider"></div>
      <a onclick="navigate('wishlist');closeAccountMenu()">Wishlist</a>`;
  }
}
function quickLogin() {
  AuthService.login('Demo User', 'demo@elevo.store');
  renderAccountMenu();
  Toast.show('Welcome back, Demo User! 👋', 'success');
}

/* ─────────────────────────────────────────────
   MOBILE NAV
───────────────────────────────────────────── */
function toggleMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const btn = document.getElementById('hamburger');
  const isOpen = drawer.classList.toggle('open');
  overlay.classList.toggle('open', isOpen);
  btn.classList.toggle('open', isOpen);
  isOpen ? lockScroll() : unlockScroll();
}

/* ─────────────────────────────────────────────
   CONFIRM MODAL
───────────────────────────────────────────── */
function closeConfirmModal(e) {
  if (e.target === document.getElementById('confirm-modal')) {
    document.getElementById('confirm-modal').classList.remove('open');
  }
}

/* ─────────────────────────────────────────────
   SCROLL BEHAVIOR
───────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('site-header')?.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* ─────────────────────────────────────────────
   KEYBOARD SHORTCUTS
───────────────────────────────────────────── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('product-modal').classList.remove('open');
    document.getElementById('confirm-modal').classList.remove('open');
    document.getElementById('search-overlay').classList.remove('open');
    document.getElementById('account-menu').classList.remove('open');
    unlockScroll();
    document.getElementById('hamburger').classList.remove('open');
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    toggleSearch();
  }
});

/* ─────────────────────────────────────────────
   SCROLL LOCK (no layout shift)
───────────────────────────────────────────── */
function lockScroll() {
  const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = scrollbarW + 'px';
  document.getElementById('site-header').style.paddingRight = scrollbarW + 'px';
}
function unlockScroll() {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
  const header = document.getElementById('site-header');
  if (header) header.style.paddingRight = '';
}

/* ─────────────────────────────────────────────
   INIT
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  CartService.updateBadge();
  renderAccountMenu();

  // Handle hash routing — only fires for #/ prefixed routes, never for anchor fragments
  function routeFromHash() {
    const hash = window.location.hash;
    if (hash && !hash.startsWith('#/')) return;   // ignore #ps-N, #is-N etc.
    const route = (hash.replace('#/', '') || 'home').split('/')[0];
    const validRoutes = Object.keys(Router.routes);
    Router.go(validRoutes.includes(route) ? route : 'home');
  }
  window.addEventListener('hashchange', routeFromHash);
  routeFromHash();
});
