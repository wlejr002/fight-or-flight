import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import { getMatchData } from "../../components/getMatchData"

// const router = useRouter();
// const api_key = ''
// const acc_name = router.query.id


function apiLanding() {

    const router =useRouter()
    const acc_name = router.query.id.split("   ")

    const api_key = 'RGAPI-bcb8d002-98d4-4013-bd1a-413919def18f'
    const matchResults = []
    const [data, setData] = useState()
    const [isLoading, setLoading] = useState(false)

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
        for (var i = 0; i < puuids.length; i++) {
            let puuid = puuids[i].puuid
            console.log(" FOR PLAYER ------------------", puuids[i])
            const url = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}&api_key=${api_key}`
            const response = await fetch(url)
            const matches = await response.json()
            let winLose = await parseMatchInfo(matches, puuid)

            let temp2 = puuids[i].summonerName.toString()

            const ddd = { summonerName : temp2 ,
                            winRecords :winLose}
            
            matchResults.push( ddd)
            

            
        }
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

   
    const fetchData = async () => {
        try {

            let nameToPuuid = await summonerId_to_PUUID(acc_name)
            console.log("nametopuuid", nameToPuuid)
            let prevMatches = await getPreviousMatches(nameToPuuid, 2)
            console.log("prevmatches", prevMatches)
            return prevMatches
        } catch {
            console.log(`fail`)
        }
    }

    useEffect (() => {
        setLoading(true)
        fetchData()
            .then((data) => {
                setData(data), 
                setLoading(false),
                console.log("data is" , data)})
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>

    return (
        data.map((res) => 
            <div> 
                {<li key={res.summonerName}> 
                    {res.summonerName}
                </li>}
                
                {res.winRecords.map((item) => 
                <h1>{item.toString()}</h1>)}
                    
            </div>
        )

    )




}

export default apiLanding
