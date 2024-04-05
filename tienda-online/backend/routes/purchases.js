const express = require('express');

const { makePurchases } = require('../controllers/purchasesController');
const router = express.Router();

router.post('/', makePurchases);

module.exports = router;
