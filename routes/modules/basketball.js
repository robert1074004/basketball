const express = require('express')
const router = express.Router()
const upload = require('../../middleware/multer')
const basketballController = require('../../controllers/basketball-controller')
const userController = require('../../controllers/user-controller')
router.get('/',basketballController.getIndex)
router.get('/user/edit', userController.editUser)
router.put('/user', upload.single('image'), userController.putUser)
router.get('/form',basketballController.getForm)
router.get('/record',basketballController.getRecord)
router.post('/record',basketballController.postRecord)
router.get('/rank',basketballController.getRank)

module.exports = router