const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db
const userController = {
  registerPage: (req, res) => {
    res.render('register')
  },
  register: (req, res, next) => {
    const { name, email, password, confirmPassword, position } = req.body
    if (password !== confirmPassword) throw new Error('Password do not match!')
    User.findOne({
        where: {
          email
        }
      })
      .then(user => {
        if (user) throw new Error('Email already exists!')
        return bcrypt.hash(req.body.password, 10)
      })
      .then(hash => User.create({
        name,
        email,
        position,
        password: hash
      }))
      .then(() => {
        req.flash('success_messages', '成功註冊帳號!')
        res.redirect('/login')
      })
      .catch(err => next(err))
  }
}

module.exports = userController