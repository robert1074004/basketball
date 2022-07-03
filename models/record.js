const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
    point: {
        type : String,
        required:true
    }
})
module.exports = mongoose.model('Record',recordSchema)