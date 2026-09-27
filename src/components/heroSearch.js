// Eye-Catching Royal Violet Hero Section with Featured Goa Chyll Banner, Service Switcher, and Capsule Search
import { showToast } from '../utils/helpers.js';

export function renderHeroSearch(container, { initialFrom = 'CIDCO', initialTo = 'Pune', onSearch }) {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  let currentFrom = initialFrom;
  let currentTo = initialTo;
  let currentDate = today;

  container.innerHTML = `
    <div class="rb-hero-section">
      <!-- Background Ambient Glow -->
      <div class="hero-ambient-glow"></div>

      <div class="container hero-content-wrapper">
        <!-- 🌟 User's Featured Destination Banner (First Appearance Section) -->
        <div class="hero-featured-banner-wrap" id="featured-goa-banner" title="Click to view buses & 4D/3N holiday packages to Goa">
          <img src="/images/goa-chyll-banner.png" alt="Chyll - Explore Goa beyond the beaches (4D/3N package)" class="featured-banner-img">
          <div class="banner-overlay-action">
            <button class="btn-book-goa-pkg" id="btn-quick-goa-trip">
              <span>🌴 Explore Goa Buses (4D/3N) ➔</span>
            </button>
          </div>
        </div>

        <!-- Service Mode Switcher Tabs (Bus Tickets, redRail, Cabs) -->
        <div class="service-switcher-bar">
          <button class="service-pill-btn active" id="svc-bus">
            <span class="svc-icon">🚌</span>
            <span class="svc-text">Bus Tickets</span>
          </button>
          <button class="service-pill-btn" id="svc-train">
            <span class="svc-icon">🚆</span>
            <span class="svc-text">redRail</span>
            <span class="svc-sub-badge">₹0 Fee</span>
          </button>
          <button class="service-pill-btn" id="svc-cab">
            <span class="svc-icon">🚗</span>
            <span class="svc-text">Airport Cabs</span>
          </button>
        </div>

        <!-- Big Impact Headline in Violet Theme -->
        <div class="hero-headings">
          <h1 class="hero-headline">
            India's No. 1 Online <span class="text-accent-violet">Bus Ticket Booking</span> Site
          </h1>
          <p class="hero-subline">
            Over 3,500+ luxury AC sleeper operators, live GPS tracking, and instant Razorpay checkout.
          </p>
        </div>

        <!-- The Iconic Unified Capsule Search Bar (radius: 999px) -->
        <div class="search-capsule-card">
          <!-- Segment 1: From -->
          <div class="capsule-segment" id="seg-from">
            <div class="segment-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.7 2 11 2 11.4V16c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></svg>
            </div>
            <div class="segment-field-body">
              <label class="segment-label">FROM</label>
              <select id="hero-select-from" class="segment-select">
                <option value="CIDCO" ${currentFrom === 'CIDCO' ? 'selected' : ''}>CIDCO (Aurangabad)</option>
                <option value="Pune" ${currentFrom === 'Pune' ? 'selected' : ''}>Pune</option>
                <option value="Mumbai" ${currentFrom === 'Mumbai' ? 'selected' : ''}>Mumbai</option>
                <option value="Delhi" ${currentFrom === 'Delhi' ? 'selected' : ''}>Delhi</option>
                <option value="Manali" ${currentFrom === 'Manali' ? 'selected' : ''}>Manali</option>
                <option value="Jaipur" ${currentFrom === 'Jaipur' ? 'selected' : ''}>Jaipur</option>
                <option value="Bangalore" ${currentFrom === 'Bangalore' ? 'selected' : ''}>Bengaluru</option>
                <option value="Goa" ${currentFrom === 'Goa' ? 'selected' : ''}>Goa (Panaji)</option>
              </select>
            </div>
          </div>

          <!-- Swap Button Divider -->
          <div class="capsule-swap-wrap">
            <button class="btn-capsule-swap" id="btn-hero-swap" title="Swap From and To">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
            </button>
          </div>

          <!-- Segment 2: To -->
          <div class="capsule-segment" id="seg-to">
            <div class="segment-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="10" r="3"></circle><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path></svg>
            </div>
            <div class="segment-field-body">
              <label class="segment-label">TO</label>
              <select id="hero-select-to" class="segment-select">
                <option value="Pune" ${currentTo === 'Pune' ? 'selected' : ''}>Pune</option>
                <option value="CIDCO" ${currentTo === 'CIDCO' ? 'selected' : ''}>CIDCO (Aurangabad)</option>
                <option value="Mumbai" ${currentTo === 'Mumbai' ? 'selected' : ''}>Mumbai</option>
                <option value="Goa" ${currentTo === 'Goa' ? 'selected' : ''}>Goa (Panaji)</option>
                <option value="Delhi" ${currentTo === 'Delhi' ? 'selected' : ''}>Delhi</option>
                <option value="Manali" ${currentTo === 'Manali' ? 'selected' : ''}>Manali</option>
                <option value="Jaipur" ${currentTo === 'Jaipur' ? 'selected' : ''}>Jaipur</option>
                <option value="Bangalore" ${currentTo === 'Bangalore' ? 'selected' : ''}>Bengaluru</option>
              </select>
            </div>
          </div>

          <div class="segment-divider-line"></div>

          <!-- Segment 3: Date -->
          <div class="capsule-segment" id="seg-date">
            <div class="segment-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <div class="segment-field-body">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label class="segment-label">DATE OF JOURNEY</label>
                <div class="quick-days-toggles">
                  <span class="day-toggle-pill active" id="pill-today">Today</span>
                  <span class="day-toggle-pill" id="pill-tomorrow">Tomorrow</span>
                </div>
              </div>
              <input type="date" id="hero-input-date" class="segment-date-input" value="${currentDate}" min="${today}">
            </div>
          </div>

          <!-- Segment 4: CTA Button (Royal Violet) -->
          <div class="capsule-cta-segment">
            <button class="btn-capsule-submit" id="btn-hero-submit">
              <span>SEARCH BUSES</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
          </div>
        </div>

        <!-- Quick Corridor Route Pills -->
        <div class="corridors-pills-row">
          <span class="corridors-title">Trending Routes:</span>
          <button class="route-quick-chip active" data-from="CIDCO" data-to="Pune">
            <span>CIDCO ⇄ Pune</span>
            <span class="chip-count">8 Buses</span>
          </button>
          <button class="route-quick-chip" data-from="Mumbai" data-to="Pune">
            <span>Mumbai ⇄ Pune</span>
            <span class="chip-count">14 Buses</span>
          </button>
          <button class="route-quick-chip" data-from="Pune" data-to="Goa">
            <span>Pune ⇄ Goa</span>
            <span class="chip-count">6 Buses</span>
          </button>
          <button class="route-quick-chip" data-from="Bangalore" data-to="Goa">
            <span>Bengaluru ⇄ Goa</span>
            <span class="chip-count">5 Buses</span>
          </button>
          <button class="route-quick-chip" data-from="Delhi" data-to="Manali">
            <span>Delhi ⇄ Manali</span>
            <span class="chip-count">6 Buses</span>
          </button>
        </div>

        <!-- Eye-Catchy Trending Offers Voucher Cards -->
        <div class="trending-offers-section">
          <div class="offers-header-row">
            <h3 class="offers-title">TRENDING OFFERS</h3>
            <button class="btn-view-all-offers" id="btn-all-offers">View All (4) ➔</button>
          </div>

          <div class="offers-cards-grid">
            <div class="offer-voucher-card voucher-gradient-1">
              <div class="voucher-badge">BUS SPECIAL</div>
              <div class="voucher-info">
                <h4 class="voucher-headline">Save up to ₹250 on sleeper bus tickets</h4>
                <p class="voucher-validity">Valid till 30 Sep • Min order ₹800</p>
                <div class="voucher-coupon-copy" data-code="FIRST250">
                  <span class="coupon-code-txt">FIRST250</span>
                  <span class="copy-icon">📋 Copy</span>
                </div>
              </div>
            </div>

            <div class="offer-voucher-card voucher-gradient-2">
              <div class="voucher-badge" style="background: #3B82F6;">RAZORPAY</div>
              <div class="voucher-info">
                <h4 class="voucher-headline">Get Flat ₹150 Cashback with Razorpay UPI</h4>
                <p class="voucher-validity">Instant verification & instant ticket confirmation</p>
                <div class="voucher-coupon-copy" data-code="RZP150">
                  <span class="coupon-code-txt">RZP150</span>
                  <span class="copy-icon">📋 Copy</span>
                </div>
              </div>
            </div>

            <div class="offer-voucher-card voucher-gradient-3">
              <div class="voucher-badge" style="background: #10B981;">GOA PACKAGE</div>
              <div class="voucher-info">
                <h4 class="voucher-headline">Chyll Goa 4D/3N Special Bus Package Discount</h4>
                <p class="voucher-validity">Exclusive deals on sleeper coaches to Goa</p>
                <div class="voucher-coupon-copy" data-code="GOACHYLL">
                  <span class="coupon-code-txt">GOACHYLL</span>
                  <span class="copy-icon">📋 Copy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Live Trust Metrics Banner -->
        <div class="hero-trust-metrics-strip">
          <div class="metric-item">
            <span class="metric-icon">⭐</span>
            <div>
              <div class="metric-val">4.6 / 5</div>
              <div class="metric-label">Over 500k+ App Reviews</div>
            </div>
          </div>
          <div class="metric-divider"></div>
          <div class="metric-item">
            <span class="metric-icon">🚌</span>
            <div>
              <div class="metric-val">3,500+</div>
              <div class="metric-label">Certified Bus Operators</div>
            </div>
          </div>
          <div class="metric-divider"></div>
          <div class="metric-item">
            <span class="metric-icon">🎟️</span>
            <div>
              <div class="metric-val">220M+</div>
              <div class="metric-label">Journeys Booked</div>
            </div>
          </div>
          <div class="metric-divider"></div>
          <div class="metric-item">
            <span class="metric-icon">🛡️</span>
            <div>
              <div class="metric-val">100% Secure</div>
              <div class="metric-label">Razorpay & Bank Verified</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const fromSel = container.querySelector('#hero-select-from');
  const toSel = container.querySelector('#hero-select-to');
  const dateInput = container.querySelector('#hero-input-date');
  const swapBtn = container.querySelector('#btn-hero-swap');
  const submitBtn = container.querySelector('#btn-hero-submit');
  const pillToday = container.querySelector('#pill-today');
  const pillTomorrow = container.querySelector('#pill-tomorrow');
  const goaBanner = container.querySelector('#featured-goa-banner');
  const goaQuickBtn = container.querySelector('#btn-quick-goa-trip');

  const doSearch = () => {
    currentFrom = fromSel.value;
    currentTo = toSel.value;
    currentDate = dateInput.value;

    onSearch && onSearch({
      from: currentFrom,
      to: currentTo,
      date: currentDate
    });
  };

  // Click on Goa Banner triggers search for Goa!
  const triggerGoaSearch = () => {
    fromSel.value = 'Pune';
    toSel.value = 'Goa';
    showToast('Loaded luxury buses for Chyll Goa 4D/3N holiday package!', 'info');
    doSearch();
    const resultsSlot = document.querySelector('#bus-results-slot');
    if (resultsSlot) {
      resultsSlot.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  goaBanner.addEventListener('click', triggerGoaSearch);
  goaQuickBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    triggerGoaSearch();
  });

  // Swap animation and execution
  swapBtn.addEventListener('click', () => {
    const temp = fromSel.value;
    fromSel.value = toSel.value;
    toSel.value = temp;

    swapBtn.classList.add('swap-spinning');
    setTimeout(() => swapBtn.classList.remove('swap-spinning'), 300);

    doSearch();
  });

  // Date shortcuts
  pillToday.addEventListener('click', () => {
    dateInput.value = today;
    pillToday.classList.add('active');
    pillTomorrow.classList.remove('active');
    doSearch();
  });

  pillTomorrow.addEventListener('click', () => {
    dateInput.value = tomorrow;
    pillTomorrow.classList.add('active');
    pillToday.classList.remove('active');
    doSearch();
  });

  dateInput.addEventListener('change', () => {
    if (dateInput.value === today) {
      pillToday.classList.add('active');
      pillTomorrow.classList.remove('active');
    } else if (dateInput.value === tomorrow) {
      pillTomorrow.classList.add('active');
      pillToday.classList.remove('active');
    } else {
      pillToday.classList.remove('active');
      pillTomorrow.classList.remove('active');
    }
    doSearch();
  });

  submitBtn.addEventListener('click', () => {
    doSearch();
    const resultsSlot = document.querySelector('#bus-results-slot');
    if (resultsSlot) {
      resultsSlot.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // Route chips
  container.querySelectorAll('.route-quick-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      fromSel.value = chip.dataset.from;
      toSel.value = chip.dataset.to;
      container.querySelectorAll('.route-quick-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      doSearch();
    });
  });

  // Copy coupon codes
  container.querySelectorAll('.voucher-coupon-copy').forEach(box => {
    box.addEventListener('click', (e) => {
      e.stopPropagation();
      const code = box.dataset.code;
      navigator.clipboard?.writeText(code);
      showToast(`Promo Code ${code} copied! Use it on checkout.`, 'success');
    });
  });

  // Service switcher alerts
  container.querySelector('#svc-bus').addEventListener('click', () => {
    container.querySelectorAll('.service-pill-btn').forEach(b => b.classList.remove('active'));
    container.querySelector('#svc-bus').classList.add('active');
  });

  container.querySelector('#svc-train').addEventListener('click', () => {
    showToast('redRail train tickets feature is ready! Switch to buses anytime.', 'info');
  });

  container.querySelector('#svc-cab').addEventListener('click', () => {
    showToast('Airport cabs & car rentals booking active!', 'info');
  });

  // Initial trigger
  doSearch();
}
