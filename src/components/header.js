// Header Navigation with Royal Violet Styling & Dark/Light Mode Switcher
import { openSettingsModal } from './settingsModal.js';
import { openBookingsModal } from './bookingsModal.js';
import { getSavedBookings } from '../utils/helpers.js';
import { toggleTheme, getInitialTheme } from '../utils/theme.js';

export function renderHeader(container, { onHomeClick }) {
  const bookings = getSavedBookings();
  const currentTheme = document.documentElement.getAttribute('data-theme') || getInitialTheme();

  container.innerHTML = `
    <header class="global-header">
      <div class="container header-inner">
        <!-- Logo -->
        <a class="header-brand" id="brand-home-link" href="#">
          <div class="brand-badge">
            <span>🚌</span>
            <span>SHUANA</span>
          </div>
          <span class="brand-title">bus<span>.in</span></span>
        </a>

        <!-- Middle Menu -->
        <nav class="header-nav">
          <button class="nav-link-btn active" id="btn-nav-tickets">
            <span>🎫 Bus Tickets</span>
          </button>
          <button class="nav-link-btn" id="btn-nav-routes">
            <span>🗺️ Schedules</span>
          </button>
          <button class="nav-link-btn" id="btn-nav-help">
            <span>📞 24x7 Help</span>
          </button>
        </nav>

        <!-- Right Controls -->
        <div class="header-right">
          <!-- Dark / Light Mode Switcher Toggle Button -->
          <button class="btn-theme-toggle" id="btn-theme-toggle" title="Toggle Light / Dark mode">
            <span id="theme-icon">${currentTheme === 'dark' ? '☀️' : '🌙'}</span>
            <span id="theme-label">${currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          <button class="btn-bookings-pill" id="btn-header-razorpay" title="Razorpay API Config">
            <span>💳 Razorpay</span>
          </button>

          <button class="btn-primary-action" id="btn-header-bookings">
            <span>My Bookings (${bookings.length})</span>
          </button>
        </div>
      </div>
    </header>
  `;

  // Theme switcher handler
  const themeBtn = container.querySelector('#btn-theme-toggle');
  const themeIcon = container.querySelector('#theme-icon');
  const themeLabel = container.querySelector('#theme-label');

  themeBtn.addEventListener('click', () => {
    const nextTheme = toggleTheme();
    themeIcon.textContent = nextTheme === 'dark' ? '☀️' : '🌙';
    themeLabel.textContent = nextTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
  });

  // Nav clicks
  container.querySelector('#brand-home-link').addEventListener('click', (e) => {
    e.preventDefault();
    onHomeClick && onHomeClick();
  });

  container.querySelector('#btn-nav-tickets').addEventListener('click', () => {
    onHomeClick && onHomeClick();
  });

  container.querySelector('#btn-header-razorpay').addEventListener('click', () => {
    openSettingsModal();
  });

  container.querySelector('#btn-header-bookings').addEventListener('click', () => {
    openBookingsModal();
  });
}
