const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
const { authenticatedAdmin } = require('../../middleware/auth')
router.get('/data',authenticatedAdmin, adminController.getData)
router.use('/', (req, res) => res.redirect('/admin/data'))
module.exports = router