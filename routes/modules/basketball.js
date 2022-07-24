const express = require('express')
const router = express.Router()
const basketballController = require('../../controllers/basketball-controller')

router.get('/',basketballController.getIndex)
router.get('/form',basketballController.getForm)
router.get('/Record',basketballController.getRecord)
router.post('/Record',basketballController.postRecord)
router.get('/Rank',basketballController.getRank)

module.exports = router