const { Record } = require('../models')
const { PLG } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')
const advanceData = require('../helpers/record-helpers')
const basketballController = {
    getIndex: (req, res) => {
      let PTS = 0 
      let FGA = 0
      let FTA = 0
      let FGM = 0
      let THREE_PM = 0
      let TOV = 0
      Record.findAll({where: {UserId: req.user.id}})
        .then(records => {records.forEach(record => {
          PTS += (record.PTS / records.length)
          FGA += (record.FGA / records.length)
          FTA += (record.FTA / records.length)
          FGM += (record.FGM / records.length)
          THREE_PM += (record.THREE_PM / records.length)
          TOV += (record.TOV / records.length)
        })
        let game = records.length
        const efg = advanceData.getEfg(FGM,THREE_PM,FGA)
        const ts = advanceData.getTs(PTS,FTA,FGA)
        const to_v = advanceData.getTov(TOV,FTA,FGA)
        const EFG = efg*100
        const TS = ts*100
        const TO_V = to_v * 100
        res.render('index',{efg,ts,to_v,game,EFG,TS,TO_V})
      })
    },
    getForm: (req, res) => {
      return res.render('create-form')
    },
    editForm: (req, res, next) => {
      return Record.findByPk(req.params.id,{raw: true, nest: true})
        .then(record => {
          if (!record) throw new Error("Record didn't exist!")
          res.render('edit-form', {record})})
        .catch(err => next(err))
    },
    postRecord: (req, res, next) => {
      const UserId = req.user.id
      const {PTS, FGA, FTA, FGM, THREE_PM, TOV, date} = req.body
      const efg = advanceData.getEfg(FGM,THREE_PM,FGA)
      const ts = advanceData.getTs(PTS,FTA,FGA)
      const to_v = advanceData.getTov(TOV,FTA,FGA)
      Record.create({PTS,FGA,FTA,FGM,THREE_PM,TOV,date,efg,ts,to_v,UserId})
        .then(() => res.redirect('/basketball/record'))
        .catch(err => next(err))
    },
    putRecord: (req, res, next) => {
      const {PTS, FGA, FTA, FGM, THREE_PM, TOV, date} = req.body
      const efg = advanceData.getEfg(FGM,THREE_PM,FGA)
      const ts = advanceData.getTs(PTS,FTA,FGA)
      const to_v = advanceData.getTov(TOV,FTA,FGA)
      return Record.findByPk(req.params.id)
        .then(record => {
          if (!record) throw new Error("Record didn't exist!")
          return record.update({PTS,FGA,FTA,FGM,THREE_PM,TOV,date,efg,ts,to_v})
        })
        .then(() => res.redirect('/basketball/record'))
        .catch(err => next(err))
    },
    deleteRecord: (req, res, next) => {
      return Record.findByPk(req.params.id)
        .then(record => {
          if (!record) throw new Error("Record didn't exist!")
          return record.destroy()
        })
        .then(() => res.redirect('/basketball/record'))
        .catch(err => next(err))
    },
    getRecord: (req, res) => {
      Record.findAll({where: {UserId: req.user.id},raw:true,nest:true})
        .then(records =>  res.render('record',{records} ) ) 
    },
    getRank: (req, res) => {
      const DEFAULT_LIMIT = 9
      const sort = req.query.sort || 'id'
      const order = req.query.order || 'ASC'
      const team = req.query.team || ''
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || DEFAULT_LIMIT
      const offset = getOffset(limit, page)
      return PLG.findAndCountAll({ raw:true, nest:true, limit, offset, where: {...team ? {team} : {}}, order: [[sort, order]]})
        .then(plg => {
          // plg = plg.rows.filter(player => player.games >= 20)
          res.render('rank', {plg: plg.rows, team, pagination: getPagination(limit, page, plg.count), sort, order})
        }  
        )
    }
}
module.exports = basketballController