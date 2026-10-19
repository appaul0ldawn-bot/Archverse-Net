const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('./app'); // Import your Express application file context
const User = require('./models/User');

let mongoServer;

// Setup in-memory temporary database cluster blocks before executing tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

// Wipe database profiles records clean between successive check iterations
afterEach(async () => {
  await User.deleteMany({});
});

// Close connections cleanly upon completion of the full suite runtime
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// ==========================================================================
// 🌌 SUITE 1: SIGN-UP VALIDATION & ELEMENTAL ALGORITHMS
// ==========================================================================
describe('Archverse Onboarding & Zodiac Engine Tests', () => {
  
  it('should successfully assign Fire element and Phoenix guide for July birthdays', async () => {
    const signupPayload = {
      username: 'MichaelSeraph',
      email: 'michael@archverse.net',
      birthdate: '1995-07-25' // Leo / Fire Element
    };

    // Simulate registration endpoint submit processing
    const response = await request(app)
      .post('/api/auth/register-intent')
      .send(signupPayload);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    // Verify database profile traits calculations match structural rules
    const savedUser = await User.findOne({ username: 'MichaelSeraph' });
    expect(savedUser.zodiacElement).toBe('Fire');
    expect(savedUser.assignedSpiritGuide).toBe('Phoenix');
    expect(savedUser.resonanceHz).toBe(528);
  });

  it('should reject sign-up requests missing core identity parameters', async () => {
    const brokenPayload = { username: 'ImcompleteNode' }; // Missing email and birthdate

    const response = await request(app)
      .post('/api/auth/register-intent')
      .send(brokenPayload);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});

// ==========================================================================
// 🎯 SUITE 2: GPS SPATIAL PROXIMITY VALIDATION LOOPS
// ==========================================================================
describe('Geospatial Mission Proximity Loops', () => {

  it('should reject token payouts if user coordinates exceed the 30m boundary', async () => {
    // 1. Setup mock mission node position inside the database cache (e.g., Central Temple)
    const mockMission = await mongoose.model('ActiveMissionNode').create({
      lat: 31.7683,
      lng: 35.2137,
      type: 'light',
      description: 'Stabilize New Jerusalem Core'
    });

    // 2. Setup user profile far outside boundaries (e.g., coordinates placed in the USA)
    const farAwayUser = {
      username: 'LostCherub',
      playerLat: 35.6895, // Tokyo, Japan coordinates
      playerLng: 139.6917,
      missionId: mockMission._id,
      missionType: 'light'
    };

    const response = await request(app)
      .post('/api/missions/complete')
      .send(farAwayUser);

    // Proximity logic rules must catch this divergence instantly and decline payout signatures
    expect(response.status).toBe(400);
    expect(response.body.error).toContain('Too far away');
  });
});
