const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('./app'); // Core Express configuration target file
const User = require('./models/User');
const CodexEntry = require('./models/CodexModels');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await User.deleteMany({});
  await CodexEntry.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// ==========================================================================
// 🌌 COMPREHENSIVE ARCHVERSE ENGINE CORE TESTING SUITE
// ==========================================================================
describe('Archverse Complete Multidimensional Core Integration Tests', () => {

  it('should verify character creation profiles, calculate zodiac elements, and assign traits correctly', async () => {
    const registrationPayload = {
      username: 'ElijahProphet',
      email: 'prophet@archverse.net',
      birthdate: '1986-10-07' // Libra / Air Element / Owl of Athena Guide
    };

    const response = await request(app).post('/api/auth/register-intent').send(registrationPayload);
    expect(response.status).toBe(200);

    const savedUser = await User.findOne({ username: 'ElijahProphet' });
    expect(savedUser.zodiacElement).toBe('Air');
    expect(savedUser.assignedSpiritGuide).toBe('Owl of Athena');
  });

  it('should process alchemical crafting transactions and correctly apply active superabilities', async () => {
    // Inject mock alchemical plant assets straight to the memory store
    const sulfurPlant = await mongoose.model('Plant').create({ name: 'Solar Brimstone', rarity: 'Abyssal' });
    
    const recipe = await mongoose.model('PotionRecipe').create({
      resultPotionName: 'Elixir of Ignition',
      requiredIngredients: [{ plantId: sulfurPlant._id, quantity: 1 }],
      unlockedSuperabilityId: 'Seraphic_Ignition'
    });

    const user = await User.create({
      username: 'GabrielKnight',
      tokens: 500,
      inventory: { plants: [{ plantId: sulfurPlant._id, quantity: 2 }] }
    });

    const response = await request(app)
      .post('/api/alchemy/craft')
      .send({ username: 'GabrielKnight', recipeId: recipe._id });

    expect(response.status).toBe(200);
    const updatedUser = await User.findOne({ username: 'GabrielKnight' });
    expect(updatedUser.activeSuperability).toBe('Seraphic_Ignition');
  });

  it('should properly route admin reprimands and execute ban isolations when warning thresholds break', async () => {
    await User.create({ username: 'ArchonModerator', rank: 'Council' });
    await User.create({ username: 'GlitchDemon', warningCount: 2, tokens: 200 });

    const response = await request(app)
      .post('/api/admin/reprimand')
      .send({
        adminUsername: 'ArchonModerator',
        targetUsername: 'GlitchDemon',
        actionType: 'WARN',
        reason: 'Exploiting teleport boundaries'
      });

    expect(response.status).toBe(200);
    expect(response.body.targetStatus.isBanned).toBe(true);
  });
});
