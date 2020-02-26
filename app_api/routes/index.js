const express = require('express');
const router = express.Router();
const ctrlLists = require('../controllers/lists');
const ctrlItems = require('../controllers/items');
const ctrlLogin = require('../controllers/login');
const ctrlRegister = require('../controllers/register');
const ctrlTest = require('../controllers/test');

router.get('/lists', ctrlLists.getLists);
router.get('/lists/:lid', ctrlItems.getItems);

router.post('/lists', ctrlLists.addList);
router.post('/lists/:lid', ctrlItems.addItem);

router.delete('/lists/:lid', ctrlLists.deleteList);
router.delete('/items/:iid', ctrlItems.deleteItem);

router.put('/lists/:lid', ctrlLists.renameList);
router.put('/items/:iid', ctrlItems.updateItem);

router.post('/login', ctrlLogin.doLogin);

router.get('/register', ctrlRegister.enumRegister);
router.get('/test', ctrlTest.enumTest);

module.exports = router;
