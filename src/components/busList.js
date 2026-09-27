// RedBus Style Bus Cards List with instant redirection to the dedicated Bus Details page
import { formatCurrency } from '../utils/helpers.js';

export function renderBusList(container, buses, searchParams, { onSelectBus }) {
  if (!buses || buses.length === 0) {
    container.innerHTML = `
      <div style="background: #fff; border: 1px solid var(--rb-border); border-radius: 8px; padding: 48px 20px; text-align: center;">
        <div style="font-size: 40px; margin-bottom: 12px;">🚌</div>
        <h3 style="font-size: 18px; font-weight: 700; color: var(--rb-text-primary); margin-bottom: 6px;">No buses found on this route</h3>
        <p style="font-size: 13px; color: var(--rb-text-muted);">Try changing the date or searching popular corridors like CIDCO ➔ Pune or Delhi ➔ Manali.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="results-page-wrap">
      <div class="results-meta-bar">
        <div class="meta-route-title">
          <span>${buses.length} Buses</span> available for <strong>${searchParams.from} ➔ ${searchParams.to}</strong> on ${searchParams.date}
        </div>
        <div style="font-size: 13px; color: var(--rb-text-muted);">
          All buses verified with Live Tracking & On-Time Guarantee
        </div>
      </div>

      <div class="bus-cards-stack">
        ${buses.map(bus => `
          <div class="rb-bus-card" data-bus-id="${bus.id}" title="Click to view bus information and select seats">
            <div class="bus-card-top">
              <div>
                <h3 class="bus-operator-name">${bus.operator}</h3>
                <div class="bus-model-sub">${bus.busType}</div>
              </div>
              <div class="bus-rating-pill">
                <span>★ ${bus.rating}</span>
                <span style="font-weight: 500; font-size: 11px;">(${bus.reviewsCount})</span>
              </div>
            </div>

            <div class="bus-card-mid">
              <div class="timeline-flex">
                <div class="time-point">
                  <span class="time-val">${bus.departureTime}</span>
                  <span class="place-val">${searchParams.from}</span>
                </div>

                <div class="duration-bracket">
                  <span class="duration-val">${bus.duration}</span>
                  <div class="duration-line-rb"></div>
                  <span style="font-size: 10px; color: var(--rb-text-muted);">${bus.nextDay ? 'Next Day Arrival' : 'Same Day'}</span>
                </div>

                <div class="time-point">
                  <span class="time-val">${bus.arrivalTime}</span>
                  <span class="place-val">${searchParams.to}</span>
                </div>
              </div>

              <div class="price-cta-col">
                <span class="price-starting">Starting from</span>
                <div class="price-large">${formatCurrency(bus.startingPrice || bus.price || 981)}</div>
                <button class="btn-view-bus" data-bus-id="${bus.id}">
                  <span>View Seats & Details ➔</span>
                </button>
              </div>
            </div>

            <div class="bus-card-bottom">
              <div class="amenities-icons">
                <span>⚡ Free WiFi</span>
                <span>•</span>
                <span>🔌 USB Charging</span>
                <span>•</span>
                <span>🧻 Sanitized Berths</span>
                <span>•</span>
                <span>🛡️ CCTV & Safety</span>
              </div>
              <div class="click-hint">
                👉 Click bus to open deck & details
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Attach card click handlers to redirect to dedicated bus details page
  container.querySelectorAll('.rb-bus-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const busId = card.dataset.busId;
      const target = buses.find(b => b.id === busId);
      if (target) {
        onSelectBus && onSelectBus(target);
      }
    });
  });
}
