# Roadmap: Shuana Bus Platform

## Overview
Shuana Bus provides a real-world, production-ready bus ticket booking experience with an Express backend, authentic redBus layout, dual deck seat selector, Razorpay integration, and Dark/Light mode.

## Phases

- [x] **Phase 1: Backend Architecture & REST APIs** - Built Express.js backend with bus search, Razorpay order/verify, and persistent bookings JSON storage.
- [x] **Phase 2: RedBus Layout & Dual Vertical Deck** - Built redBus style capsule search, dedicated bus details page, and realistic dual vertical deck (Lower & Upper deck).
- [x] **Phase 3: Violet Theme, Dark Mode & Goa Featured Banner** - Implemented Royal Electric Violet color palette, instant webapp Dark/Light mode toggle, and featured Chyll Goa 4D/3N holiday banner.
- [x] **Phase 4: Production Verification & End-to-End Audit** - Verified frontend, backend, responsive breakpoints, build pipeline, and payment simulation.

## Phase Details

### Phase 1: Backend Architecture & REST APIs
**Goal**: Build Express server and REST endpoints.
**Depends on**: Nothing
**Requirements**: REQ-01, REQ-02
**Success Criteria**:
  1. Express server runs on port 5001 with CORS and JSON support.
  2. Endpoints `/api/buses`, `/api/buses/:id`, `/api/payments/create-order`, `/api/bookings` return proper JSON.
  3. Bookings are persisted to disk in `server/data/bookings.json`.
**Plans**: 1 plan

Plans:
- [x] 01-01: Express backend setup with REST endpoints and data models

### Phase 2: RedBus Layout & Dual Vertical Deck
**Goal**: Dedicated bus details view matching user's redBus screenshot.
**Depends on**: Phase 1
**Requirements**: REQ-03, REQ-04, REQ-05, REQ-06, REQ-07, REQ-08
**Success Criteria**:
  1. Clicking any bus navigates to a dedicated page with `✕ CIDCO ➔ Pune`.
  2. Dual vertical decks (Lower deck with steering wheel & Emergency Exit, Upper deck) render 2+1 layout.
  3. Multi-step checkout flow (Select seats ➔ Board/Drop point ➔ Passenger Info ➔ Razorpay Payment).
**Plans**: 1 plan

Plans:
- [x] 02-01: RedBus layout, bus details view, dual deck berth matrix, and ticket pass

### Phase 3: Violet Theme, Dark Mode & Goa Featured Banner
**Goal**: Transform color palette to Royal Violet, provide webapp Dark/Light toggle, and embed Goa Chyll banner.
**Depends on**: Phase 2
**Requirements**: REQ-09, REQ-10
**Success Criteria**:
  1. Dark/Light mode toggle switch available directly in the header navbar.
  2. Brand palette updated to Royal Electric Violet (`#7C3AED` / `#8B5CF6`).
  3. User's Goa Chyll 4D/3N banner featured in the first appearance hero section.
**Plans**: 1 plan

Plans:
- [x] 03-01: Violet design tokens, theme controller, dark/light CSS variables, and Goa banner

### Phase 4: Production Verification & End-to-End Audit
**Goal**: Validate full pipeline, builds, and server health.
**Depends on**: Phase 3
**Requirements**: REQ-01 through REQ-10
**Success Criteria**:
  1. Vite production build completes with 0 errors.
  2. Express backend and Vite frontend run simultaneously.
  3. Booking flow and API integration execute without failures.
**Plans**: 1 plan

Plans:
- [x] 04-01: End-to-end integration and milestone validation
