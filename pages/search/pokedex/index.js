import axios from 'axios'
import { useEffect, useState } from 'react'

const searchPokedex = () => {
    const [generations, setGenerations] = useState([])

    useEffect(() => {
        const getDexes = async () => {
            const res = await axios.get("/api/public/allPokedexes")
            // res.data.map((dex)=>{
            // })
            console.log(res.data)
        }
        getDexes()
    }, [])

    return(
        <div>Pokedexes</div>
    )
}

export default searchPokedex
