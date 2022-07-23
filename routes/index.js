const express = require('express')
const router = express.Router()
const basketballController = require('../controllers/basketball-controller')
const userController = require('../controllers/user-controller')
router.get('/register', userController.registerPage)
router.post('/register', userController.register) 
router.get('/basketball',basketballController.getIndex)
router.get('/',(req, res) => res.redirect('/basketball'))
module.exports = router