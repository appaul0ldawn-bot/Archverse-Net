const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('./app'); // Core Express configuration target file
const User = require('./models/User');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// ==========================================================================
// 🪙 SUITE 4: SOCIAL TIPPING & MORAL PROGRESSION ALGORITHMS
// ==========================================================================
describe('Archverse Social Tipping and Fable Choices Karma Testing Suite', () => {

  it('should transfer token balances accurately and update sender karma upon picture tips', async () => {
    const sender = await User.create({ username: 'TippingAngel', tokens: 1000, karmaScore: 100, alignment: 'angelic' });
    const recipient = await User.create({ username: 'SirenCosplayer', tokens: 50, karmaScore: 0, alignment: 'angelic' });

    const response = await request(app)
      .post('/api/social/tip-tokens')
      .send({ senderUsername: 'TippingAngel', recipientUsername: 'SirenCosplayer', amount: 200 });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.newBalance).toBe(800); // 1000 - 200 = 800

    const updatedSender = await User.findOne({ username: 'TippingAngel' });
    expect(updatedSender.karmaScore).toBe(120); // 100 base + 20 positive tip karma = 120 total
  });

  it('should apply Dante sinner ranks and block actions if player karma drops heavily negative', async () => {
    // Register user profile heavily loaded with negative karma records (e.g. Fraud circle)
    const rogueUser = await User.create({
      username: 'RogueAgent',
      tokens: 10,
      karmaScore: -3000 // Deep negative fallback rating bounds
    });

    const { calculateMoralHierarchy } = require('./EvolutionaryMorph');
    const moralStats = calculateMoralHierarchy(rogueUser.karmaScore, rogueUser.tokens);

    // Engine validation layer checking to verify proper circles allocation constraints mapping
    expect(moralStats.layerName).toContain('Circle 8: Fraud');
    expect(moralStats.morphTarget.horns).toBeGreaterThan(0.5);
    expect(moralStats.morphTarget.halo).toBe(0.0);
  });
});
