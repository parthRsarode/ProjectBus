// Dedicated Bus Details & Seat Booking View (Exact match to RedBus screenshot)
import { formatCurrency, showToast } from '../utils/helpers.js';
import { createPaymentOrder, verifyPayment, saveBookingToBackend } from '../services/api.js';
import { initiatePayment } from '../utils/razorpay.js';
import { openTicketModal } from '../components/ticketModal.js';

export function renderBusDetailsView(container, bus, { fromCity, toCity, travelDate, onBack }) {
  let activeStep = 'select_seats'; // 'select_seats', 'board_drop', 'passenger_info'
  let activeTab = 'highlights'; // 'highlights', 'cancellation', 'boarding', 'dropping', 'route'
  
  let selectedSeats = [];
  let selectedBoardingPoint = bus.boardingPoints?.[0]?.id || '';
  let selectedDroppingPoint = bus.droppingPoints?.[0]?.id || '';

  const calculateTotal = () => {
    return selectedSeats.reduce((sum, s) => sum + s.price, 0);
  };

  const render = () => {
    container.innerHTML = `
      <div class="booking-page-wrap">
        <!-- Top Sub-Header matching screenshot: ✕ CIDCO ➔ Pune with step tabs -->
        <div class="booking-sub-header">
          <div class="container sub-header-inner">
            <div class="sub-route-title-wrap">
              <button class="btn-back-route" id="btn-back-search" title="Back to bus search">✕</button>
              <span class="sub-route-text">${fromCity} ➔ ${toCity}</span>
            </div>

            <!-- Step navigation tabs -->
            <div class="booking-step-tabs">
              <span class="step-tab ${activeStep === 'select_seats' ? 'active' : ''}" id="tab-step-seats">Select seats</span>
              <span class="step-tab ${activeStep === 'board_drop' ? 'active' : ''}" id="tab-step-points">Board/Drop point</span>
              <span class="step-tab ${activeStep === 'passenger_info' ? 'active' : ''}" id="tab-step-passenger">Passenger Info</span>
            </div>

            <!-- Right corner offer badge -->
            <div class="top-right-offer-badge">
              <div>Last min.</div>
              <div style="font-size: 13px; font-weight: 800;">10% OFF</div>
            </div>
          </div>
        </div>

        <div class="container">
          ${activeStep === 'select_seats' ? renderSelectSeatsStep() : ''}
          ${activeStep === 'board_drop' ? renderBoardDropStep() : ''}
          ${activeStep === 'passenger_info' ? renderPassengerStep() : ''}
        </div>

        <!-- Sticky Bottom Bar -->
        ${renderStickyBottomBar()}
      </div>
    `;

    attachEvents();
  };

  // -------------------------------------------------------------
  // STEP 1: SELECT SEATS & BUS DETAILS (Screenshot Replication)
  // -------------------------------------------------------------
  const renderSelectSeatsStep = () => {
    const lowerSeats = bus.seats?.lowerDeck || [];
    const upperSeats = bus.seats?.upperDeck || [];

    return `
      <div class="booking-content-grid">
        <!-- Left: Dual Deck Vertical Bus Frames -->
        <div class="decks-side-container">
          <!-- Lower Deck -->
          <div class="deck-vertical-shell">
            <div class="deck-shell-header">
              <span class="deck-label">Lower deck</span>
              <!-- Steering Wheel Icon -->
              <svg class="driver-wheel-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="3"></circle>
                <line x1="12" y1="2" x2="12" y2="9"></line>
                <line x1="12" y1="15" x2="12" y2="22"></line>
                <line x1="2" y1="12" x2="9" y2="12"></line>
                <line x1="15" y1="12" x2="22" y2="12"></line>
              </svg>
            </div>

            <div class="deck-seats-matrix">
              ${renderBerthsMatrix(lowerSeats)}
            </div>

            <!-- Emergency Exit label on the side -->
            <div class="emergency-exit-side">Emergency Exit ➔</div>
          </div>

          <!-- Upper Deck -->
          <div class="deck-vertical-shell">
            <div class="deck-shell-header">
              <span class="deck-label">Upper deck</span>
              <div></div>
            </div>

            <div class="deck-seats-matrix">
              ${renderBerthsMatrix(upperSeats)}
            </div>
          </div>
        </div>

        <!-- Right: Bus Information, Photo Carousel & Tabs -->
        <div class="bus-details-panel">
          <!-- Operator Title & Timings -->
          <div class="operator-details-card">
            <div class="operator-header-row">
              <div>
                <h2 class="operator-main-name">${bus.operator}</h2>
                <div class="operator-timing-row">
                  <strong>${bus.departureTime} - ${bus.arrivalTime}</strong> · ${travelDate}
                </div>
                <div class="operator-bustype-sub">${bus.busType}</div>
              </div>
              <div class="bus-rating-pill">
                <span>★ ${bus.rating}</span>
                <span style="font-weight: 500; font-size: 11px; opacity: 0.9;">${bus.reviewsCount}</span>
              </div>
            </div>

            <!-- Photo Gallery (Yellow luxury bus & highway shots matching screenshot) -->
            <div class="bus-photos-grid">
              ${(bus.images || []).map(img => `
                <div class="bus-photo-frame">
                  <img src="${img.url}" alt="${img.caption}" loading="lazy">
                </div>
              `).join('')}
            </div>

            <!-- Sub Navigation Tabs matching screenshot -->
            <div class="sub-nav-tabs-bar">
              <button class="sub-tab-btn ${activeTab === 'highlights' ? 'active' : ''}" data-tab="highlights">Highlights</button>
              <button class="sub-tab-btn ${activeTab === 'cancellation' ? 'active' : ''}" data-tab="cancellation">Cancellation policy</button>
              <button class="sub-tab-btn ${activeTab === 'boarding' ? 'active' : ''}" data-tab="boarding">Boarding point</button>
              <button class="sub-tab-btn ${activeTab === 'dropping' ? 'active' : ''}" data-tab="dropping">Dropping point</button>
              <button class="sub-tab-btn ${activeTab === 'route' ? 'active' : ''}" data-tab="route">Bus route</button>
            </div>

            <!-- Tab Content View -->
            <div class="tab-content-container">
              ${renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // Helper to render individual berths according to 2+1 layout
  const renderBerthsMatrix = (seatsList) => {
    // Group into rows of 3: col 1, col 2, col 3
    let html = '';
    for (let i = 0; i < seatsList.length; i += 3) {
      const s1 = seatsList[i];
      const s2 = seatsList[i + 1];
      const s3 = seatsList[i + 2];

      if (s1) html += renderBerthCard(s1);
      html += '<div class="aisle-gap"></div>';
      if (s2) html += renderBerthCard(s2);
      if (s3) html += renderBerthCard(s3);
    }
    return html;
  };

  const renderBerthCard = (seat) => {
    const isSelected = selectedSeats.some(s => s.id === seat.id);

    let stateClass = '';
    let label = '';
    let isClickable = false;

    if (isSelected) {
      stateClass = 'selected-blue';
      label = `₹${seat.price}`;
      isClickable = true;
    } else if (seat.status === 'sold') {
      if (seat.gender === 'female') {
        stateClass = 'sold-female';
        label = 'Sold';
      } else {
        stateClass = 'sold-male';
        label = 'Sold';
      }
    } else if (seat.status === 'available_female') {
      stateClass = 'avail-female';
      label = `₹${seat.price}`;
      isClickable = true;
    } else {
      stateClass = 'avail-green';
      label = `₹${seat.price}`;
      isClickable = true;
    }

    return `
      <div class="sleeper-berth-card ${stateClass}" data-seat-id="${seat.id}" ${isClickable ? 'data-clickable="true"' : ''} title="${seat.id} - ${label}">
        <div class="berth-pillow"></div>
        <div class="berth-person-icon">
          ${isSelected ? '👤' : seat.gender === 'female' ? '👩' : '👤'}
        </div>
        <div class="berth-bottom-label">${label}</div>
      </div>
    `;
  };

  // Tab Content renderer
  const renderTabContent = () => {
    if (activeTab === 'highlights') {
      return `
        <div>
          <div class="highlights-cards-row">
            <div class="highlight-box">
              <div>
                <div class="highlight-title">${bus.busAge || 'New Bus'}</div>
                <div class="highlight-desc">2 months old luxury coach</div>
              </div>
              <div style="font-size: 22px;">🥇</div>
            </div>
            <div class="highlight-box">
              <div>
                <div class="highlight-title">${bus.safetyRating || 'Bus Safety'}</div>
                <div class="highlight-desc">Enhanced ></div>
              </div>
              <div style="font-size: 20px; color: var(--rb-green);">🛡️</div>
            </div>
          </div>

          <div class="hurry-offer-card">
            <span class="hurry-tag">Last min.<br>10% OFF</span>
            <span style="font-size: 13px; font-weight: 700; color: #78350F;">Hurry! Offer ends soon</span>
          </div>
        </div>
      `;
    }

    if (activeTab === 'cancellation') {
      return `
        <div class="cancellation-table-wrap">
          <h4>Cancellation policy</h4>
          <table class="rb-table">
            <thead>
              <tr>
                <th>Time before travel</th>
                <th>Without free cancellation</th>
                <th>With free cancellation</th>
              </tr>
            </thead>
            <tbody>
              ${(bus.cancellationPolicy || []).map(p => `
                <tr>
                  <td><strong>${p.timeframe}</strong></td>
                  <td>${p.withoutFree}</td>
                  <td style="color: var(--rb-green); font-weight: 700;">${p.withFree}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    if (activeTab === 'boarding') {
      return `
        <div class="points-timeline-list">
          ${(bus.boardingPoints || []).map(p => `
            <div class="point-item-card">
              <div>
                <div style="font-size: 14px; font-weight: 700;">${p.name}</div>
                <div style="font-size: 12px; color: var(--rb-text-muted);">${p.landmark}</div>
              </div>
              <div class="point-time-badge">${p.time}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    if (activeTab === 'dropping') {
      return `
        <div class="points-timeline-list">
          ${(bus.droppingPoints || []).map(p => `
            <div class="point-item-card">
              <div>
                <div style="font-size: 14px; font-weight: 700;">${p.name}</div>
                <div style="font-size: 12px; color: var(--rb-text-muted);">${p.landmark}</div>
              </div>
              <div class="point-time-badge">${p.time}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    if (activeTab === 'route') {
      return `
        <div class="points-timeline-list">
          ${(bus.routeStops || []).map(s => `
            <div class="point-item-card">
              <div>
                <div style="font-size: 14px; font-weight: 700;">${s.stop}</div>
                <div style="font-size: 12px; color: var(--rb-text-muted);">Distance: ${s.distance} • Halt: ${s.halt}</div>
              </div>
              <div class="point-time-badge">${s.time}</div>
            </div>
          `).join('')}
        </div>
      `;
    }
  };

  // -------------------------------------------------------------
  // STEP 2: BOARDING / DROPPING SELECTION VIEW
  // -------------------------------------------------------------
  const renderBoardDropStep = () => {
    return `
      <div class="step-container-card">
        <div class="step-card-header">
          <h3 class="step-title">Select Boarding & Dropping Points</h3>
        </div>

        <div class="points-grid-select">
          <!-- Boarding points -->
          <div class="point-select-col">
            <h4>Boarding Point (${fromCity})</h4>
            ${(bus.boardingPoints || []).map(bp => `
              <label class="radio-point-label ${selectedBoardingPoint === bp.id ? 'active' : ''}">
                <input type="radio" name="rb-bp" value="${bp.id}" ${selectedBoardingPoint === bp.id ? 'checked' : ''}>
                <div>
                  <div style="font-size: 13px; font-weight: 700;">${bp.time} - ${bp.name}</div>
                  <div style="font-size: 11px; color: var(--rb-text-muted);">${bp.landmark}</div>
                </div>
              </label>
            `).join('')}
          </div>

          <!-- Dropping points -->
          <div class="point-select-col">
            <h4>Dropping Point (${toCity})</h4>
            ${(bus.droppingPoints || []).map(dp => `
              <label class="radio-point-label ${selectedDroppingPoint === dp.id ? 'active' : ''}">
                <input type="radio" name="rb-dp" value="${dp.id}" ${selectedDroppingPoint === dp.id ? 'checked' : ''}>
                <div>
                  <div style="font-size: 13px; font-weight: 700;">${dp.time} - ${dp.name}</div>
                  <div style="font-size: 11px; color: var(--rb-text-muted);">${dp.landmark}</div>
                </div>
              </label>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  };

  // -------------------------------------------------------------
  // STEP 3: PASSENGER & RAZORPAY PAYMENT VIEW
  // -------------------------------------------------------------
  const renderPassengerStep = () => {
    const totalFare = calculateTotal();
    const gst = Math.round(totalFare * 0.05);
    const finalAmount = totalFare + gst;

    return `
      <div class="checkout-grid-layout">
        <!-- Passenger Form -->
        <div class="form-card-panel">
          <h3 class="form-panel-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            Passenger Details
          </h3>

          <form id="rb-passenger-form">
            <div class="form-row-2">
              <div class="field-group">
                <label>Primary Passenger Name</label>
                <input type="text" id="pass-name" class="field-input" placeholder="e.g. Parth Sarode" value="Parth Sarode" required>
              </div>
              <div class="field-group">
                <label>Age</label>
                <input type="number" id="pass-age" class="field-input" placeholder="e.g. 24" value="24" required>
              </div>
            </div>

            <div class="form-row-2">
              <div class="field-group">
                <label>Gender</label>
                <select id="pass-gender" class="field-input">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div class="field-group">
                <label>Mobile Number (For SMS/WhatsApp ticket)</label>
                <input type="tel" id="pass-phone" class="field-input" placeholder="9876543210" value="9876543210" required>
              </div>
            </div>

            <div class="field-group">
              <label>Email Address</label>
              <input type="email" id="pass-email" class="field-input" placeholder="traveler@example.com" value="parth@example.com" required>
            </div>

            <div style="background: #F9FAFB; padding: 12px; border-radius: 8px; border: 1px solid var(--rb-border); margin-top: 14px; font-size: 12px; color: var(--rb-text-secondary);">
              🔒 By clicking Pay with Razorpay, your ticket will be confirmed instantly on our Express backend.
            </div>
          </form>
        </div>

        <!-- Fare Breakdown -->
        <div class="fare-breakdown-card">
          <h3 style="font-size: 16px; font-weight: 800; margin-bottom: 16px;">Fare Summary</h3>
          <div class="fare-list">
            <div class="fare-item">
              <span>Seats Selected (${selectedSeats.length})</span>
              <span><strong>${selectedSeats.map(s => s.id).join(', ')}</strong></span>
            </div>
            <div class="fare-item">
              <span>Base Ticket Fare</span>
              <span>${formatCurrency(totalFare)}</span>
            </div>
            <div class="fare-item">
              <span>GST (5%)</span>
              <span>${formatCurrency(gst)}</span>
            </div>
            <div class="fare-item total-final">
              <span>Total Payable Amount</span>
              <span style="color: var(--rb-primary);">${formatCurrency(finalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // Sticky Bottom Bar
  const renderStickyBottomBar = () => {
    const totalFare = calculateTotal();
    const hasSeats = selectedSeats.length > 0;

    let btnLabel = 'Select Boarding & Dropping Points ➔';
    if (activeStep === 'board_drop') btnLabel = 'Continue to Passenger Details ➔';
    if (activeStep === 'passenger_info') btnLabel = `Pay ${formatCurrency(Math.round(totalFare * 1.05))} with Razorpay`;

    return `
      <div class="sticky-booking-bar">
        <div class="container sticky-bar-inner">
          <div class="selected-seats-summary-col">
            <div>
              <div class="seat-summary-label">Selected Seats (${selectedSeats.length})</div>
              <div style="display: flex; gap: 6px; margin-top: 2px;">
                ${hasSeats ? selectedSeats.map(s => `
                  <span class="selected-seat-badge">${s.id}</span>
                `).join('') : '<span style="font-size: 12px; color: var(--rb-text-muted);">Please select a berth from the bus deck</span>'}
              </div>
            </div>

            ${hasSeats ? `
              <div style="border-left: 1px solid var(--rb-border); padding-left: 16px;">
                <div class="seat-summary-label">Total Amount</div>
                <div class="total-fare-value">${formatCurrency(totalFare)}</div>
              </div>
            ` : ''}
          </div>

          <button class="btn-proceed-red" id="btn-sticky-next" ${!hasSeats ? 'disabled' : ''}>
            <span>${btnLabel}</span>
          </button>
        </div>
      </div>
    `;
  };

  // -------------------------------------------------------------
  // EVENT LISTENERS
  // -------------------------------------------------------------
  const attachEvents = () => {
    // Back button to search
    const backBtn = container.querySelector('#btn-back-search');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        onBack && onBack();
      });
    }

    // Step navigation tabs in top header
    const tabSeats = container.querySelector('#tab-step-seats');
    const tabPoints = container.querySelector('#tab-step-points');
    const tabPassenger = container.querySelector('#tab-step-passenger');

    if (tabSeats) {
      tabSeats.addEventListener('click', () => {
        activeStep = 'select_seats';
        render();
      });
    }
    if (tabPoints) {
      tabPoints.addEventListener('click', () => {
        if (selectedSeats.length === 0) {
          showToast('Please select at least one seat first!', 'error');
          return;
        }
        activeStep = 'board_drop';
        render();
      });
    }
    if (tabPassenger) {
      tabPassenger.addEventListener('click', () => {
        if (selectedSeats.length === 0) {
          showToast('Please select at least one seat first!', 'error');
          return;
        }
        activeStep = 'passenger_info';
        render();
      });
    }

    // Sub nav tabs (Highlights, Cancellation, Boarding, Dropping, Route)
    container.querySelectorAll('.sub-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.dataset.tab;
        render();
      });
    });

    // Seat click event listeners (2D Berth Cards)
    container.querySelectorAll('.sleeper-berth-card[data-clickable="true"]').forEach(card => {
      card.addEventListener('click', () => {
        const seatId = card.dataset.seatId;

        // Find in lower or upper deck
        const allSeats = [...(bus.seats?.lowerDeck || []), ...(bus.seats?.upperDeck || [])];
        const target = allSeats.find(s => s.id === seatId);

        if (!target) return;

        const idx = selectedSeats.findIndex(s => s.id === seatId);
        if (idx >= 0) {
          selectedSeats.splice(idx, 1);
        } else {
          if (selectedSeats.length >= 6) {
            showToast('You can select a maximum of 6 seats.', 'info');
            return;
          }
          selectedSeats.push(target);
        }

        render();
      });
    });

    // Radio point selection in Step 2
    container.querySelectorAll('input[name="rb-bp"]').forEach(r => {
      r.addEventListener('change', (e) => {
        selectedBoardingPoint = e.target.value;
      });
    });
    container.querySelectorAll('input[name="rb-dp"]').forEach(r => {
      r.addEventListener('change', (e) => {
        selectedDroppingPoint = e.target.value;
      });
    });

    // Sticky Next CTA Button
    const nextBtn = container.querySelector('#btn-sticky-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', async () => {
        if (selectedSeats.length === 0) {
          showToast('Please select at least one berth to continue.', 'error');
          return;
        }

        if (activeStep === 'select_seats') {
          activeStep = 'board_drop';
          render();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        if (activeStep === 'board_drop') {
          activeStep = 'passenger_info';
          render();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        if (activeStep === 'passenger_info') {
          // Trigger Razorpay Payment via Backend API
          const nameInput = container.querySelector('#pass-name');
          const ageInput = container.querySelector('#pass-age');
          const genderInput = container.querySelector('#pass-gender');
          const phoneInput = container.querySelector('#pass-phone');
          const emailInput = container.querySelector('#pass-email');

          const passenger = {
            name: nameInput?.value.trim() || 'Parth Sarode',
            age: ageInput?.value.trim() || '24',
            gender: genderInput?.value || 'Male',
            phone: phoneInput?.value.trim() || '9876543210',
            email: emailInput?.value.trim() || 'parth@example.com'
          };

          const totalFare = calculateTotal();
          const gst = Math.round(totalFare * 0.05);
          const finalAmount = totalFare + gst;

          const bp = bus.boardingPoints?.find(b => b.id === selectedBoardingPoint) || bus.boardingPoints?.[0];
          const dp = bus.droppingPoints?.find(d => d.id === selectedDroppingPoint) || bus.droppingPoints?.[0];

          // 1. Create order on Express Backend
          const orderResponse = await createPaymentOrder(finalAmount, `rcpt_${Date.now()}`, {
            busId: bus.id,
            operator: bus.operator
          });

          // 2. Open Razorpay Checkout (Real or Simulated)
          initiatePayment({
            amount: finalAmount,
            bookingDetails: {
              busName: bus.operator,
              from: fromCity,
              to: toCity
            },
            passengerInfo: passenger,
            onSuccess: async (paymentResult) => {
              // 3. Verify Payment on Backend
              await verifyPayment({
                razorpay_order_id: paymentResult.orderId || orderResponse.orderId,
                razorpay_payment_id: paymentResult.paymentId,
                razorpay_signature: paymentResult.signature || 'simulated_sig'
              });

              // 4. Save Confirmed Booking to Express Backend Persistent Database
              const bookingPayload = {
                busId: bus.id,
                busName: bus.operator,
                busType: bus.busType,
                fromCity,
                toCity,
                travelDate,
                departureTime: bus.departureTime,
                arrivalTime: bus.arrivalTime,
                seatIds: selectedSeats.map(s => s.id),
                passenger,
                boardingPoint: bp,
                droppingPoint: dp,
                baseFare: totalFare,
                totalAmount: finalAmount,
                payment: paymentResult
              };

              const saveResult = await saveBookingToBackend(bookingPayload);
              const confirmedRecord = saveResult.data || { ...bookingPayload, pnr: `SHU-${Math.floor(100000 + Math.random() * 900000)}` };

              showToast('Booking Confirmed! Boarding Pass Issued.', 'success');
              
              // Open confirmed digital ticket modal
              openTicketModal(confirmedRecord, bus);

              // Reset to step 1
              activeStep = 'select_seats';
              selectedSeats = [];
              render();
            },
            onFailure: (err) => {
              showToast(err || 'Payment was not completed.', 'error');
            }
          });
        }
      });
    }
  };

  // Initial render
  render();
}
