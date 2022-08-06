import { useState } from "react"
import axios from "axios"
import style from '../../styles/admin/adminPosts.module.css'

const AdminTypes = (props) => {
    const [types, setTypes] = useState([]);
    const [data, setData] = useState([]);
    const [dataReady, setDataReady] = useState(false);
    
    const fillTypes = async () => {
        // const res = await axios.get("https://pokeapi.co/api/v2/type/?offset=0&limit=17")
        const res = await axios.get("https://pokeapi.co/api/v2/type/?offset=0&limit=18")
        setTypes(res.data.results)

    }
        
    const fillData = () => {
        for(let item of types){
            data.push({name: item.name[0].toUpperCase() + item.name.substring(1)})
            setData([...data])
        }

        setDataReady(true)
    }

    const sendTypes = async () => {
        console.log("Sending Types")
        const res = await axios.post('/api/admin/post/type/', data)
        console.log(res.data)
        console.log("End")
    }


    return(
        <div className={style.container}>  
            <button className={style.btn} onClick={() => {fillTypes()}}>Load Types</button>
            {
                types.length > 0? <button className={style.btn}onClick={()=>{fillData()}}>Load Extra Data</button>: <></>
            }
            {
                dataReady ? <button className={style.btn}onClick={()=>{sendTypes()}}>Send Load</button>: <></>
            }
        </div>
    )
}

export default AdminTypes