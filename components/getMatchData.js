export function getMatchData(summoner_names){

    const api_key = 'RGAPI-4b30d24d-1c5a-4707-a62f-9335fd428576'


    const temp = async () => {
        let nameToPuuid =  summonerId_to_PUUID(summoner_names)
        let matchResults =  getPreviousMatches(nameToPuuid, 3)
    }
    

    
    const summonerId_to_PUUID = async (summoner_ids) => {
        var jsonData = []
        for (var i = 0; i < summoner_ids.length; i++) {
            let summoner_id = summoner_ids[i]

            const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner_id}?api_key=${api_key}`
            const response = await fetch(url)
            const account_info = await response.json()

            jsonData[i] = { summonerName: summoner_id, puuid: account_info.puuid }
        }
        return jsonData
    }

    const getPreviousMatches = async (puuids, count) => {
        const matchResults = {}
        for (var i = 0; i < puuids.length; i++) {
            let puuid = puuids[i].puuid
            console.log(" FOR PLAYER ------------------", puuids[i])
            const url = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}&api_key=${api_key}`
            const response = await fetch(url)
            const matches = await response.json()
            let winLose = await parseMatchInfo(matches, puuid)
            
            matchResults[puuids[i].summonerName] = winLose
        }
        console.log("matchresults is ", matchResults)
        return matchResults
    }

    const parseMatchInfo = async (matchids, puuid) => {
        var temp = []
        for (var i = 0; i < matchids.length; i++) {
            let matchid = matchids[i]
            const url = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchid}?api_key=${api_key}`
            const response = await fetch(url)
            const matchData = await response.json()
            temp.push(matchData.info.participants.find(el => el.puuid == puuid).win)
        }
        return temp
    }

}