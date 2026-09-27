// Interactive 2D Bus Deck & Seat Selection Component
import { getBusSeatLayout } from '../data/routes.js';
import { formatCurrency, showToast } from '../utils/helpers.js';
import { openCheckoutModal } from './checkoutModal.js';

export function renderSeatSelector(bus, container, { travelDate, fromCity, toCity, onSeatChange }) {
  const { lowerDeck, upperDeck } = getBusSeatLayout(bus.id);

  let currentDeck = 'lower';
  let selectedSeats = [];

  const updateSummary = () => {
    const summaryCard = container.querySelector('#seat-summary-card');
    const selectedList = container.querySelector('#selected-seats-list');
    const baseFareSpan = container.querySelector('#summary-base-fare');
    const totalFareSpan = container.querySelector('#summary-total-fare');
    const proceedBtn = container.querySelector('#btn-proceed-booking');

    if (!summaryCard) return;

    if (selectedSeats.length === 0) {
      selectedList.innerHTML = `<span style="font-size: 12px; color: var(--text-muted); font-style: italic;">No seats selected yet. Click any available green berth to choose.</span>`;
      baseFareSpan.textContent = '₹0';
      totalFareSpan.textContent = '₹0';
      proceedBtn.disabled = true;
      proceedBtn.style.opacity = '0.5';
      proceedBtn.style.cursor = 'not-allowed';
      return;
    }

    proceedBtn.disabled = false;
    proceedBtn.style.opacity = '1';
    proceedBtn.style.cursor = 'pointer';

    selectedList.innerHTML = selectedSeats.map(s => `
      <span class="seat-tag">
        ${s.id} (${s.deck === 'lower' ? 'Lower' : 'Upper'}) • ${formatCurrency(bus.price + (s.priceAdd || 0))}
      </span>
    `).join('');

    const baseSum = selectedSeats.reduce((acc, s) => acc + (bus.price + (s.priceAdd || 0)), 0);
    const gstSum = Math.round(baseSum * 0.05);
    const totalSum = baseSum + gstSum;

    baseFareSpan.textContent = formatCurrency(baseSum);
    totalFareSpan.textContent = formatCurrency(totalSum);

    onSeatChange && onSeatChange(selectedSeats);
  };

  const renderDeckGrid = () => {
    const deckContainer = container.querySelector('#deck-grid-container');
    const seats = currentDeck === 'lower' ? lowerDeck : upperDeck;

    deckContainer.innerHTML = `
      <div class="seats-matrix-grid">
        ${seats.map(seat => {
          const isSelected = selectedSeats.some(s => s.id === seat.id);
          const isBooked = seat.status === 'booked';
          const isWomen = seat.status === 'women_only';

          let stateClass = 'avail';
          if (isSelected) stateClass = 'selected';
          else if (isBooked) stateClass = 'booked';
          else if (isWomen) stateClass = 'women_only';

          const seatPrice = bus.price + (seat.priceAdd || 0);

          return `
            <div class="sleeper-seat-item ${stateClass}" data-seat-id="${seat.id}" title="${seat.id} - ${formatCurrency(seatPrice)} (${isWomen ? 'Reserved for Women' : isBooked ? 'Booked' : 'Available'})">
              <span style="font-size: 12px; font-weight: 800;">${seat.name}</span>
              <span style="font-size: 10px; font-weight: 600; opacity: 0.85;">${formatCurrency(seatPrice)}</span>
              <div class="seat-pill-pillow"></div>
              ${isWomen ? '<span style="font-size: 9px; position: absolute; top: 2px; right: 4px;">👩</span>' : ''}
              ${isSelected ? '<span style="position: absolute; top: 2px; right: 4px; font-size: 11px;">✓</span>' : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Seat click handlers
    deckContainer.querySelectorAll('.sleeper-seat-item').forEach(el => {
      el.addEventListener('click', () => {
        const seatId = el.dataset.seatId;
        const targetSeat = (currentDeck === 'lower' ? lowerDeck : upperDeck).find(s => s.id === seatId);

        if (!targetSeat || targetSeat.status === 'booked') {
          showToast('This seat is already booked by another traveler.', 'error');
          return;
        }

        const existingIdx = selectedSeats.findIndex(s => s.id === seatId);
        if (existingIdx >= 0) {
          selectedSeats.splice(existingIdx, 1);
        } else {
          if (selectedSeats.length >= 6) {
            showToast('You can select a maximum of 6 seats per booking.', 'info');
            return;
          }
          selectedSeats.push(targetSeat);
        }

        renderDeckGrid();
        updateSummary();
      });
    });
  };

  container.innerHTML = `
    <div class="seat-selection-container">
      <div class="seat-selector-header">
        <div class="deck-tabs">
          <button class="deck-tab-btn active" id="tab-lower-deck">Lower Deck</button>
          <button class="deck-tab-btn" id="tab-upper-deck">Upper Deck (+₹100)</button>
        </div>

        <div class="seat-legend">
          <div class="legend-item"><span class="legend-swatch swatch-avail"></span> Available</div>
          <div class="legend-item"><span class="legend-swatch swatch-selected"></span> Selected</div>
          <div class="legend-item"><span class="legend-swatch swatch-booked"></span> Booked</div>
          <div class="legend-item"><span class="legend-swatch swatch-women"></span> Women Reserved</div>
        </div>
      </div>

      <div class="bus-layout-body">
        <!-- Bus Deck Shell -->
        <div class="bus-coach-frame">
          <div class="coach-front-indicator">
            <div class="driver-steering">
              <div class="steering-wheel-icon"></div>
              <span>DRIVER CABIN</span>
            </div>
            <div style="font-size: 11px; font-weight: 700; color: var(--accent-purple); background: var(--accent-purple-light); padding: 3px 10px; border-radius: var(--radius-full);">
              ENTRY GATE ➔
            </div>
          </div>

          <div id="deck-grid-container"></div>
        </div>

        <!-- Seat Booking Summary -->
        <div class="seat-booking-summary" id="seat-summary-card">
          <h4 class="summary-heading">Fare & Booking Summary</h4>
          
          <div>
            <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">
              Selected Berths:
            </div>
            <div class="selected-seats-chips-row" id="selected-seats-list"></div>
          </div>

          <div class="fare-breakdown-list">
            <div class="fare-row">
              <span>Base Ticket Price</span>
              <span id="summary-base-fare">₹0</span>
            </div>
            <div class="fare-row">
              <span>Estimated GST (5%)</span>
              <span style="color: var(--text-muted);">Calculated next</span>
            </div>
            <div class="fare-row total">
              <span>Subtotal</span>
              <span id="summary-total-fare">₹0</span>
            </div>
          </div>

          <button class="btn-proceed-passenger" id="btn-proceed-booking">
            <span>Continue to Passenger Details</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    </div>
  `;

  // Deck switch buttons
  const lowerBtn = container.querySelector('#tab-lower-deck');
  const upperBtn = container.querySelector('#tab-upper-deck');

  lowerBtn.addEventListener('click', () => {
    currentDeck = 'lower';
    lowerBtn.classList.add('active');
    upperBtn.classList.remove('active');
    renderDeckGrid();
  });

  upperBtn.addEventListener('click', () => {
    currentDeck = 'upper';
    upperBtn.classList.add('active');
    lowerBtn.classList.remove('active');
    renderDeckGrid();
  });

  // Proceed button click
  container.querySelector('#btn-proceed-booking').addEventListener('click', () => {
    if (selectedSeats.length === 0) {
      showToast('Please select at least one seat to proceed.', 'info');
      return;
    }

    openCheckoutModal({
      bus,
      selectedSeats,
      travelDate,
      fromCity,
      toCity,
      onComplete: () => {
        // Clear selection after booking
        selectedSeats = [];
        renderDeckGrid();
        updateSummary();
      }
    });
  });

  // Initial render
  renderDeckGrid();
  updateSummary();
}
