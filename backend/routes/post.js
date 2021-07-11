// Imports

const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');

// Routes

router.post('/create', postCtrl.create); 

// Exports
module.exports = router;