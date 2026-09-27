// Modal displaying step-by-step route stops, timings, distances and halts

export function openRouteModal(bus) {
  const existing = document.getElementById('route-details-modal');
  if (existing) existing.remove();

  const stops = bus.intermediateStops || [];

  const modal = document.createElement('div');
  modal.id = 'route-details-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-header">
        <div class="modal-title-wrap">
          <div class="perk-icon-wrap" style="background: var(--bg-tint); color: var(--accent-green);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div>
            <h3 class="modal-title">Route Schedule & Timetable</h3>
            <p style="font-size: 12px; color: var(--text-muted);">${bus.name} (${bus.busType})</p>
          </div>
        </div>
        <button class="modal-close-btn" id="close-route-modal">&times;</button>
      </div>

      <div class="modal-body">
        <div style="background: var(--bg-subtle); padding: 14px 18px; border-radius: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; border: 1px solid var(--border-neutral);">
          <div>
            <span style="font-size: 11px; font-weight: 700; color: var(--accent-green); text-transform: uppercase;">Total Distance</span>
            <div style="font-size: 16px; font-weight: 800; color: var(--text-primary);">${stops[stops.length - 1]?.distance || '550 km'}</div>
          </div>
          <div>
            <span style="font-size: 11px; font-weight: 700; color: var(--accent-purple); text-transform: uppercase;">Total Duration</span>
            <div style="font-size: 16px; font-weight: 800; color: var(--text-primary);">${bus.duration}</div>
          </div>
          <div>
            <span style="font-size: 11px; font-weight: 700; color: var(--accent-orange); text-transform: uppercase;">Total Halts</span>
            <div style="font-size: 16px; font-weight: 800; color: var(--text-primary);">${stops.length} Stops</div>
          </div>
        </div>

        <div class="route-timeline-list">
          ${stops.map((stop, idx) => {
            const isStart = idx === 0;
            const isEnd = idx === stops.length - 1;
            const itemClass = isStart ? 'start' : isEnd ? 'end' : '';

            return `
              <div class="route-timeline-item ${itemClass}">
                <div class="route-point-marker"></div>
                <div class="route-content-wrap">
                  <div class="route-stop-title">${stop.stop}</div>
                  <div class="route-stop-meta">
                    <span>🕒 <strong>${stop.time}</strong></span>
                    <span>📍 <strong>${stop.distance}</strong></span>
                  </div>
                  ${stop.halt ? `<div class="route-halt-badge">⚡ ${stop.halt}</div>` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('#close-route-modal').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}
