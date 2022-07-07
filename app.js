const express = require('express')
const exphbs = require('express-handlebars') 
const mongoose = require('mongoose')
const app = express()
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error',() => {
    console.log('mongodb error!')
})

db.once('open',() => {
    console.log('mongodb connected!')
})

app.engine('hbs',exphbs({defaultLayout:'main',extname:'.hbs'}))

app.set('view engine','hbs')

app.use(express.static('public'))

app.get('/',(req,res) => {
    res.render('index')
})

app.get('/record',(req,res) => {
    res.render('record')
})

app.get('/rank',(req,res) => {
    res.render('rank')
})

app.get('/form',(req,res) => {
    res.render('form')
})

app.listen(3000,() => {
    console.log('App is running on http://localhost:3000')
})