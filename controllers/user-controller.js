const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db
const userController = {
    registerPage: (req, res) => {
        res.render('register')
    },
    register: (req, res) => {
        bcrypt.hash(req.body.password,10)
          .then(hash => User.create({
            name: req.body.name,
            email: req.body.email,
            position: req.body.position,
            password: hash
          }))
          .then(() => {
            res.redirect('/login')
          })
    }
}

module.exports = userController