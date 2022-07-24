const { Record } = require('../models')
const advanceData = require('../helpers/record-helpers')
const basketballController = {
    getIndex: (req, res) => {
      let PTS = 0 
      let FGA = 0
      let FTA = 0
      let FGM = 0
      let THREE_PM = 0
      let TOV = 0
      Record.findAll({raw:true,nest:true})
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
      return res.render('form')
    },
    postRecord: (req, res, next) => {
      const {PTS, FGA, FTA, FGM, THREE_PM, TOV, date} = req.body
      const efg = advanceData.getEfg(FGM,THREE_PM,FGA)
      const ts = advanceData.getTs(PTS,FTA,FGA)
      const to_v = advanceData.getTov(TOV,FTA,FGA)
      Record.create({PTS,FGA,FTA,FGM,THREE_PM,TOV,date,efg,ts,to_v,UserId:1})
        .then(() => res.redirect('/basketball/record'))
        .catch(err => next(err))
    },
    getRecord: (req, res) => {
      Record.findAll({raw:true,nest:true})
        .then(records =>  res.render('record',{records} ) ) 
    },
    getRank: (req, res) => {
      return res.render('rank')
    }
}
module.exports = basketballController