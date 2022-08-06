import { useState } from "react"
import axios from "axios"
import style from '../../styles/admin/adminPosts.module.css'

const AdminPokedexes = (props) => {
    const [pokedexes, setPokedexes] = useState([]);
    const [data, setData] = useState([]);
    const[dataReady, setDataReady] = useState(false)
    
    const fillPokedexes = async () => {
        const res = await axios.get("https://pokeapi.co/api/v2/pokedex/?offset=1&limit=27")
        setPokedexes(res.data.results.filter(item => item.name != 'conquest-gallery'))

    }

    const getNatDex = async (versionGroups) => {
        const res = await axios.get("https://pokeapi.co/api/v2/pokedex/1")
        data.push({
            name: res.data.names.filter(item => item.language.name == "en")[0].name,
            pokemon:{
                connect: res.data.pokemon_entries.map(
                    pokemon => (
                        {name: pokemon.pokemon_species.name[0].toUpperCase() + pokemon.pokemon_species.name.substring(1)}
                    )
                )
            },
            generations: {
                connect: versionGroups.map(
                    item => (
                        {
                            id: item.genId
                        }
                    )
                )
            }
        })
        setData([...data])
    }
        
    const fillData = async () => {
        const allVersionGroups = await axios.get("/api/public/allVersionGroups")
        getNatDex(allVersionGroups.data)
        for(let item of pokedexes){
            const res = await axios.get(`https://pokeapi.co/api/v2/pokedex/${item.name}`)
            data.push({
                name: res.data.names.filter(item => item.language.name == "en")[0].name,
                pokemon:{
                    connect: res.data.pokemon_entries.map(
                        pokemon => (
                            {name: pokemon.pokemon_species.name[0].toUpperCase() + pokemon.pokemon_species.name.substring(1)}
                        )
                    )
                },
                generations: {
                    connect: res.data.version_groups.map(item => 
                        (
                            {
                                id: allVersionGroups.data.filter(item2 => item2.name == item.name)[0].genId
                            }
                        )
                    )
                }
            })
            setData([...data])
        }
        setDataReady(true)
    }

    const sendPokedexes = async () => {
        for(let query of data){
            console.log("Started", data.indexOf(query))
            const res = await axios.post('/api/admin/post/pokedex', query)
            console.log(res.data)
            console.log("end");
        }

    }


    return(
        <div className={style.container}>  
            <button className={style.btn} onClick={() => {fillPokedexes()}}>Load Pokedexes</button>
            {
                pokedexes.length > 0? <button className={style.btn}onClick={()=>{fillData()}}>Load Extra Data</button>: <></>
            }
            {
                dataReady ? <button className={style.btn}onClick={()=>{sendPokedexes()}}>Send Load</button>: <></>
            }
        </div>
    )
}

export default AdminPokedexes