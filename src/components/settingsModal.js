// Settings Modal to configure Razorpay API Key and Payment preferences
import { getStoredRazorpayKey, setStoredRazorpayKey, getPaymentMode, setPaymentMode } from '../utils/razorpay.js';
import { showToast } from '../utils/helpers.js';

export function openSettingsModal() {
  const existing = document.getElementById('settings-modal');
  if (existing) existing.remove();

  const currentKey = getStoredRazorpayKey();
  const currentMode = getPaymentMode();

  const modal = document.createElement('div');
  modal.id = 'settings-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-dialog" style="max-width: 520px;">
      <div class="modal-header">
        <div class="modal-title-wrap">
          <div class="perk-icon-wrap" style="background: var(--bg-tint); color: var(--accent-green);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
          </div>
          <div>
            <h3 class="modal-title">Payment Gateway Config</h3>
            <p style="font-size: 12px; color: var(--text-muted);">Link your Razorpay Account or use Simulated Gateway</p>
          </div>
        </div>
        <button class="modal-close-btn" id="close-settings-modal">&times;</button>
      </div>

      <div class="modal-body">
        <div style="background: var(--accent-green-light); border: 1px solid var(--border-tint); padding: 14px; border-radius: 12px; margin-bottom: 18px; font-size: 13px; color: var(--text-secondary); line-height: 1.5;">
          💡 <strong>How to connect Razorpay:</strong>
          <br>You can link your own Razorpay Key ID (e.g. <code>rzp_test_...</code> from your <a href="https://dashboard.razorpay.com/" target="_blank" style="color: var(--accent-green); font-weight: 700;">Razorpay Dashboard</a>). If left empty, Shuana Bus seamlessly runs in <strong>Interactive Instant Simulation Mode</strong> with QR code scanning and cards!
        </div>

        <div class="form-group" style="margin-bottom: 16px;">
          <label class="form-label">Razorpay Key ID (Optional)</label>
          <input type="text" id="razorpay-key-input" class="form-input" placeholder="e.g. rzp_test_1DP5mmOlF5G5ag" value="${currentKey}">
          <span style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Saved securely to your browser local storage.</span>
        </div>

        <div class="form-group" style="margin-bottom: 20px;">
          <label class="form-label">Payment Processing Mode</label>
          <select id="payment-mode-select" class="form-input">
            <option value="auto" ${currentMode === 'auto' ? 'selected' : ''}>Auto (Use Real Razorpay if key present, else Simulation)</option>
            <option value="simulated" ${currentMode === 'simulated' ? 'selected' : ''}>Simulation Mode (UPI QR Code, Cards, NetBanking demo)</option>
            <option value="real" ${currentMode === 'real' ? 'selected' : ''}>Force Official Razorpay SDK Modal</option>
          </select>
        </div>

        <div style="display: flex; gap: 10px; justify-content: flex-end;">
          <button class="btn-secondary-nav" id="btn-clear-settings">Clear Key</button>
          <button class="btn-pill-action" id="btn-save-settings">Save Settings</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('#close-settings-modal').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  modal.querySelector('#btn-clear-settings').addEventListener('click', () => {
    setStoredRazorpayKey('');
    document.getElementById('razorpay-key-input').value = '';
    showToast('Razorpay Key cleared. Reverted to Demo Simulation mode.', 'info');
  });

  modal.querySelector('#btn-save-settings').addEventListener('click', () => {
    const key = document.getElementById('razorpay-key-input').value.trim();
    const mode = document.getElementById('payment-mode-select').value;
    setStoredRazorpayKey(key);
    setPaymentMode(mode);
    showToast(key ? 'Razorpay Key linked successfully!' : 'Preferences saved!', 'success');
    modal.remove();
  });
}
