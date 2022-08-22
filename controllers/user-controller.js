const bcrypt = require('bcryptjs')
const db = require('../models')
const { imgurFileHandler } = require('../helpers/file-helpers')
const { User } = db
const userController = {
  registerPage: (req, res) => {
    res.render('register')
  },
  register: (req, res, next) => {
    const { name, email, password, confirmPassword, position } = req.body
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim() || !position.trim()) throw new Error('Some fields must be required')
    if (password !== confirmPassword) throw new Error('Password do not match!')
    User.findOne({
        where: {
          email
        }
      })
      .then(user => {
        if (user) throw new Error('Email already exists!')
        const { file } = req
        return Promise.all([bcrypt.hash(req.body.password, 10), imgurFileHandler(file)])
      })
      .then(([hash, filepath]) => {
        User.create({
          name,
          email,
          position,
          password: hash,
          image: filepath || 'https://i.imgur.com/Qo3mXjE.jpeg'
        })
      })
      .then(() => {
        req.flash('success_messages', '成功註冊帳號!')
        res.redirect('/login')
      })
      .catch(err => next(err))
  },
  loginPage: (req,res) => {
    res.render('login')
  },
  login: (req, res) => {
    req.flash('success_messages','成功登入!')
    res.redirect('/basketball')
  },
  logout: (req, res) => {
    req.flash('success_messages','登出成功!')
    req.logout()
    res.redirect('/login')
  },
  editUser: (req, res) => {
    res.render('profile_form')
  },
  putUser: (req, res, next) => {
    const {name, position} = req.body
    const { file } = req
    if (!name.trim()) throw new Error("User's name is required!")
    return Promise.all([User.findByPk(req.user.id), imgurFileHandler(file)])
      .then(([user, filepath]) => {
        if (!user) throw new Error("User didn't exist!")
        return user.update({name, position, image: filepath || user.toJSON().image})
      })
      .then(() => {
        res.redirect('/basketball')
      })
      .catch(err => next(err))
  }
}

module.exports = userController