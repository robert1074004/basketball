
const advanceData = require('../helpers/record-helpers')


const recordValidator = (req, res, next) => {
    console.log(req.body)
    const {PTS, FGA, FTA, FGM, THREE_PM, TOV } = req.body
    req.body.efg = advanceData.getEfg(FGM,THREE_PM,FGA)
    req.body.ts = advanceData.getTs(PTS,FTA,FGA)
    req.body.to_v = advanceData.getTov(TOV,FTA,FGA)
    if (req.body.efg > 100 || req.body.ts> 100 || req.body.to_v > 100) throw new Error('Some fields were wrong !')
    next()
}
   
    

module.exports =  { recordValidator }