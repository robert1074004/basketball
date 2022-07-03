const mongoose = require('mongoose')
const Record = require('../record')
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error',() => console.log('mongodb error!'))
db.once('open',() => {
    for(let i = 0 ;i<10;i++) {
        Record.create({point:(i+1)*5})
    }
    console.log('done')
})
