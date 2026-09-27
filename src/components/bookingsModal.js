// My Bookings Drawer/Modal
import { getSavedBookings, formatCurrency } from '../utils/helpers.js';
import { openTicketModal } from './ticketModal.js';

export function openBookingsModal() {
  const existing = document.getElementById('my-bookings-modal');
  if (existing) existing.remove();

  const bookings = getSavedBookings();

  const modal = document.createElement('div');
  modal.id = 'my-bookings-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-dialog" style="max-width: 600px;">
      <div class="modal-header">
        <div class="modal-title-wrap">
          <div class="perk-icon-wrap" style="background: var(--bg-tint); color: var(--accent-green);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <div>
            <h3 class="modal-title">My Bookings & Tickets</h3>
            <p style="font-size: 12px; color: var(--text-muted);">${bookings.length} Confirmed Trip(s) Found</p>
          </div>
        </div>
        <button class="modal-close-btn" id="close-bookings-modal">&times;</button>
      </div>

      <div class="modal-body">
        ${bookings.length === 0 ? `
          <div style="text-align: center; padding: 40px 20px;">
            <div style="font-size: 48px; margin-bottom: 12px;">🎫</div>
            <h4 style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">No bookings found yet</h4>
            <p style="font-size: 13px; color: var(--text-muted); max-width: 320px; margin: 0 auto 20px;">Search buses, pick your favorite seats and pay via Razorpay to get your instant boarding pass!</p>
            <button class="btn-pill-action" id="btn-empty-book-now" style="margin: 0 auto;">Book Your First Trip</button>
          </div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 14px;">
            ${bookings.map(b => `
              <div style="background: #fff; border: 1px solid var(--border-neutral); border-radius: 12px; padding: 16px; display: flex; justify-content: space-between; align-items: center; box-shadow: var(--shadow-sm); transition: var(--transition-fast);">
                <div>
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                    <span style="font-size: 11px; font-weight: 700; background: var(--bg-tint); color: var(--accent-green); padding: 2px 8px; border-radius: 4px;">PNR: ${b.pnr}</span>
                    <span style="font-size: 11px; color: var(--text-muted);">${b.travelDate}</span>
                  </div>
                  <div style="font-size: 15px; font-weight: 800; color: var(--text-primary);">
                    ${b.fromCity} ➔ ${b.toCity}
                  </div>
                  <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
                    ${b.busName} • Seats: <strong style="color: var(--accent-green);">${b.seatIds.join(', ')}</strong>
                  </div>
                </div>

                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
                  <span style="font-size: 16px; font-weight: 800; color: var(--text-primary);">${formatCurrency(b.totalAmount)}</span>
                  <button class="btn-secondary-nav btn-view-ticket" data-pnr="${b.pnr}" style="padding: 6px 12px; font-size: 11px;">
                    View Pass
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('#close-bookings-modal').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  const emptyBtn = modal.querySelector('#btn-empty-book-now');
  if (emptyBtn) {
    emptyBtn.addEventListener('click', () => {
      modal.remove();
      window.scrollTo({ top: 300, behavior: 'smooth' });
    });
  }

  // View pass button handlers
  modal.querySelectorAll('.btn-view-ticket').forEach(btn => {
    btn.addEventListener('click', () => {
      const pnr = btn.dataset.pnr;
      const target = bookings.find(b => b.pnr === pnr);
      if (target) {
        modal.remove();
        openTicketModal(target);
      }
    });
  });
}
