import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { BUSES, CITIES } from './data/buses.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());

// Persistent Bookings Database path
const BOOKINGS_FILE = path.join(__dirname, 'data', 'bookings.json');

// Ensure bookings file exists
if (!fs.existsSync(path.dirname(BOOKINGS_FILE))) {
  fs.mkdirSync(path.dirname(BOOKINGS_FILE), { recursive: true });
}
if (!fs.existsSync(BOOKINGS_FILE)) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([], null, 2));
}

function readBookings() {
  try {
    const data = fs.readFileSync(BOOKINGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function writeBookings(bookings) {
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
    return true;
  } catch (e) {
    console.error('Error writing bookings file:', e);
    return false;
  }
}

// Initialize Razorpay Instance if credentials provided
const razorpayKeyId = process.env.RAZORPAY_KEY_ID || '';
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || '';

let razorpay = null;
if (razorpayKeyId && razorpayKeySecret) {
  try {
    razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret
    });
    console.log('✅ Real Razorpay SDK initialized successfully.');
  } catch (err) {
    console.warn('⚠️ Razorpay initialization warning:', err.message);
  }
}

// -------------------------------------------------------------
// REST API ROUTES
// -------------------------------------------------------------

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    razorpayConfigured: Boolean(razorpay)
  });
});

// 2. Cities
app.get('/api/cities', (req, res) => {
  res.json({ success: true, data: CITIES });
});

// 3. Search Buses
app.get('/api/buses', (req, res) => {
  const { from = 'CIDCO', to = 'Pune', date } = req.query;

  let results = BUSES.filter(b => 
    b.from.toLowerCase() === from.toLowerCase() && 
    b.to.toLowerCase() === to.toLowerCase()
  );

  // If no direct bus in static list, dynamically generate realistic buses for that route
  if (results.length === 0) {
    results = [
      {
        id: `BUS-${from.substring(0,3).toUpperCase()}-${to.substring(0,3).toUpperCase()}-01`,
        from: from,
        to: to,
        operator: 'Humsafar Travels',
        serviceName: 'Humsafar Royal Executive',
        busType: 'Bharat Benz A/C Sleeper (2+1)',
        model: 'BharatBenz 1624 Heavy Duty Intercity Sleeper',
        rating: 4.7,
        reviewsCount: 893,
        departureTime: '23:05',
        arrivalTime: '06:00',
        duration: '06h 55m',
        nextDay: true,
        startingPrice: 981,
        originalPrice: 1399,
        discountBadge: 'Last min. 10% OFF',
        discountNote: 'Hurry! Offer ends soon',
        busAge: 'New Bus (2 months old)',
        safetyRating: 'Enhanced Safety (4.8/5)',
        images: BUSES[0].images,
        highlights: BUSES[0].highlights,
        cancellationPolicy: BUSES[0].cancellationPolicy,
        boardingPoints: [
          { id: 'bp-gen-1', name: `${from} Central Bus Station`, time: '23:05', landmark: 'Main Stand Counter 4' },
          { id: 'bp-gen-2', name: `${from} Highway Bypass`, time: '23:40', landmark: 'Expressway Toll Gate' }
        ],
        droppingPoints: [
          { id: 'dp-gen-1', name: `${to} Outer Bypass`, time: '05:30', landmark: 'Highway Circle' },
          { id: 'dp-gen-2', name: `${to} Central Stand`, time: '06:00', landmark: 'City Center Terminal' }
        ],
        routeStops: [
          { stop: `${from} Station`, time: '23:05', distance: '0 km', halt: 'Start' },
          { stop: 'Midway Oasis Dhaba', time: '02:00', distance: '120 km', halt: '25 min Refreshment' },
          { stop: `${to} Stand`, time: '06:00', distance: '235 km', halt: 'Arrival' }
        ],
        seats: BUSES[0].seats
      },
      {
        id: `BUS-${from.substring(0,3).toUpperCase()}-${to.substring(0,3).toUpperCase()}-02`,
        from: from,
        to: to,
        operator: 'Shuana Luxury Sleeper Pro',
        serviceName: 'Shuana Club Diamond',
        busType: 'Volvo 9600 Multi-Axle A/C Sleeper (2+1)',
        model: 'Volvo 9600 B11R 15m Club Class',
        rating: 4.9,
        reviewsCount: 1420,
        departureTime: '22:15',
        arrivalTime: '05:15',
        duration: '07h 00m',
        nextDay: true,
        startingPrice: 1050,
        originalPrice: 1550,
        discountBadge: 'Flat 15% OFF',
        discountNote: 'Instant online discount applied',
        busAge: 'Brand New (1 month old)',
        safetyRating: 'Volvo Certified Safety (5/5)',
        images: BUSES[1].images,
        highlights: BUSES[1].highlights,
        cancellationPolicy: BUSES[1].cancellationPolicy,
        boardingPoints: [
          { id: 'bp-gen-21', name: `${from} ISBT`, time: '22:15', landmark: 'Interstate Stand' }
        ],
        droppingPoints: [
          { id: 'dp-gen-21', name: `${to} Central Depot`, time: '05:15', landmark: 'Central City' }
        ],
        routeStops: [
          { stop: `${from}`, time: '22:15', distance: '0 km', halt: 'Start' },
          { stop: 'Highway Plaza', time: '01:30', distance: '120 km', halt: '20 min Rest' },
          { stop: `${to}`, time: '05:15', distance: '235 km', halt: 'End' }
        ],
        seats: BUSES[1].seats
      }
    ];
  }

  res.json({
    success: true,
    count: results.length,
    from,
    to,
    date: date || new Date().toISOString().split('T')[0],
    data: results
  });
});

