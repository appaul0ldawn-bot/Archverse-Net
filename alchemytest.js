const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('./app'); // Core Express configuration target file
const User = require('./models/User');
const { Plant, PotionRecipe } = require('./models/Alchemy');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterEach(async () => {
  await User.deleteMany({});
  await Plant.deleteMany({});
  await PotionRecipe.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// ==========================================================================
// 🧪 SUITE 3: ALCHEMICAL INVENTORY & BREWING CONVERSIONS
// ==========================================================================
describe('Archverse Alchemy Transmutation Engine Tests', () => {

  it('should successfully craft a potion and unlock a superability when ingredients are sufficient', async () => {
    // 1. Seed mock botanical data into the active memory stack
    const cinnabar = await Plant.create({ name: 'Sacred Cinnabar', rarity: 'Sacred', alchemicalProperties: { potencyModifier: 2, primaryElement: 'Mercury' } });
    
    // 2. Setup the master recipe criteria payload mapping
    const mercuryRecipe = await PotionRecipe.create({
      resultPotionName: 'Liquid Quicksilver Draught',
      requiredIngredients: [{ plantId: cinnabar._id, quantity: 2 }],
      unlockedSuperabilityId: 'Chrono-Flicker'
    });

    // 3. Register user profile loaded with adequate ingredient stock quantities
    const player = await User.create({
      username: 'AlchemistPaul',
      tokens: 200,
      inventory: {
        plants: [{ plantId: cinnabar._id, quantity: 5 }]
      }
    });

    // 4. Dispatch post payload data vectors to the transformation engine router
    const response = await request(app)
      .post('/api/alchemy/craft')
      .send({ username: 'AlchemistPaul', recipeId: mercuryRecipe._id });

    // Validate request status maps correctly
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toContain('brewed Liquid Quicksilver Draught');

    // 5. Assert document states inside MongoDB reflect proper consumption levels
    const updatedUser = await User.findOne({ username: 'AlchemistPaul' });
    expect(updatedUser.activeSuperability).toBe('Chrono-Flicker');
    expect(updatedUser.inventory.plants[0].quantity).toBe(3); // 5 - 2 consumed = 3 remaining
    expect(updatedUser.tokens).toBe(300); // 200 starting + 100 reward tokens = 300 total
  });

  it('should explicitly reject craft actions if individual plant counts fall below the recipe requirements', async () => {
    const brimstone = await Plant.create({ name: 'Abyssal Brimstone', rarity: 'Abyssal', alchemicalProperties: { potencyModifier: 3, primaryElement: 'Sulfur' } });
    
    const sulfurRecipe = await PotionRecipe.create({
      resultPotionName: 'Seraphic Elixir',
      requiredIngredients: [{ plantId: brimstone._id, quantity: 3 }],
      unlockedSuperabilityId: 'Seraphic Ignition'
    });

    // Register user profile loaded with inadequate components stock (only 1 available, requires 3)
    await User.create({
      username: 'DeficitMage',
      tokens: 0,
      inventory: {
        plants: [{ plantId: brimstone._id, quantity: 1 }]
      }
    });

    const response = await request(app)
      .post('/api/alchemy/craft')
      .send({ username: 'DeficitMage', recipeId: sulfurRecipe._id });

    // Transmutation algorithm must block the transaction and issue an error signature
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain('Insufficient harvest components');
  });
});
