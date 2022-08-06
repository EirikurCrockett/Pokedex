import { useState } from "react"
import axios from "axios"
import style from '../../styles/admin/adminPosts.module.css'

const AdminVersions = (props) => {
    const [groups, setGroups] = useState([]);
    const [data, setData] = useState([]);
    const [dataReady, setDataReady] = useState(false);
    
    const fillGroups = async () => {
        // const res = await axios.get("https://pokeapi.co/api/v2/version-group/?offset=0&limit=7")
        // const res1 = await axios.get("https://pokeapi.co/api/v2/version-group/?offset=0&limit=11")
        // const res2 = await axios.get("https://pokeapi.co/api/v2/version-group/?offset=13&limit=7")
        const res = await axios.get("https://pokeapi.co/api/v2/version-group/?offset=0&limit=20")

        
        // setGroups([...res1.data.results, ...res2.data.results])
        setGroups([...res.data.results])
    }
    
    const getGames = (version, genName) => {
        return({
            name: version[0].toUpperCase() + version.substring(1),
            generation: {
                connect: {
                    name: genName
                }
            }
        })
    }

    const fillData = async () => {
        for(let item1 of groups){
            const res = await axios.get(`https://pokeapi.co/api/v2/version-group/${item1.name}`)
            const games = []
            for(let item2 of res.data.versions.filter(item => item.name != "colosseum" && item.name != "xd")){
                games.push(getGames(item2.name,  res.data.generation.name))
            }
            data.push({
                name: res.data.name,
                generation:{
                    connect:{
                        name: res.data.generation.name,
                    }
                },
                games:{
                    create: games
                }
            })
            setData([...data])
        }
        setDataReady(true)
    }


        
    const sendGames = async () => {
        console.log("Populating Versions");
        for(let query of data){
            console.log("Started", data.indexOf(query))
            const res = await axios.post('/api/admin/post/versions/', query)
            console.log(res.data)
            console.log("End");
        }

    }


    return(
        <div className={style.container}>  
            <button className={style.btn} onClick={() => {fillGroups()}}>Load Versions</button>
            {
                groups.length > 0? <button className={style.btn}onClick={()=>{fillData()}}>Load Extra Data</button>: <></>
            }
            {
                dataReady ? <button className={style.btn}onClick={()=>{sendGames()}}>Send Versions</button>: <></>
            }
        </div>
    )
}

export default AdminVersions