// Confirmed E-Ticket & Digital Boarding Pass Modal
import confetti from 'canvas-confetti';
import { formatCurrency, showToast } from '../utils/helpers.js';
import { openLiveTrackModal } from './liveTrackModal.js';

export function openTicketModal(booking, bus) {
  // Trigger celebratory confetti burst!
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });

  const existing = document.getElementById('ticket-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'ticket-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-dialog" style="max-width: 650px;">
      <div class="modal-header" style="background: var(--bg-tint);">
        <div class="modal-title-wrap">
          <div style="font-size: 26px;">🎉</div>
          <div>
            <h3 class="modal-title" style="color: var(--accent-green);">Booking Confirmed!</h3>
            <p style="font-size: 12px; color: var(--text-muted);">Your digital boarding pass has been issued.</p>
          </div>
        </div>
        <button class="modal-close-btn" id="close-ticket-modal">&times;</button>
      </div>

      <div class="modal-body" style="padding: 20px;">
        <div class="ticket-pass-card" id="printable-ticket">
          <div class="ticket-pass-header">
            <div>
              <div style="font-size: 18px; font-weight: 800; letter-spacing: -0.5px;">SHUANA BUS</div>
              <div style="font-size: 11px; opacity: 0.9; text-transform: uppercase;">Zingbus Experience Network</div>
            </div>
            <div class="ticket-pnr-wrap">
              <span class="ticket-pnr-label">PNR NUMBER</span>
              <span class="ticket-pnr-val">${booking.pnr}</span>
            </div>
          </div>

          <div class="ticket-body-grid">
            <div>
              <div class="ticket-journey-route">
                <div class="ticket-city-block">
                  <span class="ticket-city-name">${booking.fromCity}</span>
                  <span class="ticket-city-time">${booking.departureTime}</span>
                </div>
                <div class="ticket-plane-arrow">➔</div>
                <div class="ticket-city-block" style="text-align: right;">
                  <span class="ticket-city-name">${booking.toCity}</span>
                  <span class="ticket-city-time">${booking.arrivalTime}</span>
                </div>
              </div>

              <div class="ticket-meta-grid">
                <div class="ticket-meta-item">
                  <span class="ticket-meta-label">BUS SERVICE</span>
                  <span class="ticket-meta-value">${booking.busName}</span>
                </div>
                <div class="ticket-meta-item">
                  <span class="ticket-meta-label">SEAT NO(S)</span>
                  <span class="ticket-meta-value" style="color: var(--accent-green); font-size: 15px;">${booking.seatIds.join(', ')}</span>
                </div>
                <div class="ticket-meta-item">
                  <span class="ticket-meta-label">PRIMARY PASSENGER</span>
                  <span class="ticket-meta-value">${booking.passenger.name} (${booking.passenger.gender}, ${booking.passenger.age}y)</span>
                </div>
                <div class="ticket-meta-item">
                  <span class="ticket-meta-label">TRAVEL DATE</span>
                  <span class="ticket-meta-value">${booking.travelDate}</span>
                </div>
                <div class="ticket-meta-item">
                  <span class="ticket-meta-label">BOARDING POINT</span>
                  <span class="ticket-meta-value" style="font-size: 12px;">${booking.boardingPoint.name}</span>
                </div>
                <div class="ticket-meta-item">
                  <span class="ticket-meta-label">DROPPING POINT</span>
                  <span class="ticket-meta-value" style="font-size: 12px;">${booking.droppingPoint.name}</span>
                </div>
                <div class="ticket-meta-item">
                  <span class="ticket-meta-label">PAYMENT REF</span>
                  <span class="ticket-meta-value" style="font-family: monospace; font-size: 11px;">${booking.payment.paymentId}</span>
                </div>
                <div class="ticket-meta-item">
                  <span class="ticket-meta-label">TOTAL FARE PAID</span>
                  <span class="ticket-meta-value" style="color: var(--accent-green); font-size: 15px;">${formatCurrency(booking.totalAmount)}</span>
                </div>
              </div>
            </div>

            <!-- QR Code Section -->
            <div class="ticket-qr-block">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SHUANA-PNR-${booking.pnr}-SEATS-${booking.seatIds.join('-')}" alt="Boarding Pass QR" class="ticket-qr-img" />
              <div class="ticket-qr-caption">Scan to Board Bus</div>
              <div style="font-size: 9px; color: var(--text-muted); text-align: center; margin-top: 4px;">Valid Govt ID required during boarding</div>
            </div>
          </div>

          <div class="ticket-footer-actions">
            <div style="font-size: 12px; color: var(--text-muted); display: flex; align-items: center; gap: 6px;">
              <span>🛡️ 24x7 Shuana Assistance: 1800-102-9900</span>
            </div>
            <div style="display: flex; gap: 8px;">
              <button class="btn-secondary-nav" id="btn-share-whatsapp" style="font-size: 12px; padding: 6px 12px;">
                <span>💬 WhatsApp</span>
              </button>
              <button class="btn-secondary-nav" id="btn-print-ticket" style="font-size: 12px; padding: 6px 12px;">
                <span>🖨️ Print / PDF</span>
              </button>
              ${bus ? `
                <button class="btn-pill-action" id="btn-track-from-ticket" style="font-size: 12px; padding: 6px 14px;">
                  <span>📍 Live Track</span>
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('#close-ticket-modal').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  // Print button
  modal.querySelector('#btn-print-ticket').addEventListener('click', () => {
    window.print();
  });

  // WhatsApp share
  modal.querySelector('#btn-share-whatsapp').addEventListener('click', () => {
    showToast(`Boarding Pass link sent to WhatsApp +91 ${booking.passenger.phone || 'registered number'}!`, 'success');
  });

  // Live Track button
  const trackBtn = modal.querySelector('#btn-track-from-ticket');
  if (trackBtn && bus) {
    trackBtn.addEventListener('click', () => {
      openLiveTrackModal(bus);
    });
  }
}
