import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from '../../../styles/SearchType.module.css'


const searchType = () => {
    const [allTypes, setAllTypes] = useState([])
    const [pokemon, setPokemon] = useState([])

    useEffect(() => {
        const getTypes = async () => {
            const res = await axios.get("/api/public/allTypes")
            // res.data.map((dex)=>{
            // })
            console.log(res.data)
            setAllTypes(res.data)
        }
        getTypes()
    }, [])

    const typeChanger = (pokemon) => {
        setPokemon(pokemon)
    }

    return(
        <div>
            <ul className={styles.typeList}>
                {
                    allTypes.map(
                        (item, i) => 
                            <li key={i}>
                                <button onClick = {() => {
                                    typeChanger(item.pokemon)
                                }}>
                                    {item.name}
                                </button>
                            </li>
                        
                    )
                }
            </ul>
        </div>
    )
}

export default searchType
