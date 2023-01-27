const { Record } = require('../models')
const { PLG, User } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')
const advanceData = require('../helpers/record-helpers')
const basketballController = {
    getIndex: (req, res, next) => {
      const user_id = Number(req.params.id) || req.user.id
      let PTS = 0 
      let FGA = 0
      let FTA = 0
      let FGM = 0
      let THREE_PM = 0
      let TOV = 0
      return Promise.all([User.findByPk(user_id, { include: [Record, { model: User, as: 'Followers' }], nest: true,  }),User.findAll({ include: [Record, { model: User, as: 'Followers' }, { model: User, as: 'Followings' }],  nest: true})])
        .then(( [user, users]) => {
          if (!users) throw new Error("Users didn't exist! ")
          all_user = users.map(user => ({
            ...user.toJSON(),
            followerCount: user.Followers.length,
            isFollowed: req.user.Followings.some(f => f.id === user.id),
            isFans: req.user.Followers.some(f => f.id === user.id)
          }))
          const followings = all_user.filter(user => user.isFollowed).sort((a,b) => b.followerCount - a.followerCount)
          const fans = all_user.filter(user => user.isFans).sort((a,b) => b.followerCount - a.followerCount)
          const follow = followings[0]
          const fan = fans[0]
          if (!user) throw new Error("This user didn't exist!")
          const other_user = {...user.toJSON(),
            followerCount: user.toJSON().Followers.length,
            isFollowed: req.user.Followings.some(f => f.id === user.toJSON().id)
          }
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
          user.update({PTS,FGA,FTA,FGM,THREE_PM,TOV,EFG,TS,TO_V,game})
          res.render('index',{game,EFG,TS,TO_V,other_user,followings,fans,follow,fan}) 
        })
        .catch(err => next(err))
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
    getRecord: (req, res, next) => {
      const user_id = Number(req.params.id) || req.user.id
      return User.findByPk(user_id, {include: Record, nest: true, order:[[Record, 'id', 'DESC']] })
        .then(user => {
          if (!user) throw new Error("This user didn't exist!")
          const other_user = user.toJSON()
          res.render('record',{records: other_user.Records,  other_user} )
        })
        .catch(err => next(err))
    },
    getRank: (req, res) => {
      const sorts = ['games','efg','ts','tov']
      const orders = ['DESC','ASC']
      const teams = ['臺北富邦勇士','桃園領航猿','新竹街口攻城獅','福爾摩沙台新夢想家','高雄鋼鐵人','新北國王']
      const sort = sorts.find(sort => sort === req.query.sort) || 'id'
      const order = orders.find(order => order === req.query.order) || 'ASC'
      const team = teams.find(team => team === req.query.team ) || ''
      return PLG.findAll({  raw:true,nest:true,  where: {...team ? {team} : {}}, order: [[sort, order]]})
        .then(plg => {
          Plg = plg.map(plgs => ({
            ...plgs,
            index: plg.indexOf(plgs) + 1
          }))
          res.render('rank', {plg: Plg, team, sort, order})
        }  
        )
    },
    getUserRank: (req, res, next) => {
      const sorts = ['PTS','FGA','FTA','FGM','THREE_PM','TOV','game','EFG','TS','TO_V']
      const orders = ['DESC','ASC']
      const sort = sorts.find(sort => sort === req.query.sort) || 'PTS'
      const order = orders.find(order => order === req.query.order) || 'DESC'
      return User.findAll({raw: true, nest: true, order: [[sort, order]]})
        .then(users => {
          users = users.map(user => ({
            ...user,
            index: users.indexOf(user) + 1
          }))
          res.render('user-rank', {users})
        })
    },
    getPlayer: (req, res, next) => { 
      const player = req.query.player?.trim().toLowerCase() || ""
      return User.findAll({ include: [{ model: User, as: 'Followers' }, Record],nest:true})
        .then((users) => {
          if (!users) throw new Error("Users didn't exist! ")
          all_user = users.map(user => ({
            ...user.toJSON(),
            followerCount: user.Followers.length,
            isFollowed: req.user.Followings.some(f => f.id === user.id),
            latest: user.toJSON().Records.pop() || {},
            comprehensive: user.toJSON().Records.pop()?.efg+user.toJSON().Records.pop()?.ts - user.toJSON().Records.pop()?.to_v || 0
          })) 
          if (!player) {
            all_user = all_user.filter(user => user.comprehensive >= 85)
          }
          all_user = all_user.sort((a,b) => b.comprehensive - a.comprehensive)
          all_user = all_user.filter(user => user.name.toLowerCase().includes(player))
          res.render('top-player', { users: all_user, player})
        })
        .catch(err => next(err))  
    }
}
module.exports = basketballController