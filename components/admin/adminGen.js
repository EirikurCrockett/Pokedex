import { useState } from "react"
import axios from "axios"
import style from '../../styles/admin/adminPosts.module.css'

const AdminGens = (props) => {
    const [gens, setGens] = useState([]);
    const [data, setData] = useState([]);
    const [dataReady, setDataReady] = useState(false);
    
    const fillGens = async () => {
        const res = await axios.get("https://pokeapi.co/api/v2/generation/")
        // const res = await axios.get("https://pokeapi.co/api/v2/generation/?limit=3&offset=0")

        setGens(res.data.results)
    }

    const fillData = () => {
        for(let item of gens){
            // console.log(item)
            data.push({name: item.name})
            setData([...data])
        }
        setDataReady(true)
    }
        
    const sendGens = async () => {
        console.log("Sending Generations")
        const res = await axios.post('/api/admin/post/generation/', data)
        console.log(res.data)
        console.log("End")
    }


    return(
        <div className={style.container}>  
            <button className={style.btn} onClick={() => {fillGens()}}>Load Gens</button>
            {
                gens.length > 0? <button className={style.btn}onClick={()=>{fillData()}}>Load Extra Data</button>: <></>
            }
            {
                dataReady ? <button className={style.btn}onClick={()=>{sendGens()}}>Send Gens</button>: <></>
            }
        </div>
    )
}

export default AdminGens