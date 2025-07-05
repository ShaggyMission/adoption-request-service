const express = require('express');
const router = express.Router();
const controller = require('../controllers/adoptionRequest.controller');

router.post('/adoption-requests', controller.createAdoptionRequest);

module.exports = router;
