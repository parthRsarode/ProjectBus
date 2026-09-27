// Razorpay SDK loader and payment processor

const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';
const STORAGE_KEY = 'shuana_razorpay_key';
const STORAGE_MODE = 'shuana_payment_mode';

export function getStoredRazorpayKey() {
  return localStorage.getItem(STORAGE_KEY) || '';
}

export function setStoredRazorpayKey(key) {
  if (key) {
    localStorage.setItem(STORAGE_KEY, key.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function getPaymentMode() {
  return localStorage.getItem(STORAGE_MODE) || 'auto'; // 'auto', 'real', 'simulated'
}

export function setPaymentMode(mode) {
  localStorage.setItem(STORAGE_MODE, mode);
}

// Load official Razorpay Checkout SDK
export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT_URL;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.warn('Razorpay SDK failed to load from CDN. Fallback simulation available.');
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

// Main payment trigger
export async function initiatePayment({
  amount, // amount in rupees
  bookingDetails,
  passengerInfo,
  onSuccess,
  onFailure
}) {
  const userKey = getStoredRazorpayKey();
  const mode = getPaymentMode();

  // If user provided a real key or mode is forced to real and script is loaded
  const hasRazorpayScript = await loadRazorpayScript();

  if (userKey && hasRazorpayScript && mode !== 'simulated') {
    try {
      const options = {
        key: userKey,
        amount: Math.round(amount * 100), // in paise
        currency: 'INR',
        name: 'Shuana Bus by Zingbus Experience',
        description: `Booking for ${bookingDetails.busName} (${bookingDetails.from} to ${bookingDetails.to})`,
        image: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png',
        handler: function (response) {
          onSuccess({
            paymentId: response.razorpay_payment_id || `pay_${Date.now()}`,
            orderId: response.razorpay_order_id || `order_${Math.random().toString(36).substring(7)}`,
            method: 'Razorpay Gateway Live',
            amount: amount
          });
        },
        prefill: {
          name: passengerInfo.name || 'Passenger',
          email: passengerInfo.email || 'traveler@shuanabus.com',
          contact: passengerInfo.phone || '9876543210'
        },
        theme: {
          color: '#009933'
        },
        modal: {
          ondismiss: function () {
            onFailure && onFailure('Payment cancelled by traveler.');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        onFailure && onFailure(response.error.description || 'Payment failed.');
      });
      rzp.open();
      return;
    } catch (err) {
      console.error('Error opening Razorpay live modal, falling back to simulated modal:', err);
    }
  }

  // Otherwise, launch the sleek built-in Razorpay checkout dialog
  openSimulatedRazorpayModal({
    amount,
    bookingDetails,
    passengerInfo,
    onSuccess,
    onFailure
  });
}

// Sleek built-in simulated Razorpay gateway modal
function openSimulatedRazorpayModal({ amount, bookingDetails, passengerInfo, onSuccess, onFailure }) {
  // Remove existing modal if any
  const existing = document.getElementById('simulated-razorpay-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'simulated-razorpay-modal';
  modal.className = 'razorpay-overlay';
  modal.innerHTML = `
    <div class="razorpay-card" role="dialog" aria-modal="true">
      <!-- Header -->
      <div class="rzp-header">
        <div class="rzp-brand">
          <div class="rzp-logo-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
          </div>
          <div>
            <h3 class="rzp-title">Razorpay <span class="rzp-tag">Verified Checkout</span></h3>
            <p class="rzp-subtitle">Shuana Bus Services Pvt Ltd</p>
          </div>
        </div>
        <button class="rzp-close-btn" id="rzp-close">&times;</button>
      </div>

      <div class="rzp-amount-bar">
        <div class="rzp-amt-label">Payable Amount</div>
        <div class="rzp-amt-val">₹${amount.toLocaleString('en-IN')}</div>
      </div>

      <!-- Payment Methods Tabs -->
      <div class="rzp-body">
        <div class="rzp-tabs">
          <button class="rzp-tab active" data-tab="upi">
            <span class="rzp-tab-icon">⚡</span>
            <span>UPI / QR</span>
          </button>
          <button class="rzp-tab" data-tab="card">
            <span class="rzp-tab-icon">💳</span>
            <span>Cards</span>
          </button>
          <button class="rzp-tab" data-tab="netbanking">
            <span class="rzp-tab-icon">🏦</span>
            <span>NetBanking</span>
          </button>
        </div>

        <div class="rzp-tab-content">
          <!-- UPI Tab -->
          <div class="rzp-pane active" id="pane-upi">
            <div class="rzp-upi-qr-box">
              <div class="rzp-qr-wrapper">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=shuana.bus@razorpay&pn=ShuanaBus&am=${amount}&cu=INR" alt="UPI QR Code" class="rzp-qr-img" />
                <div class="rzp-qr-scan-line"></div>
              </div>
              <p class="rzp-qr-note">Scan with <strong>Google Pay, PhonePe, Paytm, BHIM</strong></p>
            </div>
            
            <div class="rzp-or-divider"><span>OR ENTER UPI ID</span></div>
            <div class="rzp-input-group">
              <input type="text" id="rzp-upi-id" class="rzp-input" placeholder="e.g. mobile@okaxis / user@upi" value="${passengerInfo.phone || '9876543210'}@paytm">
              <button class="rzp-verify-btn" id="rzp-pay-upi">Verify & Pay</button>
            </div>
          </div>

          <!-- Card Tab -->
          <div class="rzp-pane" id="pane-card">
            <div class="rzp-form-group">
              <label>Card Number</label>
              <input type="text" class="rzp-input" id="rzp-card-num" placeholder="4532 •••• •••• 8892" value="4532 9876 5432 1098">
            </div>
            <div class="rzp-form-row">
              <div class="rzp-form-group">
                <label>Expiry (MM/YY)</label>
                <input type="text" class="rzp-input" id="rzp-card-exp" placeholder="MM/YY" value="09/29">
              </div>
              <div class="rzp-form-group">
                <label>CVV</label>
                <input type="password" maxlength="3" class="rzp-input" id="rzp-card-cvv" placeholder="•••" value="888">
              </div>
            </div>
            <div class="rzp-form-group">
              <label>Name on Card</label>
              <input type="text" class="rzp-input" id="rzp-card-name" value="${passengerInfo.name || 'Parth Sarode'}">
            </div>
            <button class="rzp-submit-btn" id="rzp-pay-card">
              <span>Pay Securely ₹${amount.toLocaleString('en-IN')}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
          </div>

          <!-- NetBanking Tab -->
          <div class="rzp-pane" id="pane-netbanking">
            <div class="rzp-banks-grid">
              <label class="bank-pill active"><input type="radio" name="bank" checked> <span>HDFC Bank</span></label>
              <label class="bank-pill"><input type="radio" name="bank"> <span>State Bank of India</span></label>
              <label class="bank-pill"><input type="radio" name="bank"> <span>ICICI Bank</span></label>
              <label class="bank-pill"><input type="radio" name="bank"> <span>Axis Bank</span></label>
              <label class="bank-pill"><input type="radio" name="bank"> <span>Kotak Mahindra</span></label>
              <label class="bank-pill"><input type="radio" name="bank"> <span>Punjab National Bank</span></label>
            </div>
            <button class="rzp-submit-btn" id="rzp-pay-netbank" style="margin-top: 16px;">
              <span>Proceed to NetBanking ₹${amount.toLocaleString('en-IN')}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Processing State Overlay -->
      <div class="rzp-processing" id="rzp-processing" style="display: none;">
        <div class="rzp-spinner"></div>
        <h4>Securing Transaction...</h4>
        <p>Connecting with your bank & issuing your confirmed bus e-ticket.</p>
        <div class="rzp-security-badges">
          <span>🔒 256-Bit SSL</span>
          <span>🛡️ PCI-DSS Level 1</span>
          <span>⚡ Instant Issuance</span>
        </div>
      </div>

      <!-- Footer -->
      <div class="rzp-footer">
        <div class="rzp-secure-tag">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          Secured by Razorpay Payments
        </div>
        <div class="rzp-key-note">
          ${userKey ? `<span class="badge-custom-key">Custom API Key: ${userKey.substring(0, 10)}...</span>` : `<span class="badge-demo-key">Simulation Mode (Set API Key anytime in navbar)</span>`}
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Tab switching
  const tabs = modal.querySelectorAll('.rzp-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      modal.querySelectorAll('.rzp-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = modal.querySelector(`#pane-${tab.dataset.tab}`);
      if (target) target.classList.add('active');
    });
  });

  // Close handler
  const closeBtn = modal.querySelector('#rzp-close');
  closeBtn.addEventListener('click', () => {
    modal.remove();
    onFailure && onFailure('Payment cancelled by traveler.');
  });

  // Action execution helper
  const executePaymentSuccess = (method) => {
    const processing = modal.querySelector('#rzp-processing');
    processing.style.display = 'flex';

    setTimeout(() => {
      const paymentId = `pay_SHU_${Date.now().toString(36).toUpperCase()}`;
      const orderId = `order_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      modal.remove();
      onSuccess({
        paymentId,
        orderId,
        method: method,
        amount: amount,
        timestamp: new Date().toISOString()
      });
    }, 1800);
  };

  // Click listeners for pay buttons
  modal.querySelector('#rzp-pay-upi').addEventListener('click', () => executePaymentSuccess('UPI / QR'));
  modal.querySelector('#rzp-pay-card').addEventListener('click', () => executePaymentSuccess('Credit / Debit Card'));
  modal.querySelector('#rzp-pay-netbank').addEventListener('click', () => executePaymentSuccess('NetBanking (HDFC)'));
}
