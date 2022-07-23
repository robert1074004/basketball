const express = require('express')
const router = express.Router()
const basketballController = require('../controllers/basketballController')

router.get('/',basketballController.getIndex)

module.exports = router