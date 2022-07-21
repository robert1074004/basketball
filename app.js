const express = require('express')
const exphbs = require('express-handlebars') 

const app = express()



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

app.get('/login',(req,res) => {
    res.render('login')
})

app.get('/register',(req,res) => {
    res.render('register')
})

app.listen(3000,() => {
    console.log('App is running on http://localhost:3000')
})