const express = require('express');
const router = express.Router();

const ctrlLists = require('../controllers/lists');
const ctrlItems = require('../controllers/items');
const ctrlLogin = require('../controllers/login');
const ctrlRegister = require('../controllers/register');
const ctrlTest = require('../controllers/test');

/* GET home page. */
router.get('/', ctrlLogin.enumLogin);

router.get('/lists', ctrlLists.enumLists);
router.get('/lists/:lid', ctrlItems.enumItems);
router.post('/lists/:lid', ctrlItems.addItem);

router.get('/items', ctrlItems.enumItems);

router.get('/login', ctrlLogin.enumLogin);

router.get('/register', ctrlRegister.enumRegister);

router.get('/test', ctrlTest.enumTest);

module.exports = router;
