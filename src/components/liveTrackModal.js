// Live Bus GPS Radar & Location Tracker Modal

export function openLiveTrackModal(bus) {
  const existing = document.getElementById('live-track-modal');
  if (existing) existing.remove();

  const driver = bus.driverInfo || {
    name: 'Captain Jagdeep Singh',
    experience: '10 Years Pro Driver',
    contact: '+91 98765 00000',
    vehicleNo: 'DL 01 AB 9988',
    currentLocation: 'Midway Highway (NH44)',
    speed: '72 km/h'
  };

  const modal = document.createElement('div');
  modal.id = 'live-track-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-header">
        <div class="modal-title-wrap">
          <div class="perk-icon-wrap" style="background: rgba(0, 153, 51, 0.15); color: var(--accent-green);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
          </div>
          <div>
            <h3 class="modal-title">Live Highway Bus Radar</h3>
            <p style="font-size: 12px; color: var(--text-muted);">Real-time GPS Tracking for ${bus.name}</p>
          </div>
        </div>
        <button class="modal-close-btn" id="close-radar-modal">&times;</button>
      </div>

      <div class="modal-body">
        <!-- Live Animated Highway Visualizer -->
        <div class="radar-map-container">
          <div class="radar-grid-bg"></div>
          <div class="radar-road-line"></div>
          <div class="radar-bus-marker">
            <span>🚌</span>
            <span>${driver.vehicleNo}</span>
          </div>
        </div>

        <div class="radar-telemetry-grid">
          <div class="telemetry-card">
            <span class="telemetry-label">Current Highway Location</span>
            <span class="telemetry-val" style="color: var(--accent-green);">📍 ${driver.currentLocation}</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Speed & Telemetry</span>
            <span class="telemetry-val" style="color: var(--accent-purple);">⚡ ${driver.speed}</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">On-Time Status</span>
            <span class="telemetry-val" style="color: #009933;">🛡️ Exactly On Schedule</span>
          </div>
        </div>

        <!-- Driver / Captain Profile Card -->
        <div style="margin-top: 18px; background: var(--bg-subtle); border-radius: 12px; padding: 16px; border: 1px solid var(--border-neutral); display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="width: 44px; height: 44px; border-radius: 50%; background: #fff; border: 2px solid var(--accent-green); display: flex; align-items: center; justify-content: center; font-size: 20px;">
              👨‍✈️
            </div>
            <div>
              <div style="font-size: 14px; font-weight: 700; color: var(--text-primary);">${driver.name}</div>
              <div style="font-size: 12px; color: var(--text-muted);">${driver.experience} • Verified Bus Captain</div>
            </div>
          </div>
          <a href="tel:${driver.contact}" class="btn-pill-action" style="padding: 8px 16px; font-size: 12px; text-decoration: none;">
            <span>📞 Call Captain</span>
          </a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('#close-radar-modal').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}
