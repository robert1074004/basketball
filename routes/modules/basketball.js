const express = require('express')
const router = express.Router()
const basketballController = require('../../controllers/basketball-controller')

router.get('/',basketballController.getIndex)
router.get('/form',basketballController.getForm)
router.get('/record',basketballController.getRecord)
router.post('/record',basketballController.postRecord)
router.get('/rank',basketballController.getRank)

module.exports = router