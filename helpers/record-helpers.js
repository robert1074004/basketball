

const advanceData = {
    getEfg: (FGM,THREE_PM,FGA) => {
        let efg = (10*FGM+5*THREE_PM) / FGA
        efg = efg / 10 
        efg = efg.toFixed(2)
        if (isNaN(efg)) {
            efg = 0
        }
        return efg 
    },
    getTs: (PTS, FTA ,FGA) => {
        let ts = PTS / (2*((100*FGA+44*FTA)/100))
        ts = ts.toFixed(2)
        if (isNaN(ts)) {
            ts = 0
        }
        return ts
    },
    getTov: (TOV, FTA ,FGA) => {
        let denominator = (100*FGA+44*FTA+100*TOV)
        denominator = denominator / 100
        let tov = TOV / denominator
        tov = tov.toFixed(2)
        if (isNaN(tov)) {
            tov = 0
        }
        return tov
    }
}

module.exports = advanceData

