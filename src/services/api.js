// API Service Client connecting Frontend to Express Backend

const API_BASE_URL = 'http://localhost:5001/api';

export async function fetchCities() {
  try {
    const res = await fetch(`${API_BASE_URL}/cities`);
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Error fetching cities:', err);
    return [
      { id: 'CIDCO', name: 'CIDCO (Aurangabad)', state: 'Maharashtra' },
      { id: 'Pune', name: 'Pune', state: 'Maharashtra' },
      { id: 'Mumbai', name: 'Mumbai', state: 'Maharashtra' },
      { id: 'Delhi', name: 'Delhi', state: 'Delhi NCR' },
      { id: 'Manali', name: 'Manali', state: 'Himachal Pradesh' },
      { id: 'Jaipur', name: 'Jaipur', state: 'Rajasthan' }
    ];
  }
}

export async function fetchBuses(from, to, date) {
  try {
    const query = new URLSearchParams({ from, to, ...(date ? { date } : {}) });
    const res = await fetch(`${API_BASE_URL}/buses?${query.toString()}`);
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Error fetching buses from backend:', err);
    return [];
  }
}

export async function fetchBusById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/buses/${id}`);
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error('Error fetching bus by ID:', err);
    return null;
  }
}

export async function createPaymentOrder(amount, receipt, notes) {
  try {
    const res = await fetch(`${API_BASE_URL}/payments/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, receipt, notes })
    });
    return await res.json();
  } catch (err) {
    console.error('Error creating Razorpay order:', err);
    return { success: false, message: err.message };
  }
}

export async function verifyPayment(paymentData) {
  try {
    const res = await fetch(`${API_BASE_URL}/payments/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData)
    });
    return await res.json();
  } catch (err) {
    console.error('Error verifying payment:', err);
    return { success: false, message: err.message };
  }
}

export async function saveBookingToBackend(bookingData) {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    return await res.json();
  } catch (err) {
    console.error('Error saving booking to backend:', err);
    return { success: false, message: err.message };
  }
}

export async function fetchUserBookings() {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings`);
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error('Error fetching user bookings:', err);
    return [];
  }
}
