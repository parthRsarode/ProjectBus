import './style.css';
import { renderHeader } from './components/header.js';
import { renderHeroSearch } from './components/heroSearch.js';
import { renderBusList } from './components/busList.js';
import { renderBusDetailsView } from './views/busDetailsView.js';
import { fetchBuses, fetchBusById } from './services/api.js';
import { getInitialTheme, applyTheme } from './utils/theme.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Dark or Light Mode
  applyTheme(getInitialTheme());

  const headerContainer = document.getElementById('header-container');
  const mainAppContainer = document.getElementById('main-app-container');

  // Application State
  let currentPage = 'home'; // 'home' | 'bus_details'
  let selectedBus = null;
  let currentSearch = {
    from: 'CIDCO',
    to: 'Pune',
    date: new Date().toISOString().split('T')[0]
  };

  // Render Global Header
  const updateHeader = () => {
    renderHeader(headerContainer, {
      onHomeClick: () => {
        currentPage = 'home';
        renderHome();
      }
    });
  };
  updateHeader();

  // Render Home Page (Search + Bus Cards List)
  const renderHome = async () => {
    mainAppContainer.innerHTML = `
      <div id="hero-slot"></div>
      <div id="bus-results-slot" class="container"></div>
    `;

    const heroSlot = mainAppContainer.querySelector('#hero-slot');
    const resultsSlot = mainAppContainer.querySelector('#bus-results-slot');

    renderHeroSearch(heroSlot, {
      initialFrom: currentSearch.from,
      initialTo: currentSearch.to,
      onSearch: async (params) => {
        currentSearch = params;
        resultsSlot.innerHTML = `<div style="text-align: center; padding: 40px; color: var(--rb-text-muted);">Fetching verified buses from backend...</div>`;
        const buses = await fetchBuses(params.from, params.to, params.date);
        
        renderBusList(resultsSlot, buses, currentSearch, {
          onSelectBus: (bus) => {
            // Navigate to dedicated bus details page!
            navigateToBusDetails(bus);
          }
        });
      }
    });
  };

  // Navigate to Dedicated Bus Details & Seat Booking View
  const navigateToBusDetails = async (bus) => {
    currentPage = 'bus_details';
    selectedBus = bus;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Fetch fresh bus details from backend
    const fullBus = await fetchBusById(bus.id) || bus;

    renderBusDetailsView(mainAppContainer, fullBus, {
      fromCity: currentSearch.from,
      toCity: currentSearch.to,
      travelDate: currentSearch.date,
      onBack: () => {
        currentPage = 'home';
        renderHome();
      }
    });
  };

  // Initial Boot
  renderHome();

  // Sync header on storage event (e.g. new booking completed)
  window.addEventListener('storage', () => {
    updateHeader();
  });
});
