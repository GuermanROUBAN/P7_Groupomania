const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

//const auth = require('../middleware/auth');

// ROUTES //

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/delete/:id', userCtrl.deleteUser);
router.get('/', userCtrl.getOneUser);
router.get('/users', userCtrl.getAllUsers);


module.exports = router;