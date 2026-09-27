// Passenger Details, Boarding/Dropping Selection, Coupon Engine, and Razorpay Checkout
import { formatCurrency, showToast, saveBooking } from '../utils/helpers.js';
import { applyCoupon, COUPONS } from '../data/coupons.js';
import { initiatePayment } from '../utils/razorpay.js';
import { openTicketModal } from './ticketModal.js';

export function openCheckoutModal({ bus, selectedSeats, travelDate, fromCity, toCity, onComplete }) {
  const existing = document.getElementById('checkout-modal');
  if (existing) existing.remove();

  // Calculate pricing
  const seatCount = selectedSeats.length;
  const baseFare = selectedSeats.reduce((acc, s) => acc + (bus.price + (s.priceAdd || 0)), 0);
  let insuranceCost = 15 * seatCount;
  let hasInsurance = true;
  let appliedCoupon = null;
  let discountAmount = 0;

  const calculateFinal = () => {
    const subtotal = baseFare + (hasInsurance ? insuranceCost : 0);
    const gst = Math.round(baseFare * 0.05); // 5% GST
    const total = Math.max(0, subtotal + gst - discountAmount);
    return { subtotal, gst, total };
  };

  const modal = document.createElement('div');
  modal.id = 'checkout-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-dialog" style="max-width: 660px;">
      <div class="modal-header">
        <div class="modal-title-wrap">
          <div class="perk-icon-wrap" style="background: var(--bg-tint); color: var(--accent-green);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
          <div>
            <h3 class="modal-title">Passenger Details & Boarding</h3>
            <p style="font-size: 12px; color: var(--text-muted);">${bus.name} • Seats: <strong>${selectedSeats.map(s => s.id).join(', ')}</strong></p>
          </div>
        </div>
        <button class="modal-close-btn" id="close-checkout-modal">&times;</button>
      </div>

      <div class="modal-body">
        <!-- Route & Time Quick Card -->
        <div style="background: var(--bg-subtle); padding: 12px 18px; border-radius: 12px; border: 1px solid var(--border-neutral); margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 11px; font-weight: 700; color: var(--accent-green); text-transform: uppercase;">Journey</div>
            <div style="font-size: 15px; font-weight: 800; color: var(--text-primary);">${fromCity} ➔ ${toCity}</div>
            <div style="font-size: 12px; color: var(--text-muted);">${travelDate} • Departs ${bus.departureTime}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 11px; font-weight: 700; color: var(--accent-purple); text-transform: uppercase;">Selected Seats (${seatCount})</div>
            <div style="font-size: 15px; font-weight: 800; color: var(--accent-green);">${selectedSeats.map(s => s.id).join(', ')}</div>
          </div>
        </div>

        <form id="checkout-passenger-form">
          <!-- Boarding & Dropping Point Pickers -->
          <div class="checkout-section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="10" r="3"></circle><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path></svg>
            Select Pickup & Drop Points
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">Boarding Point (Departure: ${bus.departureTime})</label>
              <select id="checkout-boarding-point" class="form-input" required>
                ${(bus.boardingPoints || []).map(bp => `
                  <option value="${bp.id}">${bp.time} - ${bp.name}</option>
                `).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Dropping Point (Arrival: ${bus.arrivalTime})</label>
              <select id="checkout-dropping-point" class="form-input" required>
                ${(bus.droppingPoints || []).map(dp => `
                  <option value="${dp.id}">${dp.time} - ${dp.name}</option>
                `).join('')}
              </select>
            </div>
          </div>

          <!-- Passenger Contact Information -->
          <div class="checkout-section-title" style="margin-top: 14px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            Primary Passenger Information
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" id="pass-name" class="form-input" placeholder="e.g. Parth Sarode" value="Parth Sarode" required>
            </div>
            <div class="form-group">
              <label class="form-label">Age</label>
              <input type="number" id="pass-age" class="form-input" min="5" max="100" placeholder="e.g. 24" value="24" required>
            </div>
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">Gender</label>
              <select id="pass-gender" class="form-input">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Mobile Number (For WhatsApp / SMS Ticket)</label>
              <input type="tel" id="pass-phone" class="form-input" placeholder="e.g. 9876543210" value="9876543210" required>
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 16px;">
            <label class="form-label">Email ID (For GST & E-Ticket PDF)</label>
            <input type="email" id="pass-email" class="form-input" placeholder="e.g. parth@example.com" value="parth@example.com" required>
          </div>

          <!-- Travel Insurance Add-on -->
          <div style="background: var(--bg-subtle); padding: 12px 16px; border-radius: 12px; border: 1px solid var(--border-neutral); margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="checkbox" id="chk-insurance" checked style="width: 18px; height: 18px; accent-color: var(--accent-green); cursor: pointer;">
              <div>
                <label for="chk-insurance" style="font-size: 13px; font-weight: 700; color: var(--text-primary); cursor: pointer;">
                  🛡️ Shuana Travel Protect (₹15/passenger)
                </label>
                <div style="font-size: 11px; color: var(--text-muted);">Covers accidental medical expenses up to ₹5,00,000 + Baggage Loss</div>
              </div>
            </div>
            <span style="font-size: 13px; font-weight: 700; color: var(--accent-green);">+${formatCurrency(insuranceCost)}</span>
          </div>

          <!-- Coupons & Offers Section -->
          <div class="checkout-section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>
            Offers & Promo Code
          </div>

          <div class="coupon-input-box">
            <input type="text" id="coupon-input" class="form-input" placeholder="Enter coupon code (e.g. SHUANA150)" style="text-transform: uppercase;">
            <button type="button" class="btn-apply-coupon" id="btn-apply-promo">Apply</button>
          </div>

          <div class="coupon-chips-list">
            ${COUPONS.map(c => `
              <div class="coupon-suggest-chip" data-code="${c.code}">
                ${c.code} (${c.description})
              </div>
            `).join('')}
          </div>

          <div id="coupon-feedback" style="margin-bottom: 16px;"></div>

          <!-- Pricing Breakdown Table -->
          <div style="background: var(--bg-subtle); border-radius: 12px; border: 1px solid var(--border-neutral); padding: 16px; margin-bottom: 20px;">
            <div class="fare-breakdown-list">
              <div class="fare-row">
                <span>Base Bus Fare (${seatCount} Seat${seatCount > 1 ? 's' : ''})</span>
                <span id="txt-base-fare">${formatCurrency(baseFare)}</span>
              </div>
              <div class="fare-row" id="row-insurance">
                <span>Travel Protect Insurance</span>
                <span id="txt-insurance">${formatCurrency(insuranceCost)}</span>
              </div>
              <div class="fare-row">
                <span>GST (5%)</span>
                <span id="txt-gst">${formatCurrency(Math.round(baseFare * 0.05))}</span>
              </div>
              <div class="fare-row" id="row-discount" style="display: none; color: var(--accent-green); font-weight: 700;">
                <span>Promo Discount (<span id="txt-coupon-code"></span>)</span>
                <span id="txt-discount">-₹0</span>
              </div>
              <div class="fare-row total">
                <span>Total Amount Payable</span>
                <span id="txt-total-payable" style="color: var(--accent-green); font-size: 20px;">${formatCurrency(calculateFinal().total)}</span>
              </div>
            </div>
          </div>

          <!-- Razorpay Pay CTA Button -->
          <button type="submit" class="btn-proceed-passenger" style="width: 100%; padding: 15px; font-size: 16px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            <span id="btn-pay-label">Pay with Razorpay • ${formatCurrency(calculateFinal().total)}</span>
          </button>
        </form>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Close listeners
  modal.querySelector('#close-checkout-modal').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  // UI update helper
  const updatePriceDisplay = () => {
    const { gst, total } = calculateFinal();
    modal.querySelector('#txt-gst').textContent = formatCurrency(gst);
    modal.querySelector('#txt-total-payable').textContent = formatCurrency(total);
    modal.querySelector('#btn-pay-label').textContent = `Pay with Razorpay • ${formatCurrency(total)}`;

    const rowInsurance = modal.querySelector('#row-insurance');
    if (hasInsurance) {
      rowInsurance.style.display = 'flex';
      modal.querySelector('#txt-insurance').textContent = formatCurrency(insuranceCost);
    } else {
      rowInsurance.style.display = 'none';
    }

    const rowDiscount = modal.querySelector('#row-discount');
    if (appliedCoupon && discountAmount > 0) {
      rowDiscount.style.display = 'flex';
      modal.querySelector('#txt-coupon-code').textContent = appliedCoupon;
      modal.querySelector('#txt-discount').textContent = `-₹${discountAmount}`;
    } else {
      rowDiscount.style.display = 'none';
    }
  };

  // Insurance checkbox
  modal.querySelector('#chk-insurance').addEventListener('change', (e) => {
    hasInsurance = e.target.checked;
    updatePriceDisplay();
  });

  // Coupon application handler
  const handleApplyCoupon = (code) => {
    const feedback = modal.querySelector('#coupon-feedback');
    const result = applyCoupon(code, baseFare);

    if (result.valid) {
      appliedCoupon = result.code;
      discountAmount = result.discountAmount;
      feedback.innerHTML = `
        <div style="color: var(--accent-green); font-size: 12px; font-weight: 700; background: var(--bg-tint); padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border-tint); display: flex; align-items: center; justify-content: space-between;">
          <span>🎉 ${result.message}</span>
          <button type="button" id="btn-remove-coupon" style="color: #d9381e; font-size: 11px; font-weight: 700;">Remove</button>
        </div>
      `;
      modal.querySelector('#btn-remove-coupon').addEventListener('click', () => {
        appliedCoupon = null;
        discountAmount = 0;
        feedback.innerHTML = '';
        modal.querySelector('#coupon-input').value = '';
        updatePriceDisplay();
      });
      updatePriceDisplay();
    } else {
      feedback.innerHTML = `
        <div style="color: #d9381e; font-size: 12px; font-weight: 600; padding: 6px 0;">
          ⚠️ ${result.message}
        </div>
      `;
    }
  };

  modal.querySelector('#btn-apply-promo').addEventListener('click', () => {
    const val = modal.querySelector('#coupon-input').value.trim();
    if (val) handleApplyCoupon(val);
  });

  modal.querySelectorAll('.coupon-suggest-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const code = chip.dataset.code;
      modal.querySelector('#coupon-input').value = code;
      handleApplyCoupon(code);
    });
  });

  // Form submission & Razorpay Payment trigger
  modal.querySelector('#checkout-passenger-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = modal.querySelector('#pass-name').value.trim();
    const age = modal.querySelector('#pass-age').value.trim();
    const gender = modal.querySelector('#pass-gender').value;
    const phone = modal.querySelector('#pass-phone').value.trim();
    const email = modal.querySelector('#pass-email').value.trim();

    const bpId = modal.querySelector('#checkout-boarding-point').value;
    const dpId = modal.querySelector('#checkout-dropping-point').value;

    const bp = bus.boardingPoints?.find(b => b.id === bpId) || bus.boardingPoints?.[0];
    const dp = bus.droppingPoints?.find(d => d.id === dpId) || bus.droppingPoints?.[0];

    const { total } = calculateFinal();

    const passengerInfo = { name, age, gender, phone, email };

    // Initiate Razorpay Payment!
    initiatePayment({
      amount: total,
      bookingDetails: {
        busName: bus.name,
        from: fromCity,
        to: toCity
      },
      passengerInfo,
      onSuccess: (paymentResult) => {
        // Construct confirmed booking record
        const pnrNumber = `SHU-${Math.floor(100000 + Math.random() * 900000)}-${toCity.substring(0, 3).toUpperCase()}`;

        const bookingRecord = {
          pnr: pnrNumber,
          busId: bus.id,
          busName: bus.name,
          busType: bus.busType,
          fromCity,
          toCity,
          travelDate,
          departureTime: bus.departureTime,
          arrivalTime: bus.arrivalTime,
          seatIds: selectedSeats.map(s => s.id),
          passenger: passengerInfo,
          boardingPoint: bp,
          droppingPoint: dp,
          baseFare,
          discountAmount,
          appliedCoupon,
          hasInsurance,
          totalAmount: total,
          payment: paymentResult,
          createdAt: new Date().toISOString()
        };

        // Save to persistent localStorage
        saveBooking(bookingRecord);

        // Remove checkout modal
        modal.remove();

        showToast('Payment successful! Your ticket is confirmed.', 'success');

        // Open e-ticket boarding pass
        openTicketModal(bookingRecord, bus);

        onComplete && onComplete(bookingRecord);
      },
      onFailure: (errMsg) => {
        showToast(errMsg || 'Payment was not completed.', 'error');
      }
    });
  });
}
