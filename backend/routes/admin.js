// Imports
const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin');
const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');

// Routes

// Supprimer un post
router.delete('/delete-post/:id', auth, adminCtrl.adminRemovePost); //

// Supprimer un comment
router.delete('/delete-comment/:id', auth, adminCtrl.adminRemoveComment); //

// Supprimer un user
router.delete('/delete-user/:id', auth, adminCtrl.adminRemoveUser); //

// Exports
module.exports = router;