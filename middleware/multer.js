const multer = require('multer')
const multerGoogleStorage = require('multer-cloud-storage')
const upload = multer({ storage: multerGoogleStorage.storageEngine()})
module.exports = upload