// 4. Get Bus by ID
app.get('/api/buses/:id', (req, res) => {
  const { id } = req.params;
  const bus = BUSES.find(b => b.id.toLowerCase() === id.toLowerCase());

  if (bus) {
    return res.json({ success: true, data: bus });
  }

  // Check generated buses
  res.json({
    success: true,
    data: {
      ...BUSES[0],
      id: id,
      operator: 'Humsafar Travels'
    }
  });
});

// 5. Razorpay Create Order Endpoint
app.post('/api/payments/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, notes } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
    }

    // If real Razorpay instance is active
    if (razorpay) {
      const order = await razorpay.orders.create({
        amount: Math.round(amount * 100), // in paise
        currency,
        receipt: receipt || `rcpt_${Date.now()}`,
        notes: notes || {}
      });

      return res.json({
        success: true,
        mode: 'real',
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: razorpayKeyId
      });
    }

    // Seamless simulated order response
    const mockOrderId = `order_${crypto.randomBytes(8).toString('hex')}`;
    return res.json({
      success: true,
      mode: 'simulated',
      orderId: mockOrderId,
      amount: Math.round(amount * 100),
      currency: 'INR',
      key: 'rzp_test_simulated_key'
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 6. Razorpay Verify Payment Endpoint
app.post('/api/payments/verify', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (razorpay && razorpayKeySecret) {
      const generatedSignature = crypto
        .createHmac('sha256', razorpayKeySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        return res.status(400).json({ success: false, message: 'Invalid payment signature' });
      }
    }

    res.json({
      success: true,
      message: 'Payment verified successfully',
      paymentId: razorpay_payment_id || `pay_${Date.now()}`,
      orderId: razorpay_order_id
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 7. Create & Persist Booking
app.post('/api/bookings', (req, res) => {
  try {
    const bookingData = req.body;

    const pnr = `SHU-${Math.floor(100000 + Math.random() * 900000)}-${(bookingData.to || 'BUS').substring(0, 3).toUpperCase()}`;

    const newBooking = {
      pnr,
      ...bookingData,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString()
    };

    const bookings = readBookings();
    bookings.unshift(newBooking);
    writeBookings(bookings);

    res.status(201).json({
      success: true,
      message: 'Booking confirmed and ticket generated!',
      data: newBooking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 8. Get All Bookings
app.get('/api/bookings', (req, res) => {
  const bookings = readBookings();
  res.json({ success: true, data: bookings });
});

// 9. Get Single Booking by PNR
app.get('/api/bookings/:pnr', (req, res) => {
  const { pnr } = req.params;
  const bookings = readBookings();
  const found = bookings.find(b => b.pnr.toLowerCase() === pnr.toLowerCase());

  if (!found) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }

  res.json({ success: true, data: found });
});

app.listen(PORT, () => {
  console.log(`🚀 Shuana Bus Backend API Server is running on http://localhost:${PORT}`);
});
