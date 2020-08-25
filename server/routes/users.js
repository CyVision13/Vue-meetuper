const express = require('express');
const router = express.Router();

const UsersCtrl = require('../controllers/users');

router.get('', UsersCtrl.getUsers);

router.post('/register',UsersCtrl.register)
router.post('/login',UsersCtrl.login)
router.post('/logout',UsersCtrl.logout)
//hello vahid
module.exports = router;
