const express = require('express')
const router = express.Router()
const upload = require('../../middleware/multer')
const basketballController = require('../../controllers/basketball-controller')
const userController = require('../../controllers/user-controller')
const { recordValidator } = require('../../middleware/validator')
router.get('/top-player', basketballController.getPlayer)
router.get('/user-rank',basketballController.getUserRank)
router.get('/user/edit', userController.editUser)
router.put('/user', upload.single('image'), userController.putUser)
router.get('/form',basketballController.getForm)
router.get('/form/edit/:id',basketballController.editForm)
router.get('/record/:id',basketballController.getRecord)
router.post('/record', recordValidator, basketballController.postRecord)
router.put('/record/:id', recordValidator, basketballController.putRecord)
router.delete('/record/:id',basketballController.deleteRecord)
router.get('/:id',basketballController.getIndex)



module.exports = router