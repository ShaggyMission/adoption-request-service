jest.mock('axios');

const axios = require('axios');
const request = require('supertest');
const app = require('../app');
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const AdoptionRequest = require('../models/adoptionRequest.model');

beforeAll(async () => {
  await connectDB();
  await AdoptionRequest.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close(); 
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
