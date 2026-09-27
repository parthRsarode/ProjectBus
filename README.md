# 🚌 Shuana Bus — Real-World Bus Booking Platform

A production-grade, dynamic Bus Booking Web Application built with an **Express.js REST API Backend** and a **RedBus-inspired frontend interface** matching the exact real-world layout.

---

## 🌟 What's New & Upgraded

### 1. ⚙️ Real Express.js Backend Server (`http://localhost:5001`)
- **RESTful Endpoints**:
  - `GET /api/health`: Health status & Razorpay configuration status.
  - `GET /api/cities`: List of supported origin and destination hubs.
  - `GET /api/buses?from=...&to=...&date=...`: Search buses with real-time seat matrices, ratings, and schedules.
  - `GET /api/buses/:id`: Detailed bus information with high-resolution photos, intermediate route stops, and policies.
  - `POST /api/payments/create-order`: Generates Razorpay orders (supports real credentials or instant demo mode).
  - `POST /api/payments/verify`: Verifies Razorpay payment signatures.
  - `POST /api/bookings`: Confirms and stores booking records persistently in `server/data/bookings.json`.
  - `GET /api/bookings`: Retrieves all confirmed user bookings.
  - `GET /api/bookings/:pnr`: Fetches a single booking by PNR.

### 2. 💺 Screenshot Replication (RedBus Dual Deck Layout)
- **Top Sub-Header Bar**:
  - `✕ CIDCO ➔ Pune` with quick navigation back to search.
  - Step navigation: `Select seats` (with red underline indicator) ➔ `Board/Drop point` ➔ `Passenger Info`.
  - Corner badge: `Last min. 10% OFF`.
- **Dual Vertical Deck Shells**:
  - **`Lower deck`**: Features driver steering wheel icon at the top right, `Emergency Exit ➔` side indicator, and 2+1 sleeper berths.
  - **`Upper deck`**: Rendered side-by-side with exact berth styles.
  - **Berth States**:
    - Faint gray with male silhouette: `Sold`.
    - Soft pink hue with female icon: Female reserved / `Sold`.
    - Crisp green outline with price: Available (e.g. `₹1080`, `₹1287`, `₹1224`).
    - Blue filled with person icon: Selected (e.g. `₹1089`, `₹981`).
- **Interactive Multi-Step Booking**:
  - Sticky bottom bar shows selected seat IDs and live total fare.
  - Multi-step progression: **Select seats** ➔ **Boarding & Dropping Points** ➔ **Passenger Details & Razorpay Checkout**.

### 3. 📄 Dedicated Bus Details & Information Page
- Clicking **any bus** from search results navigates directly to its dedicated page.
- **Photo Gallery**: Exterior luxury sleeper bus, highway frontal view, and comfortable cabin interior.
- **Tabbed Information**:
  - **`Highlights`**: `New Bus (2 months old)` with gold medal, `Bus Safety (Enhanced >)`, and limited-time offer banner.
  - **`Cancellation policy`**: Full refund percentage table (`Time before travel`, `Without free cancellation`, `With free cancellation`).
  - **`Boarding point` & `Dropping point`**: Specific stop addresses and pickup times.
  - **`Bus route`**: Intermediate highway halts and distances.

### 4. 💳 Razorpay Payment Gateway Integration
- Order creation & verification handled securely through the Express backend.
- Supports adding real `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `.env`.
- Out-of-the-box instant simulated gateway with UPI QR scanning, Cards, and NetBanking.

---

## 🚀 Running the Project

### Start Both Backend & Frontend Concurrently:
```bash
npm run dev
```

- **Frontend (Vite)**: [http://localhost:3000](http://localhost:3000)
- **Backend (Express)**: [http://localhost:5001](http://localhost:5001)

### Start Services Individually:
```bash
# Start Express Backend API
npm run start:backend

# Start Vite Frontend
npm run start:frontend
```
