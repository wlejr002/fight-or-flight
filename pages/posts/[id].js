import { useState } from "react"
import { useRouter } from 'next/router'



// const router = useRouter();
// const api_key = ''
// const acc_name = router.query.id


function apiLanding() {
    const router = useRouter();
    const api_key = 'RGAPI-e3209815-b864-471e-a8f4-61573373a1f3'
    const acc_name = router.query.id
    const summoner_name_url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${acc_name}?api_key=${api_key}`
    const matchResults = {} 

    const [data, setData] = useState()
    const fetchData = async () => {
        try {
            let summoner_id = await getId()
            let currentParticipants = await getCurrentMatch(summoner_id)
            console.log("result is ", summoner_id)
            console.log("current match is ", currentParticipants)
            let nameToPuuid = await summonerId_to_PUUID(currentParticipants)
            console.log("name to puuid is", nameToPuuid)
            console.log(getPreviousMatches(nameToPuuid, 3))
            console.log(matchResults)
        } catch {
            console.log(`fail`)
        }
    }

    const getId = async () => {

        const response_name = await fetch(summoner_name_url)
        const summoner_by_name_data = await response_name.json()
        var summoner_id = summoner_by_name_data.id
        console.log(summoner_id)
        return summoner_id
    }

    const getCurrentMatch = async (summoner_id) => {
        console.log("summoner id is ", summoner_id)
        const spectator_id = `https://na1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summoner_id}?api_key=${api_key}`

        const response_spectator = await fetch(spectator_id)
        const curr_match = await response_spectator.json()
        var participants = curr_match.participants

        let protagonist_team = participants.find(el => el.summonerId == summoner_id).teamId
        let team_memebers = participants.filter(member => member.teamId == protagonist_team)
        return team_memebers
    }

    const summonerId_to_PUUID = async (summoner_ids) => {
        var jsonData = []
        for (var i = 0; i < summoner_ids.length; i++) {
            let summoner_id = summoner_ids[i].summonerName

            const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner_id}?api_key=${api_key}`
            const response = await fetch(url)
            const account_info = await response.json()

            jsonData[i] = { summonerName: summoner_id, puuid: account_info.puuid }
        }
        return jsonData
    }

    const getPreviousMatches = async (puuids, count) => {
        for (var i = 0; i < puuids.length; i++) {
            let puuid = puuids[i].puuid
            console.log(" FOR PLAYER ------------------", puuids[i])
            const url = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}&api_key=${api_key}`
            const response = await fetch(url)
            const matches = await response.json()
            let winLose = await parseMatchInfo(matches, puuid)
            
            matchResults[puuids[i].summonerName] = winLose
        }
        setData(matchResults)
        console.log(matchResults)
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




    return (
        <div>
            <button onClick={fetchData} >data</button>
            <h1> Hello World  </h1>
        </div>


    )
}

export default apiLanding