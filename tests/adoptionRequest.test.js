jest.mock('axios');

const axios = require('axios');
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const AdoptionRequest = require('../models/adoptionRequest.model');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await AdoptionRequest.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /adoption-requests', () => {
  it('should create a new adoption request', async () => {
    axios.get.mockResolvedValue({ data: { status: 'available' } });

    const res = await request(app).post('/adoption-requests').send({
      userId: 'user123',
      petId: 'pet456',
      message: 'I want to adopt this dog'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.status).toBe('pending');
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await request(app).post('/adoption-requests').send({});
    expect(res.statusCode).toBe(400);
  });
});
