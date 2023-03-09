const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const path = require('path')
const session = require('express-session')
const passport = require('./config/passport')
const handlebarHelpres = require('./helpers/handlebars-helpers')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const app = express()
const port = process.env.PORT || 3000
const SESSION_SECRET = 'secret'

app.use(methodOverride('_method'))
app.engine('hbs', exphbs.engine({defaultLayout:'main',extname:'.hbs',helpers: handlebarHelpres}))
app.set('view engine','hbs')

app.use(express.static('public'))
app.use('/upload',express.static(path.join(__dirname, 'upload')))

app.use(express.urlencoded({ extended: true }))


app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false, cookie:{_expires : 86400000}}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
    res.locals.success_messages = req.flash('success_messages')
    res.locals.error_messages = req.flash('error_messages')
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    next()
})
app.use(routes)


app.listen(port,() => {
    console.log(`App is running on http://localhost:${port}`)
})