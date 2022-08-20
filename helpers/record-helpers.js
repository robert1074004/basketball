

const advanceData = {
    getEfg: (FGM,THREE_PM,FGA) => {
        let efg = (100*FGM+50*THREE_PM) / FGA 
        efg = efg.toFixed()
        if (isNaN(efg)) {
            efg = 0
        }
        return efg 
    },
    getTs: (PTS, FTA ,FGA) => {
        let ts = (PTS*100) / (2*((100*FGA+44*FTA)/100))
        ts = ts.toFixed()
        if (isNaN(ts)) {
            ts = 0
        }
        return ts
    },
    getTov: (TOV, FTA ,FGA) => {
        let denominator = (100*FGA+44*FTA+100*TOV)
        denominator = denominator / 100
        let tov = (TOV*100) / denominator
        tov = tov.toFixed()
        if (isNaN(tov)) {
            tov = 0
        }
        return tov
    }
}

module.exports = advanceData

