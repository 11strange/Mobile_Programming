export interface FutsalCourt {
  id: string;
  name: string;
  location: string;
  rating: number;
  pricePerHour: number;
  image: string;
  amenities: string[];
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  courtId: string;
  courtName: string;
  date: string;
  time: string;
  duration: number; // hours
  amountNPR: number;
  playerName: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

export interface OwnerStats {
  todayBookings: number;
  todayRevenue: number;
  weeklyOccupancy: number;
  activeCourts: number;
  weeklyRevenue: number[];
}

export const MOCK_COURTS: FutsalCourt[] = [
  {
    id: '1',
    name: 'Kicks Arena',
    location: 'Thamel, Kathmandu',
    rating: 4.8,
    pricePerHour: 1200,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
    amenities: ['Indoor', 'Shower', 'Locker', 'Cafeteria'],
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Goal Zone Lalitpur',
    location: 'Lalitpur, Patan',
    rating: 4.5,
    pricePerHour: 900,
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=800',
    amenities: ['Outdoor', 'Floodlights', 'Parking'],
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Baneshwor Futsal',
    location: 'Baneshwor, Kathmandu',
    rating: 4.6,
    pricePerHour: 800,
    image: 'https://images.unsplash.com/photo-1431324155629-1a6eda1eedfa?auto=format&fit=crop&q=80&w=800',
    amenities: ['Indoor', 'Changing Room'],
    isAvailable: true,
  },
  {
    id: '4',
    name: 'Bhaktapur Pitch',
    location: 'Bhaktapur',
    rating: 4.3,
    pricePerHour: 750,
    image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=800',
    amenities: ['Outdoor', 'Parking', 'Floodlights'],
    isAvailable: false,
  },
  {
    id: '5',
    name: 'ProTurf KTM',
    location: 'Koteshwor, Kathmandu',
    rating: 4.9,
    pricePerHour: 1500,
    image: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&q=80&w=800',
    amenities: ['Professional Grade', 'Indoor', 'VIP Lounge', 'Coaching'],
    isAvailable: true,
  },
];

export const MOCK_PLAYER = {
  name: 'Rohit KC',
  memberSince: 'March 2025',
  totalBookings: 14,
  hoursPlayed: 22,
  favoriteCourt: 'Kicks Arena',
  bookings: ['b1', 'b2', 'b3', 'b4'],
};

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    courtId: '1',
    courtName: 'Kicks Arena',
    date: 'Apr 10, 2026',
    time: '18:00 - 19:00',
    duration: 1,
    amountNPR: 1200,
    playerName: 'Rohit KC',
    status: 'confirmed',
  },
  {
    id: 'b2',
    courtId: '2',
    courtName: 'Goal Zone Lalitpur',
    date: 'Apr 14, 2026',
    time: '20:00 - 21:00',
    duration: 1,
    amountNPR: 900,
    playerName: 'Rohit KC',
    status: 'pending',
  },
  {
    id: 'b3',
    courtId: '5',
    courtName: 'ProTurf KTM',
    date: 'Mar 28, 2026',
    time: '19:00 - 20:00',
    duration: 1,
    amountNPR: 1500,
    playerName: 'Rohit KC',
    status: 'completed',
  },
  {
    id: 'b4',
    courtId: '3',
    courtName: 'Baneshwor Futsal',
    date: 'Mar 20, 2026',
    time: '17:00 - 18:00',
    duration: 1,
    amountNPR: 800,
    playerName: 'Rohit KC',
    status: 'cancelled',
  },
  {
    id: 'b5',
    courtId: '1',
    courtName: 'Kicks Arena',
    date: 'Apr 6, 2026',
    time: '21:00 - 22:00',
    duration: 1,
    amountNPR: 1200,
    playerName: 'Bishal Tamang',
    status: 'confirmed',
  },
  {
    id: 'b6',
    courtId: '2',
    courtName: 'Goal Zone Lalitpur',
    date: 'Apr 6, 2026',
    time: '19:00 - 20:00',
    duration: 1,
    amountNPR: 900,
    playerName: 'Sagar Karki',
    status: 'pending',
  },
];

export const MOCK_OWNER_STATS: OwnerStats = {
  todayBookings: 6,
  todayRevenue: 7200,
  weeklyOccupancy: 74,
  activeCourts: 2,
  weeklyRevenue: [5400, 7200, 6300, 8100, 7200, 9000, 7200],
};

export const TIME_SLOTS = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00',
];
