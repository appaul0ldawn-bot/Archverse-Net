const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('./app'); // Core Express configuration target file
const User = require('./models/User');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  
  // Register Prayer schema inside the localized memory cluster compiler
  mongoose.model('PrayerNode', new mongoose.Schema({
    submittedBy: String,
    text: String,
    isAnswered: Boolean,
    worthyStatus: String,
    answeredBy: String
  }));
});

afterEach(async () => {
  await User.deleteMany({});
  await mongoose.model('PrayerNode').deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// ==========================================================================
// 🙏 SUITE 5: ORACLES, DONATIONS, AND CHRIST-THEMED WORTHINESS GATES
// ==========================================================================
describe('Archverse Oracle Prediction and Worthiness Verification Loops', () => {

  it('should process real-time coordinate headings and output matching oracle timeline glimmers', async () => {
    const trajectoryPayload = {
      username: 'PredictiveMage',
      currentPositionX: 15,
      currentPositionZ: -15,
      headingVectorX: 1.0,  // Moving dynamically towards the Eastern Gate coordinates
      headingVectorZ: -1.0
    };

    const response = await request(app)
      .post('/api/oracle/predict-glimmer')
      .send(trajectoryPayload);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.glimmer).toContain('Eastern Pearlescent Gate');
  });

  it('should accept worthy fulfillment actions, award tokens, and reject unworthy submissions', async () => {
    // 1. Initialize a pending player prayer wish node
    const prayer = await mongoose.model('PrayerNode').create({
      submittedBy: 'NeedfulCherub',
      text: 'Requires spiritual alignment buffer near the desert grid.',
      isAnswered: false,
      worthyStatus: 'PENDING_COUNCIL_REVIEW'
    });

    const fulfiller = await User.create({ username: 'HolyServant', tokens: 100, karmaScore: 10 });

    // 2. Test UNWORTHY action processing (Missing baseline blessing/healing keywords)
    const badResponse = await request(app)
      .post('/api/prayers/fulfill')
      .send({ fulfillerUsername: 'HolyServant', prayerId: prayer._id, fulfillmentActionText: 'Just ignoring this request.' });

    expect(badResponse.status).toBe(400);
    expect(badResponse.body.error).toContain('insufficient to fulfill request intent');

    // 3. Test WORTHY action processing (Contains Christ-like activation flags)
    const goodResponse = await request(app)
      .post('/api/prayers/fulfill')
      .send({ fulfillerUsername: 'HolyServant', prayerId: prayer._id, fulfillmentActionText: 'I will bless and heal your coordinate matrices.' });

    expect(goodResponse.status).toBe(200);
    expect(goodResponse.body.success).toBe(true);

    const updatedUser = await User.findOne({ username: 'HolyServant' });
    expect(updatedUser.tokens).toBe(450); // 100 starting + 350 reward = 450 ST total
    expect(updatedUser.karmaScore).toBe(810);
  });
});
