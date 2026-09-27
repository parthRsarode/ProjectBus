// Backend Bus Database with realistic bus photos, deck seats, policies, and routes

export const CITIES = [
  { id: 'CIDCO', name: 'CIDCO (Aurangabad)', state: 'Maharashtra', code: 'CDO' },
  { id: 'Pune', name: 'Pune', state: 'Maharashtra', code: 'PUN' },
  { id: 'Mumbai', name: 'Mumbai', state: 'Maharashtra', code: 'BOM' },
  { id: 'Delhi', name: 'Delhi', state: 'Delhi NCR', code: 'DEL' },
  { id: 'Manali', name: 'Manali', state: 'Himachal Pradesh', code: 'MNL' },
  { id: 'Jaipur', name: 'Jaipur', state: 'Rajasthan', code: 'JAI' },
  { id: 'Bangalore', name: 'Bengaluru', state: 'Karnataka', code: 'BLR' },
  { id: 'Goa', name: 'Goa (Panaji)', state: 'Goa', code: 'GOA' }
];

export const BUSES = [
  {
    id: 'BUS-HUMSAFAR-01',
    from: 'CIDCO',
    to: 'Pune',
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
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
        caption: 'Yellow Luxury Sleeper Exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
        caption: 'Highway Frontal View'
      },
      {
        url: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=800&q=80',
        caption: 'Comfortable Sleeper Cabin Interior'
      }
    ],
    highlights: [
      { icon: 'medal', title: 'New Bus', desc: '2 months old luxury coach' },
      { icon: 'shield', title: 'Bus Safety', desc: 'Enhanced safety with CCTV & speed governor' },
      { icon: 'clock', title: 'On-Time Departure', desc: '98% on-time track record' },
      { icon: 'wifi', title: 'Free High Speed WiFi', desc: 'Continuous 4G connectivity on board' },
      { icon: 'zap', title: 'Personal Charging Port', desc: 'Each berth has USB + standard plug' }
    ],
    cancellationPolicy: [
      {
        timeframe: 'Before 27 Sep 11:05 (24+ hrs)',
        withoutFree: '₹120 deduction (Approx 90% refund)',
        withFree: 'Full 100% Refund'
      },
      {
        timeframe: 'Between 27 Sep 11:05 - 17:05 (12 - 24 hrs)',
        withoutFree: '20% deduction (80% refund)',
        withFree: 'Full 100% Refund'
      },
      {
        timeframe: 'Between 27 Sep 17:05 - 21:05 (2 - 12 hrs)',
        withoutFree: '50% deduction (50% refund)',
        withFree: 'Full 100% Refund'
      },
      {
        timeframe: 'After 27 Sep 21:05 (0 - 2 hrs)',
        withoutFree: 'No refund available',
        withFree: '50% Refund'
      }
    ],
    boardingPoints: [
      { id: 'bp-1', name: 'CIDCO Bus Stand / Cannaught Place', time: '23:05', landmark: 'Opp. Seven Hills Flyover, Jalna Road' },
      { id: 'bp-2', name: 'Kranti Chowk Bus Stop', time: '23:25', landmark: 'Near Shivaji Maharaj Statue' },
      { id: 'bp-3', name: 'Waluj MIDC Tiraha', time: '23:55', landmark: 'Oasis Chowk, Nagar Highway' }
    ],
    droppingPoints: [
      { id: 'dp-1', name: 'Wagholi (Near Lexicon Estate)', time: '05:00', landmark: 'Pune Nagar Road' },
      { id: 'dp-2', name: 'Viman Nagar (Four Points Sheraton)', time: '05:20', landmark: 'Viman Nagar Corner' },
      { id: 'dp-3', name: 'Yerwada Gunjan Talkies', time: '05:35', landmark: 'Airport Road Junction' },
      { id: 'dp-4', name: 'Shivajinagar (Near Bank of Maharashtra)', time: '05:50', landmark: 'FC Road Junction' },
      { id: 'dp-5', name: 'Swargate (Near Laxmi Narayan Theater)', time: '06:00', landmark: 'Jedhe Chowk, Swargate' }
    ],
    routeStops: [
      { stop: 'CIDCO Bus Stand (Origin)', time: '23:05', distance: '0 km', halt: 'Start' },
      { stop: 'Kranti Chowk', time: '23:25', distance: '6 km', halt: 'Boarding' },
      { stop: 'Waluj MIDC', time: '23:55', distance: '22 km', halt: 'Boarding' },
      { stop: 'Ahmednagar Smile Stone Highway Oasis', time: '02:00', distance: '120 km', halt: '25 min Tea & Restroom' },
      { stop: 'Shikrapur Toll Plaza', time: '04:15', distance: '190 km', halt: '5 min Stop' },
      { stop: 'Wagholi', time: '05:00', distance: '215 km', halt: 'Drop Stop' },
      { stop: 'Pune Swargate (Destination)', time: '06:00', distance: '235 km', halt: 'Arrival' }
    ],
    // Exact seat layout matching the user's screenshot
    seats: {
      lowerDeck: [
        // Row 1 (Top)
        { id: 'L1', name: 'L1', col: 1, type: 'sleeper', status: 'sold', gender: 'male', price: 1080 },
        { id: 'L2', name: 'L2', col: 2, type: 'sleeper', status: 'sold', gender: 'male', price: 1080 },
        { id: 'L3', name: 'L3', col: 3, type: 'sleeper', status: 'sold', gender: 'male', price: 1080 },

        // Row 2
        { id: 'L4', name: 'L4', col: 1, type: 'sleeper', status: 'sold', gender: 'female', price: 1100 },
        { id: 'L5', name: 'L5', col: 2, type: 'sleeper', status: 'available_female', gender: 'female', price: 1224 },
        { id: 'L6', name: 'L6', col: 3, type: 'sleeper', status: 'sold', gender: 'female', price: 1100 },

        // Row 3
        { id: 'L7', name: 'L7', col: 1, type: 'sleeper', status: 'sold', gender: 'male', price: 1080 },
        { id: 'L8', name: 'L8', col: 2, type: 'sleeper', status: 'sold', gender: 'male', price: 1080 },
        { id: 'L9', name: 'L9', col: 3, type: 'sleeper', status: 'sold', gender: 'male', price: 1080 },

        // Row 4
        { id: 'L10', name: 'L10', col: 1, type: 'sleeper', status: 'sold', gender: 'female', price: 1080 },
        { id: 'L11', name: 'L11', col: 2, type: 'sleeper', status: 'sold', gender: 'female', price: 1080 },
        { id: 'L12', name: 'L12', col: 3, type: 'sleeper', status: 'sold', gender: 'female', price: 1080 },

        // Row 5
        { id: 'L13', name: 'L13', col: 1, type: 'sleeper', status: 'sold', gender: 'male', price: 1080 },
        { id: 'L14', name: 'L14', col: 2, type: 'sleeper', status: 'sold', gender: 'male', price: 1080 },
        { id: 'L15', name: 'L15', col: 3, type: 'sleeper', status: 'sold', gender: 'male', price: 1080 },

        // Row 6 (Bottom)
        { id: 'L16', name: 'L16', col: 1, type: 'sleeper', status: 'sold', gender: 'male', price: 1080 },
        { id: 'L17', name: 'L17', col: 2, type: 'sleeper', status: 'available', gender: 'any', price: 1080 },
        { id: 'L18', name: 'L18', col: 3, type: 'sleeper', status: 'available', gender: 'any', price: 1080 }
      ],
      upperDeck: [
        // Row 1 (Top)
        { id: 'U1', name: 'U1', col: 1, type: 'sleeper', status: 'sold', gender: 'female', price: 1089 },
        { id: 'U2', name: 'U2', col: 2, type: 'sleeper', status: 'available', gender: 'any', price: 1089 },
        { id: 'U3', name: 'U3', col: 3, type: 'sleeper', status: 'sold', gender: 'male', price: 1089 },

        // Row 2
        { id: 'U4', name: 'U4', col: 1, type: 'sleeper', status: 'sold', gender: 'female', price: 1287 },
        { id: 'U5', name: 'U5', col: 2, type: 'sleeper', status: 'available', gender: 'any', price: 1287 },
        { id: 'U6', name: 'U6', col: 3, type: 'sleeper', status: 'available', gender: 'any', price: 1287 },

        // Row 3
        { id: 'U7', name: 'U7', col: 1, type: 'sleeper', status: 'sold', gender: 'female', price: 1287 },
        { id: 'U8', name: 'U8', col: 2, type: 'sleeper', status: 'available', gender: 'any', price: 1287 },
        { id: 'U9', name: 'U9', col: 3, type: 'sleeper', status: 'available', gender: 'any', price: 1287 },

        // Row 4
        { id: 'U10', name: 'U10', col: 1, type: 'sleeper', status: 'sold', gender: 'male', price: 1080 },
        { id: 'U11', name: 'U11', col: 2, type: 'sleeper', status: 'sold', gender: 'male', price: 1080 },
        { id: 'U12', name: 'U12', col: 3, type: 'sleeper', status: 'sold', gender: 'female', price: 1080 },

        // Row 5
        { id: 'U13', name: 'U13', col: 1, type: 'sleeper', status: 'sold', gender: 'female', price: 981 },
        { id: 'U14', name: 'U14', col: 2, type: 'sleeper', status: 'available', gender: 'any', price: 981 },
        { id: 'U15', name: 'U15', col: 3, type: 'sleeper', status: 'sold', gender: 'male', price: 981 },

        // Row 6 (Bottom)
        { id: 'U16', name: 'U16', col: 1, type: 'sleeper', status: 'available', gender: 'any', price: 1287 },
        { id: 'U17', name: 'U17', col: 2, type: 'sleeper', status: 'available', gender: 'any', price: 1080 },
        { id: 'U18', name: 'U18', col: 3, type: 'sleeper', status: 'available', gender: 'any', price: 1080 }
      ]
    }
  },
  {
    id: 'BUS-SHUANA-EXP-02',
    from: 'CIDCO',
    to: 'Pune',
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
    images: [
      {
        url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
        caption: 'Volvo 9600 Luxury Exterior'
      },
      {
        url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
        caption: 'Highway Cruise'
      },
      {
        url: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=800&q=80',
        caption: 'Spacious Sleeper Berths'
      }
    ],
    highlights: [
      { icon: 'medal', title: 'Brand New Coach', desc: '1 month old Volvo 9600' },
      { icon: 'shield', title: 'Air Suspension', desc: 'Ultra-smooth ride with zero vibration' },
      { icon: 'clock', title: 'Fastest Highway Transit', desc: 'Non-stop expressway corridor' }
    ],
    cancellationPolicy: [
      { timeframe: 'Before 24 hrs', withoutFree: '10% deduction', withFree: '100% Refund' },
      { timeframe: '12 - 24 hrs', withoutFree: '25% deduction', withFree: '100% Refund' },
      { timeframe: '0 - 12 hrs', withoutFree: 'No refund', withFree: '50% Refund' }
    ],
    boardingPoints: [
      { id: 'bp-21', name: 'CIDCO Cannaught Place', time: '22:15', landmark: 'Jalna Road' },
      { id: 'bp-22', name: 'Kranti Chowk Flyover', time: '22:45', landmark: 'Opp. State Bank' }
    ],
    droppingPoints: [
      { id: 'dp-21', name: 'Wagholi', time: '04:30', landmark: 'Nagar Highway' },
      { id: 'dp-22', name: 'Pune Swargate', time: '05:15', landmark: 'Central Stand' }
    ],
    routeStops: [
      { stop: 'CIDCO', time: '22:15', distance: '0 km', halt: 'Start' },
      { stop: 'Nagar Midway Plaza', time: '01:30', distance: '120 km', halt: '20 min Rest' },
      { stop: 'Pune Swargate', time: '05:15', distance: '235 km', halt: 'End' }
    ],
    seats: {
      lowerDeck: [
        { id: 'L1', name: 'L1', col: 1, type: 'sleeper', status: 'available', gender: 'any', price: 1050 },
        { id: 'L2', name: 'L2', col: 2, type: 'sleeper', status: 'sold', gender: 'male', price: 1050 },
        { id: 'L3', name: 'L3', col: 3, type: 'sleeper', status: 'available', gender: 'any', price: 1050 },
        { id: 'L4', name: 'L4', col: 1, type: 'sleeper', status: 'sold', gender: 'female', price: 1050 },
        { id: 'L5', name: 'L5', col: 2, type: 'sleeper', status: 'available_female', gender: 'female', price: 1150 },
        { id: 'L6', name: 'L6', col: 3, type: 'sleeper', status: 'available', gender: 'any', price: 1050 },
        { id: 'L7', name: 'L7', col: 1, type: 'sleeper', status: 'available', gender: 'any', price: 1050 },
        { id: 'L8', name: 'L8', col: 2, type: 'sleeper', status: 'sold', gender: 'male', price: 1050 },
        { id: 'L9', name: 'L9', col: 3, type: 'sleeper', status: 'available', gender: 'any', price: 1050 },
        { id: 'L10', name: 'L10', col: 1, type: 'sleeper', status: 'sold', gender: 'male', price: 1050 },
        { id: 'L11', name: 'L11', col: 2, type: 'sleeper', status: 'available', gender: 'any', price: 1050 },
        { id: 'L12', name: 'L12', col: 3, type: 'sleeper', status: 'available', gender: 'any', price: 1050 }
      ],
      upperDeck: [
        { id: 'U1', name: 'U1', col: 1, type: 'sleeper', status: 'available', gender: 'any', price: 1150 },
        { id: 'U2', name: 'U2', col: 2, type: 'sleeper', status: 'available', gender: 'any', price: 1150 },
        { id: 'U3', name: 'U3', col: 3, type: 'sleeper', status: 'sold', gender: 'male', price: 1150 },
        { id: 'U4', name: 'U4', col: 1, type: 'sleeper', status: 'available', gender: 'any', price: 1150 },
        { id: 'U5', name: 'U5', col: 2, type: 'sleeper', status: 'available', gender: 'any', price: 1150 },
        { id: 'U6', name: 'U6', col: 3, type: 'sleeper', status: 'sold', gender: 'male', price: 1150 },
        { id: 'U7', name: 'U7', col: 1, type: 'sleeper', status: 'sold', gender: 'female', price: 1150 },
        { id: 'U8', name: 'U8', col: 2, type: 'sleeper', status: 'available', gender: 'any', price: 1150 },
        { id: 'U9', name: 'U9', col: 3, type: 'sleeper', status: 'available', gender: 'any', price: 1150 },
        { id: 'U10', name: 'U10', col: 1, type: 'sleeper', status: 'available', gender: 'any', price: 1150 },
        { id: 'U11', name: 'U11', col: 2, type: 'sleeper', status: 'available', gender: 'any', price: 1150 },
        { id: 'U12', name: 'U12', col: 3, type: 'sleeper', status: 'available', gender: 'any', price: 1150 }
      ]
    }
  },
  {
    id: 'BUS-DEL-MNL-01',
    from: 'Delhi',
    to: 'Manali',
    operator: 'Shuana Himalayan Express',
    serviceName: 'Electric SmartBus 9600',
    busType: 'Zero-Emission EV Sleeper (2+1)',
    model: '13.5m Low-Floor Electric Mountain Cruiser',
    rating: 4.8,
    reviewsCount: 3120,
    departureTime: '20:30',
    arrivalTime: '07:30',
    duration: '11h 00m',
    nextDay: true,
    startingPrice: 949,
    originalPrice: 1499,
    discountBadge: 'Save ₹550 Today',
    discountNote: 'Special winter mountain fare',
    busAge: 'New EV (3 months old)',
    safetyRating: 'Hill Certified Safety',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
        caption: 'Electric SmartBus'
      },
      {
        url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
        caption: 'Himalayan Highway'
      }
    ],
    highlights: [
      { icon: 'medal', title: '100% Electric EV', desc: 'Zero emissions and whisper-quiet ride' },
      { icon: 'shield', title: 'Mountain Traction Control', desc: 'Dual-axle hill stabilization' }
    ],
    cancellationPolicy: [
      { timeframe: 'Before 24 hrs', withoutFree: '10% fee', withFree: '100% Refund' },
      { timeframe: '0 - 24 hrs', withoutFree: '50% fee', withFree: '75% Refund' }
    ],
    boardingPoints: [
      { id: 'bp-d1', name: 'Kashmere Gate Metro Gate 1', time: '20:30', landmark: 'ISBT Ring Road' },
      { id: 'bp-d2', name: 'Majnu Ka Tilla', time: '21:00', landmark: 'Outer Ring Road' }
    ],
    droppingPoints: [
      { id: 'dp-m1', name: 'Kullu Bypass', time: '06:30', landmark: 'Sarvari River Bridge' },
      { id: 'dp-m2', name: 'Manali Private Bus Stand', time: '07:30', landmark: 'Mall Road Extension' }
    ],
    routeStops: [
      { stop: 'Delhi Kashmere Gate', time: '20:30', distance: '0 km', halt: 'Start' },
      { stop: 'Murthal Sukhdev Haveli', time: '22:15', distance: '55 km', halt: '35 min Dinner' },
      { stop: 'Karnal Toll Plaza', time: '00:30', distance: '135 km', halt: '10 min Stop' },
      { stop: 'Kullu Valley', time: '06:30', distance: '510 km', halt: 'Drop' },
      { stop: 'Manali Stand', time: '07:30', distance: '550 km', halt: 'Arrival' }
    ],
    seats: {
      lowerDeck: [
        { id: 'L1', name: 'L1', col: 1, type: 'sleeper', status: 'available', gender: 'any', price: 949 },
        { id: 'L2', name: 'L2', col: 2, type: 'sleeper', status: 'sold', gender: 'male', price: 949 },
        { id: 'L3', name: 'L3', col: 3, type: 'sleeper', status: 'available', gender: 'any', price: 949 },
        { id: 'L4', name: 'L4', col: 1, type: 'sleeper', status: 'sold', gender: 'female', price: 949 },
        { id: 'L5', name: 'L5', col: 2, type: 'sleeper', status: 'available', gender: 'any', price: 949 },
        { id: 'L6', name: 'L6', col: 3, type: 'sleeper', status: 'available', gender: 'any', price: 949 }
      ],
      upperDeck: [
        { id: 'U1', name: 'U1', col: 1, type: 'sleeper', status: 'available', gender: 'any', price: 1049 },
        { id: 'U2', name: 'U2', col: 2, type: 'sleeper', status: 'sold', gender: 'male', price: 1049 },
        { id: 'U3', name: 'U3', col: 3, type: 'sleeper', status: 'available', gender: 'any', price: 1049 },
        { id: 'U4', name: 'U4', col: 1, type: 'sleeper', status: 'available', gender: 'any', price: 1049 },
        { id: 'U5', name: 'U5', col: 2, type: 'sleeper', status: 'available', gender: 'any', price: 1049 },
        { id: 'U6', name: 'U6', col: 3, type: 'sleeper', status: 'sold', gender: 'female', price: 1049 }
      ]
    }
  }
];
