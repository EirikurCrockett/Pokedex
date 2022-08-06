import { useState } from "react"
import axios from "axios"
import style from '../../styles/admin/adminPosts.module.css'

const AdminEggGroups = (props) => {
    const [eggGroups, setEggGroups] = useState([]);
    const [data, setData] = useState([]);
    const [dataReady, setDataReady] = useState(false);
    
    const fillEggGroups = async () => {
        const res = await axios.get("https://pokeapi.co/api/v2/egg-group")
        
        setEggGroups(res.data.results)
    }
        
    const fillData = () => {
        for(let item of eggGroups){
            data.push(
                {name: item.name[0].toUpperCase() + item.name.substring(1)}
            )
            setData([...data])
        }
        setDataReady(true)
    }

    const sendData = async () => {
        console.log("Sending Egg GRoups")
        const res = await axios.post('/api/admin/post/eggGroup/', data)
        console.log(res.data)
        console.log("End")
    }


    return(
        <div className={style.container}>  
            <button className={style.btn} onClick={() => {fillEggGroups()}}>Load Egg Groups</button>
            {
                eggGroups.length > 0? <button className={style.btn}onClick={()=>{fillData()}}>Load Extra Data</button>: <></>
            }
            {
                dataReady ? <button className={style.btn}onClick={()=>{sendData()}}>Send Egg Groups</button>: <></>
            }
        </div>
    )
}

export default AdminEggGroups