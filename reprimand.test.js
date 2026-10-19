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
// 🪐 SUITE 5: SPIRIT RECYCLING & ADMIN REPRIMAND ENFORCEMENT
// ==========================================================================
describe('Archverse Environmental Law & Trapped Spirit Recycling Testing Suite', () => {

  it('should recycle ghost-byte data, award tokens, and generate positive map micro-nodes', async () => {
    const player = await User.create({
      username: 'GhostTrapper',
      tokens: 100,
      inventory: { spiritBytes: [] }
    });

    const mockSpiritPayload = {
      spiritId: 'spirit_999',
      classification: 'Unclean Poltergeist',
      bytePayload: btoa(JSON.stringify({ id: 'spirit_999', type: 'Unclean Poltergeist', tokenRewardAdequacy: 250 })),
      bountyValue: 250
    };

    // Simulate upload and recycling processing execution loops
    const response = await request(app)
      .post('/api/spirit-vault/recycle')
      .send({ username: 'GhostTrapper', spiritBytePayload: mockSpiritPayload });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.newBalance).toBe(350); // 100 starting + 250 adequacy reward = 350 ST total

    // Verify system created the decentralized micro-nodes on the global map models
    const generatedNodesCount = await mongoose.model('MapMicroNode').countDocuments({ type: 'alignment_booster' });
    expect(generatedNodesCount).toBe(5); // Confirm 5 secondary chance boosters spawned safely
  });

  it('should automatically ban players and disconnect sockets when warning thresholds are violated', async () => {
    // 1. Seed an authorized Council member profile and a repeat offender profile
    await User.create({ username: 'HighArchon', rank: 'Council', tokens: 1000 });
    const offender = await User.create({ username: 'TroughMage', warningCount: 2, tokens: 400, isBanned: false });

    // 2. Dispatch a final warning reprimand request payload packet
    const response = await request(app)
      .post('/api/admin/reprimand')
      .send({
        adminUsername: 'HighArchon',
        targetUsername: 'TroughMage',
        actionType: 'WARN',
        reason: 'Repeated proximity mic flooding exploits'
      });

    expect(response.status).toBe(200);
    expect(response.body.targetStatus.isBanned).toBe(true); // Verification gate catches escalation path

    // 3. Confirm penalties are applied properly inside user document records
    const updatedOffender = await User.findOne({ username: 'TroughMage' });
    expect(updatedOffender.tokens).toBe(250); // 400 starting - 150 warning penalty = 250 ST remaining
    expect(updatedOffender.isBanned).toBe(true);
  });
});
