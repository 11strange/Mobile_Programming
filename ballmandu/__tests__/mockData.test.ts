import { MOCK_COURTS, MOCK_PLAYER, MOCK_OWNER_STATS, MOCK_BOOKINGS } from '../data/mockData';

describe('mockData', () => {
  it('MOCK_COURTS has at least 3 courts with required fields', () => {
    expect(MOCK_COURTS.length).toBeGreaterThanOrEqual(3);
    MOCK_COURTS.forEach((court) => {
      expect(court).toHaveProperty('id');
      expect(court).toHaveProperty('name');
      expect(court).toHaveProperty('location');
      expect(court).toHaveProperty('pricePerHour');
      expect(court).toHaveProperty('rating');
      expect(court).toHaveProperty('amenities');
      expect(court).toHaveProperty('isAvailable');
      expect(court).toHaveProperty('image');
      expect(typeof court.pricePerHour).toBe('number');
    });
  });

  it('MOCK_PLAYER has name and bookings array', () => {
    expect(MOCK_PLAYER).toHaveProperty('name');
    expect(Array.isArray(MOCK_PLAYER.bookings)).toBe(true);
  });

  it('MOCK_BOOKINGS has upcoming and past entries', () => {
    const upcoming = MOCK_BOOKINGS.filter((b) => b.status === 'confirmed' || b.status === 'pending');
    const past = MOCK_BOOKINGS.filter((b) => b.status === 'completed' || b.status === 'cancelled');
    expect(upcoming.length).toBeGreaterThan(0);
    expect(past.length).toBeGreaterThan(0);
  });

  it('MOCK_OWNER_STATS has required KPI fields', () => {
    expect(MOCK_OWNER_STATS).toHaveProperty('todayBookings');
    expect(MOCK_OWNER_STATS).toHaveProperty('todayRevenue');
    expect(MOCK_OWNER_STATS).toHaveProperty('weeklyOccupancy');
    expect(MOCK_OWNER_STATS).toHaveProperty('activeCourts');
    expect(MOCK_OWNER_STATS).toHaveProperty('weeklyRevenue');
  });
});
