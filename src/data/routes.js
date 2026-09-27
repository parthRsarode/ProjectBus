// Comprehensive Bus Routes & Schedules Data
export const CITIES = [
  { id: 'delhi', name: 'Delhi', state: 'Delhi NCR', popular: true },
  { id: 'manali', name: 'Manali', state: 'Himachal Pradesh', popular: true },
  { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', popular: true },
  { id: 'shimla', name: 'Shimla', state: 'Himachal Pradesh', popular: true },
  { id: 'chandigarh', name: 'Chandigarh', state: 'Punjab/Haryana', popular: true },
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', popular: true },
  { id: 'pune', name: 'Pune', state: 'Maharashtra', popular: true },
  { id: 'goa', name: 'Goa (Panaji)', state: 'Goa', popular: true },
  { id: 'bangalore', name: 'Bengaluru', state: 'Karnataka', popular: true },
  { id: 'rishikesh', name: 'Rishikesh', state: 'Uttarakhand', popular: true }
];

export const POPULAR_ROUTES = [
  { from: 'delhi', to: 'manali', label: 'Delhi ⇄ Manali', badge: 'Trending' },
  { from: 'delhi', to: 'jaipur', label: 'Delhi ⇄ Jaipur', badge: 'High Frequency' },
  { from: 'mumbai', to: 'pune', label: 'Mumbai ⇄ Pune', badge: 'Expressway' },
  { from: 'delhi', to: 'shimla', label: 'Delhi ⇄ Shimla', badge: 'Scenic' },
  { from: 'bangalore', to: 'goa', label: 'Bengaluru ⇄ Goa', badge: 'Weekend Special' },
  { from: 'pune', to: 'goa', label: 'Pune ⇄ Goa', badge: 'Fastest Route' }
];

export const BUS_DATABASE = [
  // Delhi to Manali
  {
    id: 'SHU-DEL-MNL-01',
    from: 'delhi',
    to: 'manali',
    name: 'Shuana EV SmartBus Premium Sleeper',
    operator: 'Shuana Green Mobility',
    model: 'Zero-Emission 13.5m Electric AC Sleeper',
    busType: 'Electric AC Sleeper (2+1)',
    badge: '⚡ 100% Electric EV',
    badgeType: 'green',
    rating: 4.9,
    reviewsCount: 3240,
    departureTime: '20:30',
    arrivalTime: '07:30',
    duration: '11h 00m',
    nextDay: true,
    price: 949,
    originalPrice: 1399,
    discountTag: 'Save ₹450',
    seatsLeft: 7,
    liveTrackingAvailable: true,
    onTimeGuarantee: true,
    amenities: [
      { name: 'High Speed 5G WiFi', icon: 'wifi' },
      { name: 'USB Fast Charging', icon: 'zap' },
      { name: 'Clean Blanket & Pillow', icon: 'package' },
      { name: 'Complimentary Water Bottle', icon: 'droplet' },
      { name: 'Reading Light', icon: 'sun' },
      { name: 'Emergency SOS & GPS', icon: 'shield-check' },
      { name: 'On-Board Restroom', icon: 'award' }
    ],
    boardingPoints: [
      { id: 'bp-1', name: 'Kashmere Gate Metro Gate No 1', time: '20:30', address: 'Near Tibetan Market, Ring Road, Delhi' },
      { id: 'bp-2', name: 'Majnu Ka Tilla Gurudwara', time: '21:00', address: 'Outer Ring Road, North Delhi' },
      { id: 'bp-3', name: 'Karnal Bypass / Singhu Border', time: '21:45', address: 'NH44 Near Mukarba Chowk Flyover' }
    ],
    droppingPoints: [
      { id: 'dp-1', name: 'Kullu Bypass Bus Stand', time: '06:15', address: 'Near Sarvari River Bridge, Kullu' },
      { id: 'dp-2', name: 'Patlikuhal Chowk', time: '06:55', address: 'Manali Highway Junction' },
      { id: 'dp-3', name: 'Manali Private Bus Stand', time: '07:30', address: 'Mall Road Extension, Manali' }
    ],
    intermediateStops: [
      { stop: 'Delhi ISBT Kashmere Gate', time: '20:30', distance: '0 km', halt: 'Origin Point' },
      { stop: 'Murthal Sukhdev Dhaba', time: '22:15', distance: '55 km', halt: '35 min Dinner & EV Charging Halt' },
      { stop: 'Panipat Toll Plaza', time: '23:30', distance: '95 km', halt: '5 min Stop' },
      { stop: 'Karnal Oasis Midway', time: '00:45', distance: '135 km', halt: '10 min Stop' },
      { stop: 'Ambala Cantt Junction', time: '02:15', distance: '210 km', halt: '10 min Stop' },
      { stop: 'Chandigarh Bypass (Zirakpur)', time: '03:00', distance: '255 km', halt: '15 min Stop' },
      { stop: 'Bilaspur Highway Hub', time: '04:45', distance: '380 km', halt: '10 min Stop' },
      { stop: 'Mandi Pandoh Dam', time: '05:30', distance: '450 km', halt: '10 min Stop' },
      { stop: 'Kullu Valley', time: '06:30', distance: '510 km', halt: '15 min Drop Stop' },
      { stop: 'Manali Mall Road Hub', time: '07:30', distance: '550 km', halt: 'Final Destination' }
    ],
    driverInfo: {
      name: 'Rajinder Kumar (Star Captain)',
      experience: '12+ Years Safe Driving',
      contact: '+91 98765 43210',
      vehicleNo: 'DL 01 EV 8899',
      currentLocation: 'Karnal Bypass (NH44)',
      speed: '68 km/h'
    }
  },
  {
    id: 'SHU-DEL-MNL-02',
    from: 'delhi',
    to: 'manali',
    name: 'Volvo 9600 Multi-Axle Club Class',
    operator: 'Shuana Signature Express',
    model: 'Volvo 9600 B11R 15m Multi-Axle Sleeper',
    busType: 'Volvo AC Sleeper (2+1)',
    badge: '👑 Club Luxury',
    badgeType: 'purple',
    rating: 4.8,
    reviewsCount: 2890,
    departureTime: '21:15',
    arrivalTime: '08:00',
    duration: '10h 45m',
    nextDay: true,
    price: 1099,
    originalPrice: 1599,
    discountTag: 'Save ₹500',
    seatsLeft: 5,
    liveTrackingAvailable: true,
    onTimeGuarantee: true,
    amenities: [
      { name: 'Ultra-Soft Quilt & Pillow', icon: 'package' },
      { name: 'High Speed WiFi', icon: 'wifi' },
      { name: 'Individual LCD Screen', icon: 'tv' },
      { name: 'USB Fast Charging', icon: 'zap' },
      { name: 'Mineral Water & Snacks', icon: 'coffee' },
      { name: 'Air Suspension Smooth Ride', icon: 'truck' },
      { name: 'Emergency SOS Button', icon: 'shield-check' }
    ],
    boardingPoints: [
      { id: 'bp-21', name: 'Majnu Ka Tilla (Tibetan Market)', time: '21:15', address: 'Opp. Police Station, Delhi' },
      { id: 'bp-22', name: 'Kashmere Gate Metro Gate 1', time: '21:45', address: 'Inter State Bus Terminal' },
      { id: 'bp-23', name: 'Mukarba Chowk', time: '22:30', address: 'GT Karnal Road' }
    ],
    droppingPoints: [
      { id: 'dp-21', name: 'Kullu Green Tax Barrier', time: '07:00', address: 'NH3, Kullu' },
      { id: 'dp-22', name: 'Manali Private Bus Stand', time: '08:00', address: 'Near Government School, Manali' }
    ],
    intermediateStops: [
      { stop: 'Delhi Majnu Ka Tilla', time: '21:15', distance: '0 km', halt: 'Origin' },
      { stop: 'Murthal Haveli', time: '22:45', distance: '55 km', halt: '40 min Dinner Halt' },
      { stop: 'Karnal Toll', time: '01:00', distance: '135 km', halt: '5 min Stop' },
      { stop: 'Ambala Cantt', time: '02:30', distance: '210 km', halt: '10 min Stop' },
      { stop: 'Mandi Main Market', time: '06:00', distance: '450 km', halt: '15 min Tea Break' },
      { stop: 'Kullu Bypass', time: '07:00', distance: '510 km', halt: '10 min Stop' },
      { stop: 'Manali Bus Stand', time: '08:00', distance: '550 km', halt: 'End' }
    ],
    driverInfo: {
      name: 'Vikram Singh',
      experience: '9 Years Luxury Bus Pilot',
      contact: '+91 98112 34567',
      vehicleNo: 'HR 68 VL 9600',
      currentLocation: 'Murthal Toll',
      speed: '75 km/h'
    }
  },
  {
    id: 'SHU-DEL-MNL-03',
    from: 'delhi',
    to: 'manali',
    name: 'BharatBenz Ultra Comfort AC Seater',
    operator: 'Shuana Royal Liner',
    model: 'BharatBenz Glider 2+2 Semi-Sleeper Reclining',
    busType: 'AC Semi-Sleeper Seater (2+2)',
    badge: '💰 Best Value',
    badgeType: 'orange',
    rating: 4.6,
    reviewsCount: 1640,
    departureTime: '19:45',
    arrivalTime: '07:15',
    duration: '11h 30m',
    nextDay: true,
    price: 699,
    originalPrice: 999,
    discountTag: 'Save ₹300',
    seatsLeft: 12,
    liveTrackingAvailable: true,
    onTimeGuarantee: true,
    amenities: [
      { name: '140° Reclining Calf Support', icon: 'archive' },
      { name: 'USB Charging Point', icon: 'zap' },
      { name: 'Individual Reading Lamp', icon: 'sun' },
      { name: 'CCTV Surveillance & Safety', icon: 'shield-check' }
    ],
    boardingPoints: [
      { id: 'bp-31', name: 'ISBT Kashmiri Gate Counter 14', time: '19:45', address: 'Inter State Bus Terminal' },
      { id: 'bp-32', name: 'Rohini Sector 14 Metro', time: '20:30', address: 'Near Metro Gate 2' }
    ],
    droppingPoints: [
      { id: 'dp-31', name: 'Manali Mall Road Stand', time: '07:15', address: 'Main Manali Stand' }
    ],
    intermediateStops: [
      { stop: 'Delhi ISBT', time: '19:45', distance: '0 km', halt: 'Start' },
      { stop: 'Murthal Dhaba', time: '21:15', distance: '55 km', halt: '30 min Food Halt' },
      { stop: 'Chandigarh Outer', time: '01:45', distance: '255 km', halt: '10 min Stop' },
      { stop: 'Sundernagar', time: '04:30', distance: '410 km', halt: '10 min Stop' },
      { stop: 'Kullu', time: '06:00', distance: '510 km', halt: '10 min Stop' },
      { stop: 'Manali', time: '07:15', distance: '550 km', halt: 'Arrival' }
    ],
    driverInfo: {
      name: 'Sukhwinder Pal',
      experience: '15 Years Mountain Routes',
      contact: '+91 97234 11223',
      vehicleNo: 'HP 01 BB 4411',
      currentLocation: 'Singhu Border',
      speed: '62 km/h'
    }
  },

  // Delhi to Jaipur
  {
    id: 'SHU-DEL-JAI-01',
    from: 'delhi',
    to: 'jaipur',
    name: 'Shuana Express EV Bullet',
    operator: 'Shuana Green Mobility',
    model: '12m Low-Floor Electric Luxury Cruiser',
    busType: 'Electric AC Seater (2+2)',
    badge: '⚡ EV Non-Stop',
    badgeType: 'green',
    rating: 4.9,
    reviewsCount: 4120,
    departureTime: '06:30',
    arrivalTime: '11:15',
    duration: '04h 45m',
    nextDay: false,
    price: 449,
    originalPrice: 699,
    discountTag: 'Save ₹250',
    seatsLeft: 9,
    liveTrackingAvailable: true,
    onTimeGuarantee: true,
    amenities: [
      { name: 'Ultra High Speed WiFi', icon: 'wifi' },
      { name: 'Snack Box & Juice', icon: 'coffee' },
      { name: 'Type-C Quick Charging', icon: 'zap' },
      { name: 'GPS Live Highway Radar', icon: 'navigation' }
    ],
    boardingPoints: [
      { id: 'bp-j1', name: 'Dhaula Kuan Metro Station', time: '06:30', address: 'Ring Road, Delhi' },
      { id: 'bp-j2', name: 'IFFCO Chowk, Gurgaon', time: '07:15', address: 'Near IFFCO Chowk Metro, NH48' },
      { id: 'bp-j3', name: 'Rajeev Chowk Flyover, Gurgaon', time: '07:30', address: 'NH48 Exit 9' }
    ],
    droppingPoints: [
      { id: 'dp-j1', name: 'Transport Nagar, Jaipur', time: '10:45', address: 'Jaipur Delhi Highway' },
      { id: 'dp-j2', name: 'Narayan Singh Circle', time: '11:00', address: 'Near City Hospital' },
      { id: 'dp-j3', name: 'Sindhi Camp Bus Stand', time: '11:15', address: 'Central Bus Stand, Jaipur' }
    ],
    intermediateStops: [
      { stop: 'Delhi Dhaula Kuan', time: '06:30', distance: '0 km', halt: 'Origin' },
      { stop: 'Gurgaon IFFCO Chowk', time: '07:15', distance: '28 km', halt: 'Boarding Point' },
      { stop: 'Neemrana Highway Midway', time: '08:45', distance: '122 km', halt: '20 min Breakfast Halt' },
      { stop: 'Kotputli Bypass', time: '09:30', distance: '160 km', halt: '5 min Stop' },
      { stop: 'Jaipur Sindhi Camp', time: '11:15', distance: '270 km', halt: 'Destination' }
    ],
    driverInfo: {
      name: 'Mohit Sharma',
      experience: '8 Years NH48 Express Driving',
      contact: '+91 99881 22334',
      vehicleNo: 'RJ 14 EV 9900',
      currentLocation: 'Neemrana Plaza',
      speed: '82 km/h'
    }
  },
  {
    id: 'SHU-DEL-JAI-02',
    from: 'delhi',
    to: 'jaipur',
    name: 'Scania Multi-Axle Diamond Sleeper',
    operator: 'Shuana Royal Travels',
    model: 'Scania Touring HD 14.5m Sleeper',
    busType: 'Scania AC Sleeper (2+1)',
    badge: '⭐ Top Rated',
    badgeType: 'purple',
    rating: 4.8,
    reviewsCount: 1980,
    departureTime: '17:00',
    arrivalTime: '22:15',
    duration: '05h 15m',
    nextDay: false,
    price: 549,
    originalPrice: 849,
    discountTag: 'Save ₹300',
    seatsLeft: 6,
    liveTrackingAvailable: true,
    onTimeGuarantee: true,
    amenities: [
      { name: 'Leather Recliner & Bed', icon: 'package' },
      { name: 'Free WiFi', icon: 'wifi' },
      { name: 'Chilled AC & Fresh Air Filters', icon: 'wind' },
      { name: 'USB Charger', icon: 'zap' }
    ],
    boardingPoints: [
      { id: 'bp-j4', name: 'Sarai Kale Khan ISBT', time: '17:00', address: 'Near Nizamuddin Station' },
      { id: 'bp-j5', name: 'Mahipalpur Aerocity Chowk', time: '17:45', address: 'Airport Express Road' },
      { id: 'bp-j6', name: 'Gurgaon IFFCO Chowk', time: '18:15', address: 'NH48' }
    ],
    droppingPoints: [
      { id: 'dp-j4', name: 'Sindhi Camp Metro Gate 3', time: '22:15', address: 'Jaipur' }
    ],
    intermediateStops: [
      { stop: 'Delhi Sarai Kale Khan', time: '17:00', distance: '0 km', halt: 'Start' },
      { stop: 'Gurgaon IFFCO Chowk', time: '18:15', distance: '32 km', halt: '15 min Stop' },
      { stop: 'Behror Midway Plaza', time: '20:10', distance: '135 km', halt: '25 min Tea Halt' },
      { stop: 'Jaipur Sindhi Camp', time: '22:15', distance: '270 km', halt: 'Arrived' }
    ],
    driverInfo: {
      name: 'Rameshwar Lal',
      experience: '11 Years Safe Bus Captain',
      contact: '+91 94140 88221',
      vehicleNo: 'RJ 14 SC 4040',
      currentLocation: 'Behror Midway',
      speed: '78 km/h'
    }
  },

  // Mumbai to Pune
  {
    id: 'SHU-BOM-PUN-01',
    from: 'mumbai',
    to: 'pune',
    name: 'Shuana Mumbai-Pune Expressway EV Jet',
    operator: 'Shuana Green Mobility',
    model: 'Zero-Emission EV Luxury Intercity Bus',
    busType: 'Electric AC Seater (2+2)',
    badge: '⚡ Clean Green Ride',
    badgeType: 'green',
    rating: 4.9,
    reviewsCount: 5210,
    departureTime: '07:00',
    arrivalTime: '10:30',
    duration: '03h 30m',
    nextDay: false,
    price: 389,
    originalPrice: 599,
    discountTag: 'Save ₹210',
    seatsLeft: 14,
    liveTrackingAvailable: true,
    onTimeGuarantee: true,
    amenities: [
      { name: 'Ultra Quiet Electric Cabin', icon: 'zap' },
      { name: 'Free WiFi', icon: 'wifi' },
      { name: 'Ergonomic 135° Recline', icon: 'archive' },
      { name: 'Live GPS Tracking', icon: 'navigation' }
    ],
    boardingPoints: [
      { id: 'bp-m1', name: 'Borivali West (Gokul Hotel)', time: '07:00', address: 'Near Western Express Highway' },
      { id: 'bp-m2', name: 'Andheri East (Bisleri Flyover)', time: '07:30', address: 'WEH Highway' },
      { id: 'bp-m3', name: 'Dadar (Asiad Bus Stand)', time: '08:00', address: 'TT Circle Dadar' },
      { id: 'bp-m4', name: 'Vashi (Old Toll Naka)', time: '08:35', address: 'Sion Panvel Highway' }
    ],
    droppingPoints: [
      { id: 'dp-m1', name: 'Wakad (Hinjawadi Flyover)', time: '09:50', address: 'Bangalore Highway, Pune' },
      { id: 'dp-m2', name: 'Baner (Near Balewadi Stadium)', time: '10:05', address: 'Baner Road' },
      { id: 'dp-m3', name: 'Pune Station / Swargate', time: '10:30', address: 'Near Railway Station' }
    ],
    intermediateStops: [
      { stop: 'Mumbai Borivali', time: '07:00', distance: '0 km', halt: 'Start' },
      { stop: 'Dadar TT', time: '08:00', distance: '32 km', halt: 'Boarding' },
      { stop: 'Vashi Plaza', time: '08:35', distance: '55 km', halt: 'Boarding' },
      { stop: 'Khalapur Toll / Food Mall', time: '09:10', distance: '90 km', halt: '15 min Quick Refreshment' },
      { stop: 'Lonavala Expressway Exit', time: '09:30', distance: '115 km', halt: '5 min Stop' },
      { stop: 'Pune Wakad Bridge', time: '09:50', distance: '148 km', halt: 'Drop' },
      { stop: 'Pune Central Station', time: '10:30', distance: '165 km', halt: 'Arrival' }
    ],
    driverInfo: {
      name: 'Sunil Jadhav',
      experience: '14 Years Mumbai-Pune Expressway Veteran',
      contact: '+91 98220 99881',
      vehicleNo: 'MH 12 EV 5501',
      currentLocation: 'Khalapur Expressway Toll',
      speed: '80 km/h'
    }
  },
  {
    id: 'SHU-BOM-PUN-02',
    from: 'mumbai',
    to: 'pune',
    name: 'Volvo B11R Multi-Axle Executive',
    operator: 'Shuana Luxury Wheels',
    model: 'Volvo 9400 Multi-Axle AC Seater',
    busType: 'Volvo AC Seater (2+2)',
    badge: '🚀 Express 3 Hours',
    badgeType: 'orange',
    rating: 4.7,
    reviewsCount: 3100,
    departureTime: '17:30',
    arrivalTime: '20:45',
    duration: '03h 15m',
    nextDay: false,
    price: 420,
    originalPrice: 650,
    discountTag: 'Save ₹230',
    seatsLeft: 8,
    liveTrackingAvailable: true,
    onTimeGuarantee: true,
    amenities: [
      { name: 'Air Suspension', icon: 'truck' },
      { name: 'Fast WiFi', icon: 'wifi' },
      { name: 'Water Bottle', icon: 'droplet' },
      { name: 'Emergency Support', icon: 'shield-check' }
    ],
    boardingPoints: [
      { id: 'bp-m5', name: 'Dadar Asiad Stand', time: '17:30', address: 'Dadar East' },
      { id: 'bp-m6', name: 'Chembur (Maitri Park)', time: '17:50', address: 'Sion Panvel Highway' },
      { id: 'bp-m7', name: 'Kharghar (Hiranandani)', time: '18:25', address: 'Navi Mumbai' }
    ],
    droppingPoints: [
      { id: 'dp-m4', name: 'Wakad Bridge', time: '20:00', address: 'Pune Bypass' },
      { id: 'dp-m5', name: 'Swargate Bus Depot', time: '20:45', address: 'Pune' }
    ],
    intermediateStops: [
      { stop: 'Mumbai Dadar', time: '17:30', distance: '0 km', halt: 'Start' },
      { stop: 'Kharghar Navi Mumbai', time: '18:25', distance: '38 km', halt: 'Boarding' },
      { stop: 'Food Mall Urse', time: '19:35', distance: '120 km', halt: '15 min Refreshment' },
      { stop: 'Pune Swargate', time: '20:45', distance: '165 km', halt: 'Arrival' }
    ],
    driverInfo: {
      name: 'Nitin Kadam',
      experience: '10 Years Safe Driver',
      contact: '+91 97664 33219',
      vehicleNo: 'MH 14 VL 2020',
      currentLocation: 'Kharghar Highway',
      speed: '74 km/h'
    }
  },

  // Bangalore to Goa
  {
    id: 'SHU-BLR-GOA-01',
    from: 'bangalore',
    to: 'goa',
    name: 'Shuana Royal Scania SleepCruiser',
    operator: 'Shuana South Express',
    model: 'Scania Metrolink HD 14.5m AC Sleeper (2+1)',
    busType: 'Scania AC Sleeper (2+1)',
    badge: '🌴 Goa Express',
    badgeType: 'purple',
    rating: 4.8,
    reviewsCount: 2210,
    departureTime: '19:00',
    arrivalTime: '07:30',
    duration: '12h 30m',
    nextDay: true,
    price: 1199,
    originalPrice: 1799,
    discountTag: 'Save ₹600',
    seatsLeft: 4,
    liveTrackingAvailable: true,
    onTimeGuarantee: true,
    amenities: [
      { name: 'Plush Sleeper Beds', icon: 'package' },
      { name: 'High Speed WiFi', icon: 'wifi' },
      { name: 'Water & Snacks', icon: 'coffee' },
      { name: 'Restroom On-Board', icon: 'award' },
      { name: 'Reading Lamps', icon: 'sun' }
    ],
    boardingPoints: [
      { id: 'bp-b1', name: 'Majestic Anand Rao Circle', time: '19:00', address: 'Near Subbaiah Circle, Bangalore' },
      { id: 'bp-b2', name: 'Yeshwantpur Govardhan Theatre', time: '19:30', address: 'Tumkur Road' },
      { id: 'bp-b3', name: '8th Mile Dasarahalli', time: '20:00', address: 'Near Metro Pillar' }
    ],
    droppingPoints: [
      { id: 'dp-g1', name: 'Madgaon KTC Bus Stand', time: '06:30', address: 'South Goa' },
      { id: 'dp-g2', name: 'Panaji KTC Inter-State Stand', time: '07:30', address: 'Near Patto Bridge, Panaji' },
      { id: 'dp-g3', name: 'Mapusa Bus Stand', time: '08:15', address: 'North Goa Hub' }
    ],
    intermediateStops: [
      { stop: 'Bengaluru Majestic', time: '19:00', distance: '0 km', halt: 'Origin' },
      { stop: 'Tumkur Bypass Toll', time: '20:45', distance: '70 km', halt: '5 min Stop' },
      { stop: 'Chitradurga Highway Oasis', time: '22:45', distance: '200 km', halt: '30 min Dinner Break' },
      { stop: 'Hubballi Bypass', time: '02:00', distance: '410 km', halt: '10 min Stop' },
      { stop: 'Dharwad Outer', time: '02:30', distance: '430 km', halt: '5 min Stop' },
      { stop: 'Mollem National Park Entry', time: '05:30', distance: '520 km', halt: '10 min Ghat Halt' },
      { stop: 'Panaji KTC Stand', time: '07:30', distance: '590 km', halt: 'Final Stop' }
    ],
    driverInfo: {
      name: 'Praveen Gowda',
      experience: '13 Years Western Ghats Specialist',
      contact: '+91 99001 77665',
      vehicleNo: 'KA 01 SC 9009',
      currentLocation: 'Chitradurga Toll',
      speed: '76 km/h'
    }
  },

  // Delhi to Shimla
  {
    id: 'SHU-DEL-SHI-01',
    from: 'delhi',
    to: 'shimla',
    name: 'Shuana HillKing Volvo 9600 Pro',
    operator: 'Shuana Mountain Express',
    model: 'Volvo 9600 Hill Edition AC Seater/Sleeper',
    busType: 'Volvo AC Semi-Sleeper (2+2)',
    badge: '🏔️ Hill Champion',
    badgeType: 'green',
    rating: 4.8,
    reviewsCount: 1870,
    departureTime: '21:30',
    arrivalTime: '06:00',
    duration: '08h 30m',
    nextDay: true,
    price: 749,
    originalPrice: 1100,
    discountTag: 'Save ₹351',
    seatsLeft: 8,
    liveTrackingAvailable: true,
    onTimeGuarantee: true,
    amenities: [
      { name: 'Hill Anti-Roll Suspension', icon: 'truck' },
      { name: 'Heated Air-Conditioning', icon: 'sun' },
      { name: 'Free High Speed WiFi', icon: 'wifi' },
      { name: 'Bottle & Vomit Bag', icon: 'droplet' },
      { name: 'USB Ports', icon: 'zap' }
    ],
    boardingPoints: [
      { id: 'bp-s1', name: 'ISBT Kashmiri Gate Gate 1', time: '21:30', address: 'Delhi' },
      { id: 'bp-s2', name: 'Majnu Ka Tilla', time: '22:00', address: 'North Delhi' }
    ],
    droppingPoints: [
      { id: 'dp-s1', name: 'Shimla New ISBT Tutikandi', time: '06:00', address: 'Shimla Bypass' },
      { id: 'dp-s2', name: 'Victory Tunnel / Old Bus Stand', time: '06:30', address: 'The Mall Road Area, Shimla' }
    ],
    intermediateStops: [
      { stop: 'Delhi ISBT', time: '21:30', distance: '0 km', halt: 'Start' },
      { stop: 'Murthal Sukhdev', time: '22:45', distance: '55 km', halt: '30 min Food Halt' },
      { stop: 'Ambala Bypass', time: '01:30', distance: '210 km', halt: '10 min Stop' },
      { stop: 'Kalka Himalayan Foothills', time: '03:15', distance: '270 km', halt: '15 min Mountain Check' },
      { stop: 'Solan Highway Stop', time: '04:45', distance: '315 km', halt: '10 min Morning Tea' },
      { stop: 'Shimla ISBT Tutikandi', time: '06:00', distance: '360 km', halt: 'Arrival' }
    ],
    driverInfo: {
      name: 'Dinesh Thakur',
      experience: '16 Years Himalayan Veteran',
      contact: '+91 98160 55443',
      vehicleNo: 'HP 63 VL 3300',
      currentLocation: 'Ambala Highway',
      speed: '65 km/h'
    }
  }
];

// Realistic Seat Layouts generator
export function getBusSeatLayout(busId) {
  // Generates 2 Decks: Lower Deck and Upper Deck
  // Lower Deck: Sleeper (Single L1..L6 left, Double L7..L18 right) OR Reclining seats
  // Upper Deck: Sleeper (Single U1..U6 left, Double U7..U18 right)
  
  const lowerDeck = [
    // Row 1
    { id: 'L1', name: 'L1', type: 'sleeper', deck: 'lower', priceAdd: 0, status: 'available', window: true },
    { id: 'L2', name: 'L2', type: 'sleeper', deck: 'lower', priceAdd: 0, status: 'booked', window: false },
    { id: 'L3', name: 'L3', type: 'sleeper', deck: 'lower', priceAdd: 50, status: 'available', window: true },
    
    // Row 2
    { id: 'L4', name: 'L4', type: 'sleeper', deck: 'lower', priceAdd: 0, status: 'available', window: true },
    { id: 'L5', name: 'L5', type: 'sleeper', deck: 'lower', priceAdd: 0, status: 'available', window: false },
    { id: 'L6', name: 'L6', type: 'sleeper', deck: 'lower', priceAdd: 50, status: 'women_only', window: true },

    // Row 3
    { id: 'L7', name: 'L7', type: 'sleeper', deck: 'lower', priceAdd: 0, status: 'booked', window: true },
    { id: 'L8', name: 'L8', type: 'sleeper', deck: 'lower', priceAdd: 0, status: 'available', window: false },
    { id: 'L9', name: 'L9', type: 'sleeper', deck: 'lower', priceAdd: 50, status: 'available', window: true },

    // Row 4
    { id: 'L10', name: 'L10', type: 'sleeper', deck: 'lower', priceAdd: 0, status: 'available', window: true },
    { id: 'L11', name: 'L11', type: 'sleeper', deck: 'lower', priceAdd: 0, status: 'booked', window: false },
    { id: 'L12', name: 'L12', type: 'sleeper', deck: 'lower', priceAdd: 50, status: 'women_only', window: true },

    // Row 5
    { id: 'L13', name: 'L13', type: 'sleeper', deck: 'lower', priceAdd: 0, status: 'available', window: true },
    { id: 'L14', name: 'L14', type: 'sleeper', deck: 'lower', priceAdd: 0, status: 'available', window: false },
    { id: 'L15', name: 'L15', type: 'sleeper', deck: 'lower', priceAdd: 50, status: 'available', window: true }
  ];

  const upperDeck = [
    // Row 1
    { id: 'U1', name: 'U1', type: 'sleeper', deck: 'upper', priceAdd: 100, status: 'available', window: true },
    { id: 'U2', name: 'U2', type: 'sleeper', deck: 'upper', priceAdd: 100, status: 'booked', window: false },
    { id: 'U3', name: 'U3', type: 'sleeper', deck: 'upper', priceAdd: 150, status: 'available', window: true },

    // Row 2
    { id: 'U4', name: 'U4', type: 'sleeper', deck: 'upper', priceAdd: 100, status: 'available', window: true },
    { id: 'U5', name: 'U5', type: 'sleeper', deck: 'upper', priceAdd: 100, status: 'women_only', window: false },
    { id: 'U6', name: 'U6', type: 'sleeper', deck: 'upper', priceAdd: 150, status: 'available', window: true },

    // Row 3
    { id: 'U7', name: 'U7', type: 'sleeper', deck: 'upper', priceAdd: 100, status: 'booked', window: true },
    { id: 'U8', name: 'U8', type: 'sleeper', deck: 'upper', priceAdd: 100, status: 'available', window: false },
    { id: 'U9', name: 'U9', type: 'sleeper', deck: 'upper', priceAdd: 150, status: 'available', window: true },

    // Row 4
    { id: 'U10', name: 'U10', type: 'sleeper', deck: 'upper', priceAdd: 100, status: 'available', window: true },
    { id: 'U11', name: 'U11', type: 'sleeper', deck: 'upper', priceAdd: 100, status: 'available', window: false },
    { id: 'U12', name: 'U12', type: 'sleeper', deck: 'upper', priceAdd: 150, status: 'booked', window: true },

    // Row 5
    { id: 'U13', name: 'U13', type: 'sleeper', deck: 'upper', priceAdd: 100, status: 'available', window: true },
    { id: 'U14', name: 'U14', type: 'sleeper', deck: 'upper', priceAdd: 100, status: 'women_only', window: false },
    { id: 'U15', name: 'U15', type: 'sleeper', deck: 'upper', priceAdd: 150, status: 'available', window: true }
  ];

  return { lowerDeck, upperDeck };
}
