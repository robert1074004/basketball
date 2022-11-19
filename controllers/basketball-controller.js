const { Record } = require('../models')
const { PLG, User } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')
const advanceData = require('../helpers/record-helpers')
const basketballController = {
    getIndex: (req, res) => {
      const user_id = Number(req.params.id) || req.user.id
      let PTS = 0 
      let FGA = 0
      let FTA = 0
      let FGM = 0
      let THREE_PM = 0
      let TOV = 0
      Promise.all([User.findAll({ nest: true, raw:true }), User.findByPk(user_id, { include: Record, nest: true,  })])
        .then(([users, user]) => {
          other_user = user.toJSON()
          user.Records.forEach(record => {
            PTS += (record.PTS / user.Records.length)
            FGA += (record.FGA / user.Records.length)
            FTA += (record.FTA / user.Records.length)
            FGM += (record.FGM / user.Records.length)
            THREE_PM += (record.THREE_PM / user.Records.length)
            TOV += (record.TOV / user.Records.length)
          })
          PTS = PTS.toFixed()
          FGA = FGA.toFixed()
          FTA = FTA.toFixed()
          FGM = FGM.toFixed()
          THREE_PM = THREE_PM.toFixed()
          TOV = TOV.toFixed()
          let game = user.Records.length
          const EFG = advanceData.getEfg(FGM,THREE_PM,FGA)
          const TS = advanceData.getTs(PTS,FTA,FGA)
          const TO_V = advanceData.getTov(TOV,FTA,FGA)
          res.render('index',{game,EFG,TS,TO_V,users,other_user})
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
      if (efg > 100 || ts > 100 || to_v > 100) throw new Error('Some fields were wrong !')
      Record.create({PTS,FGA,FTA,FGM,THREE_PM,TOV,date,efg,ts,to_v,UserId})
        .then(() => res.redirect('/basketball/record'))
        .catch(err => next(err))
    },
    putRecord: (req, res, next) => {
      const {PTS, FGA, FTA, FGM, THREE_PM, TOV, date} = req.body
      const efg = advanceData.getEfg(FGM,THREE_PM,FGA)
      const ts = advanceData.getTs(PTS,FTA,FGA)
      const to_v = advanceData.getTov(TOV,FTA,FGA)
      if (efg > 100 || ts > 100 || to_v > 100) throw new Error('Some fields were wrong !')
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
      const user_id = Number(req.params.id) || req.user.id
      const DEFAULT_LIMIT = 9
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || DEFAULT_LIMIT
      const offset = getOffset(limit, page)
      return Record.findAndCountAll({where: {UserId: user_id},raw:true,nest:true, limit , offset})
        .then(records =>  res.render('record',{records: records.rows, pagination: getPagination(limit, page, records.count), user_id} ) ) 
    },
    getRank: (req, res) => {
      const DEFAULT_LIMIT = 10
      const sorts = ['games','efg','ts','tov']
      const orders = ['DESC','ASC']
      const teams = ['臺北富邦勇士','桃園領航猿','新竹街口攻城獅','福爾摩沙台新夢想家','高雄鋼鐵人','新北國王']
      const sort = sorts.find(sort => sort === req.query.sort) || 'id'
      const order = orders.find(order => order === req.query.order) || 'ASC'
      const team = teams.find(team => team === req.query.team ) || ''
      const page = Number(req.query.page) || 1
      const limit =  DEFAULT_LIMIT
      const offset = getOffset(limit, page)
      return PLG.findAndCountAll({ raw:true, nest:true, limit, offset, where: {...team ? {team} : {}}, order: [[sort, order]]})
        .then(plg => {
          Plg = plg.rows.map(plgs => ({
            ...plgs,
            index: offset + plg.rows.indexOf(plgs) + 1
          }))
          res.render('rank', {plg: Plg, team, pagination: getPagination(limit, page, plg.count), sort, order})
        }  
        )
    }
}
module.exports = basketballController