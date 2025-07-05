const AdoptionRequest = require('../models/adoptionRequest.model');
const axios = require('axios');

const PET_SERVICE_URL = 'http://localhost:3003';

exports.createAdoptionRequest = async (req, res) => {
  const { userId, petId, message } = req.body;

  if (!userId || !petId) {
    return res.status(400).json({ message: 'userId and petId are required' });
  }

  try {
    const petRes = await axios.get(`${PET_SERVICE_URL}/pets/${petId}`);
    const pet = petRes.data;

    if (pet.status && pet.status !== 'available') {
      return res.status(400).json({ message: 'Pet is not available for adoption' });
    }

    const newRequest = await AdoptionRequest.create({ userId, petId, message });
    res.status(201).json(newRequest);
  } catch (error) {
    console.error('Error creating adoption request:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
