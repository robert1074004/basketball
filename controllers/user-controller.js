const bcrypt = require('bcryptjs')
const db = require('../models')
const { imgurFileHandler } = require('../helpers/file-helpers')
const { User, Followship } = db
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
    res.redirect('/basketball/:id')
  },
  logout: (req, res, next) => {
    req.flash('success_messages','登出成功!')
    req.logout(function(err) {
      if (err)  return next(err) 
      res.redirect('/login')
    })
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
        res.redirect('/basketball/:id')
      })
      .catch(err => next(err))
  },
  addFollowing: (req, res, next) => {
    const { userId } = req.params
    Promise.all([User.findByPk(userId), Followship.findOne({ where: { followerId: req.user.id, followingId: req.params.userId }})])
      .then(([user, followship]) => {
        if (!user) throw new Error("User didn't exist!")
        if (followship) throw new Error('You are already following this user')
        return Followship.create({
          followerId: req.user.id,
          followingId: userId
        })
      })
      .then(() => {
        req.flash('success_messages','追蹤成功!')
        res.redirect('back')
      })
      .catch(err => next(err))
  },
  removeFollowing: (req, res, next) => {
    Followship.findOne({
      where: {
        followerId: req.user.id,
        followingId: req.params.userId
      }
    })
      .then(followship => {
        if (!followship) throw new Error("You haven't followed this user!")
        return followship.destroy()
      })
      .then(() => {
        req.flash('success_messages','取消追蹤成功!')
        res.redirect('back')
      })
      .catch(err => next(err))
  }
}

module.exports = userController