import { useState } from "react"
import axios from "axios"
import style from '../../styles/admin/adminPosts.module.css'

const AdminAbilities = (props) => {
    const [abilities, setAbilities] = useState([]);
    const [data, setData] = useState([]);
    const [dataReady, setDataReady] = useState(false);
    
    const fillAbilities = async () => {
        // const res = await axios.get("https://pokeapi.co/api/v2/ability?offset=0&limit=76")
        const res = await axios.get("https://pokeapi.co/api/v2/ability?offset=0&limit=267")
        setAbilities(res.data.results)
    }
        
    const loadDescriptions = async () => {
        for(let item of abilities){
            const res = await axios.get(`https://pokeapi.co/api/v2/ability/${item.name}`)
            
            data.push(
                {name: (item.name[0].toUpperCase() + item.name.substring(1)).replace(/(-)/g, " "), 
                    description: res.data.flavor_text_entries.filter(
                        item2 => item2.language.name == "en" && (
                            item2.version_group.name == "lets-go-pikachu-lets-go-eevee" || item2.version_group.name == "ultra-sun-ultra-moon" || item2.version_group.name == "sword-shield"
                        )
                    )[0].flavor_text.replace(/(\n|\u000c)/g, " ").replace(/POK.MON/gi, "Pokémon"),
                    generation: {
                        connect: {
                            name: res.data.generation.name
                        }
                    }
                }
                )

            setData([...data])
        }
        setDataReady(true)
    }
        
    const sendAbilities = async () => {
        console.log("Sending Abilities")
        for(let query of data){
            console.log("Started", data.indexOf(query))
            const res = await axios.post('/api/admin/post/ability/', query)
            console.log(res.data)
            console.log("end")
        }
    }


    return(
        <div className={style.container}>  
            <button className={style.btn} onClick={() => {fillAbilities()}}>Load Abilities</button>
            {
                abilities.length > 0? <button className={style.btn}onClick={()=>{loadDescriptions()}}>Load Extra Data</button>: <></>
            }
            {
                dataReady? <button className={style.btn}onClick={()=>{sendAbilities()}}>Send Abilities</button>: <></>
            }
        </div>
    )
}

export default AdminAbilities