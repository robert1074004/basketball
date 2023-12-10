const { body, validationResult } = require('express-validator')
const advanceData = require('../helpers/record-helpers')

const formError = (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) throw new Error(`${error.errors[0].msg}`)
    next()
}

const signUpValidator = [body('password').trim().isLength({min:8}).withMessage('密碼長度不足!'), body('email').trim().isEmail().withMessage('Email格式不符!'), body('name').trim().notEmpty().withMessage('名子不得為空白'), body('position').trim().notEmpty().withMessage('位置不得為空白'), body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) throw new Error('Password do not match!')
    return true
})]

const recordValidator = (req, res, next) => {
    const {PTS, FGA, FTA, FGM, THREE_PM, TOV } = req.body
    req.body.efg = advanceData.getEfg(FGM,THREE_PM,FGA)
    req.body.ts = advanceData.getTs(PTS,FTA,FGA)
    req.body.to_v = advanceData.getTov(TOV,FTA,FGA)
    if ( req.body.to_v > 100) throw new Error('Some fields were wrong !')
    next()
}
   
    

module.exports =  { recordValidator, signUpValidator, formError }