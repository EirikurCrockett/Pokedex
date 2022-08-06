import { useState } from "react"
import axios from "axios"
import style from '../../styles/admin/adminPosts.module.css'
import { version } from "react-dom";

const AdminMoves = (props) => {
    const [moves, setMoves] = useState([]);
    const [data, setData] = useState([]);
    const [dataReady, setDataReady] = useState(false)
    
    const fillMoves = async () => {
        // const res = await axios.get("https://pokeapi.co/api/v2/move/?offset=0&limit=354")
        const res = await axios.get("https://pokeapi.co/api/v2/move/?offset=0&limit=826")
        
        setMoves(res.data.results)
    }

    const fillData = async () => {
        for(let item of moves){
            const res = await axios.get(`https://pokeapi.co/api/v2/move/${item.name}`)

            data.push(
                {
                    name: (res.data.name[0].toUpperCase() + res.data.name.substring(1)).replace(/(-)/g, " "),
                    accuracy: res.data.accuracy != null? res.data.accuracy: 0,
                    power: res.data.power != null? res.data.power: 0,
                    pp: res.data.pp != null? res.data.pp: 0,
                    damageType: res.data.damage_class.name != null? res.data.damage_class.name: "-",
                    description: res.data.flavor_text_entries.filter(item2 => item2.language.name == "en" && (/**item2.version_group.name == "firered-leafgreen" || item2.version_group.name == "emerald" */
                        item2.version_group.name == "lets-go-pikachu-lets-go-eevee" || item2.version_group.name == "ultra-sun-ultra-moon" || item2.version_group.name == "sword-shield"))[0].flavor_text.replace(/(\n|\u000c)/g, " ").replace(/POK.MON/gi, "Pokémon"),
                    type:{
                        connect:{
                            name: res.data.type.name[0].toUpperCase() + res.data.type.name.substring(1),
                            // name: res.data.type.name == "fairy" ? res.data.past_values[0].type.name : res.data.type.name
                            
                        }
                    }
                }
            )
            setData([...data])
        }
        setDataReady(true);
    }


        
    const sendMoves = async () => {
        console.log("Populating Moves")
        for(let item of data){
            console.log("Started", data.indexOf(item))
            const res = await axios.post('/api/admin/post/move/', item)
            console.log(res.data)
            console.log("end")
        }
    }


    return(
        <div className={style.container}>  
            <button className={style.btn} onClick={() => {fillMoves()}}>Load Moves</button>
            {
                moves.length > 0? <button className={style.btn}onClick={()=>{fillData()}}>Load Extra Data</button>: <></>
            }
            {
                dataReady ? <button className={style.btn}onClick={()=>{sendMoves()}}>Send Moves</button>: <></>
            }
        </div>
    )
}

export default AdminMoves