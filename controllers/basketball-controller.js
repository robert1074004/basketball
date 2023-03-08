const { Record } = require('../models')
const { PLG, User } = require('../models')
const advanceData = require('../helpers/record-helpers')
const { Op } = require('sequelize')
const basketballController = {
    getIndex: async (req, res, next) => {
      const user_id = Number(req.params.id) || req.user.id
      let pts = 0 
      let fga = 0
      let fta = 0
      let fgm = 0
      let three_pm = 0
      let tov = 0
      try{
        const user = await User.findByPk(user_id, { include: [Record, { model: User, as: 'Followers' }], nest: true })
        if (!user) throw new Error("User didn't exist! ")
        const users = await User.findAll({ include: [Record, { model: User, as: 'Followers' }, { model: User, as: 'Followings' }],  nest: true })
        const all_user = users.map(user => ({
                ...user.toJSON(),
                followerCount: user.Followers.length,
                isFollowed: req.user.Followings.some(f => f.id === user.id),
                isFans: req.user.Followers.some(f => f.id === user.id)
              }))
        
        const followings = all_user.filter(user => user.isFollowed).sort((a,b) => b.followerCount - a.followerCount)
        const fans = all_user.filter(user => user.isFans).sort((a,b) => b.followerCount - a.followerCount)
        const follow = followings[0]
        const fan = fans[0]
        const other_user = {...user.toJSON(),
            followerCount: user.toJSON().Followers.length,
            isFollowed: req.user.Followings.some(f => f.id === user.toJSON().id)
        }
        other_user.Records.forEach(record => {
            pts += (record.PTS / user.Records.length)
            fga += (record.FGA / user.Records.length)
            fta += (record.FTA / user.Records.length)
            fgm += (record.FGM / user.Records.length)
            three_pm += (record.THREE_PM / user.Records.length)
            tov += (record.TOV / user.Records.length)
        })
        let PTS = pts.toFixed(2)
        let FGA = fga.toFixed(2)
        let FTA = fta.toFixed(2)
        let FGM = fgm.toFixed(2)
        let THREE_PM = three_pm.toFixed(2)
        let TOV = tov.toFixed(2)
        pts = pts.toFixed()
        fga = fga.toFixed()
        fta = fta.toFixed()
        fgm = fgm.toFixed()
        three_pm = three_pm.toFixed()
        tov = tov.toFixed()
        let game = other_user.Records.length
        const EFG = advanceData.getEfg(fgm,three_pm,fga)
        const TS = advanceData.getTs(pts,fta,fga)
        const TO_V = advanceData.getTov(tov,fta,fga)
        await user.update({PTS,FGA,FTA,FGM,THREE_PM,TOV,EFG,TS,TO_V,game})
        res.render('index',{game,EFG,TS,TO_V,other_user,followings,fans,follow,fan})
      } catch (err) {
         next(err)
      }
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
        .then(() => {
            req.flash("success_messages", "成功新增數據")
            res.redirect('/basketball/:id')
          })
        .catch(err => next(err))
        },
    putRecord: (req, res, next) => {
      const { PTS, FGA, FTA, FGM, THREE_PM, TOV, date } = req.body
      const efg = advanceData.getEfg(FGM,THREE_PM,FGA)
      const ts = advanceData.getTs(PTS,FTA,FGA)
      const to_v = advanceData.getTov(TOV,FTA,FGA)
      if (efg > 100 || ts > 100 || to_v > 100) throw new Error('Some fields were wrong !')
      return Record.findByPk(req.params.id)
        .then(record => {
          if (!record) throw new Error("Record didn't exist!")
          return record.update({PTS,FGA,FTA,FGM,THREE_PM,TOV,date,efg,ts,to_v})
        })
        .then(() => {
          req.flash("success_messages", "成功修改數據")
          res.redirect('/basketball/:id')
        })
        .catch(err => next(err))
    },
    deleteRecord: (req, res, next) => {
      return Record.findByPk(req.params.id)
        .then(record => {
          if (!record) throw new Error("Record didn't exist!")
          return record.destroy()
        })
        .then(() => {
          req.flash("success_messages", "成功刪除數據")
          res.redirect('/basketball/:id')
        })
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
    getRank: (req, res, next) => {
      const player = req.query.player?.trim() || ""
      const sorts = ['PTS','FGA','FTA','FGM','THREE_PM','TOV','game','EFG','TS','TO_V']
      const teams = ['臺北富邦勇士','桃園領航猿','新竹街口攻城獅','福爾摩沙台新夢想家','高雄鋼鐵人','新北國王']
      const sort = sorts.find(sort => sort === req.query.sort) || 'PTS'
      const team = teams.find(team => team === req.query.team ) || ''
      return PLG.findAll({  raw:true,nest:true,  where: {...team ? {team} : {}, name: {[ Op.substring ]: player}}, order: [[sort, 'DESC']]})
        .then(plg => {
          if (!plg) throw new Error("PLG didn't exist !")
          plg = plg.map(plgs => ({
            ...plgs,
            index: plg.indexOf(plgs) + 1
          }))
          res.render('rank', { plg, team, sort, player })
        }  
        )
        .catch(err => next(err))
    },
    getUserRank: (req, res, next) => {
      const sorts = ['PTS','FGA','FTA','FGM','THREE_PM','TOV','game','EFG','TS','TO_V']
      const sort = sorts.find(sort => sort === req.query.sort) || 'PTS'
      return User.findAll({raw: true, nest: true, order: [[sort, 'DESC']]})
        .then(users => {
          if (!users) throw new Error("Users didn't exist !")
          users = users.map(user => ({
            ...user,
            index: users.indexOf(user) + 1
          }))
          res.render('user-rank', {users, sort})
        })
        .catch(err => next(err))
    },
    getPlayer: (req, res, next) => { 
      return User.findAll({ include: [{ model: User, as: 'Followers' }, Record],nest:true})
        .then((users) => {
          if (!users) throw new Error("Users didn't exist! ")
          let all_user = users.map(user => ({
            ...user.toJSON(),
            followerCount: user.Followers.length,
            isFollowed: req.user.Followings.some(f => f.id === user.id),
            latest: user.toJSON().Records.pop() || {},
            comprehensive: user.toJSON().Records.pop()?.efg+user.toJSON().Records.pop()?.ts - user.toJSON().Records.pop()?.to_v || 0
          })) 
          all_user = all_user.filter(user => user.comprehensive >= 85)
          all_user = all_user.sort((a,b) => b.comprehensive - a.comprehensive)
          res.render('top-player', { users: all_user })
        })
        .catch(err => next(err))  
    }
}
module.exports = basketballController