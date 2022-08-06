import { useState } from "react"
import axios from "axios"
import style from '../../styles/admin/adminPosts.module.css'

const AdminPokemon = (props) => {
    const [allPokemon, setAllPokemon] = useState([]);
    const [data, setData] = useState([]);
    const [dataReady, setDataReady] = useState(false);
    
    const fillPokemon = async () => {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=898")
        setAllPokemon(res.data.results)
    }

    // const getTypes = (pokemon) => {

    //     if(pokemon.data.past_types.length == 0){
    //         return(
    //             pokemon.data.types.map(
    //                 item => (
    //                     {name: item.type.name}
    //                     )
    //                 )
    //             )
    //     } else {
    //         return(
    //             pokemon.data.past_types[0].types.map(
    //                 item => (
    //                     {name: item.type.name}
    //                 )
    //             )
    //         )
    //     }
    // }

    const getEntries = (unsortedEntries, pokemon) => {
        console.log(pokemon)
        const entries = []
        
        for(let entry of unsortedEntries){
            const filtered = entries.filter(item => item.entry == entry.flavor_text.replace(/(\n|\u000c)/g, " ").replace(/POK.MON/gi, "Pokémon").replace(new RegExp(pokemon, "gi"), pokemon))
            if(filtered.length != 0){
                entries[entries.indexOf(filtered[0])].games.connect.push({name: entry.version.name[0].toUpperCase() + entry.version.name.substring(1)})
            } else{
                entries.push({
                    entry: entry.flavor_text.replace(/(\n|\u000c)/g, " ").replace(/POK.MON/gi, "Pokémon").replace(new RegExp(pokemon, "gi"), pokemon),
                    games: {
                        connect: [
                            {name: entry.version.name[0].toUpperCase() + entry.version.name.substring(1)}
                        ]
                    }
                })
            }
        }
        return(entries)
        // species.data.flavor_text_entries.filter(
        //     entry => entry.language.name === "en" /**&& games.includes(
        //         entry.version.name
        //         ) */
        // ).map(
        //     item => (
        //         {
        //             game: 
        //                 {connect: 
        //                     {name: item.version.name}
        //                 },
        //             entry: item.flavor_text
        //         }
        //     )
        // )
    }
    

    const loadData = async () => {
        for(let item of allPokemon){
            const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${item.name}`)
            const species = await axios.get(pokemon.data.species.url)

            const pokemonName = species.data.name[0].toUpperCase() + species.data.name.substring(1)

            data.push({
                name: pokemonName,
                natDexNum: pokemon.data.id,
                genus: species.data.genera.filter(item => item.language.name == "en")[0].genus,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
                genderDifference: species.data.has_gender_differences,
                spriteDefault: pokemon.data.sprites.front_default,
                spriteShiny: pokemon.data.sprites.front_shiny,
                spriteDefaultF: pokemon.data.sprites.front_female,
                spriteShinyF: pokemon.data.sprites.front_shiny_female,
                eggGroups: {
                    connect: species.data.egg_groups.map(
                        item => (
                            {name: item.name[0].toUpperCase() + item.name.substring(1)}
                        )
                    ),
                },
                types: {
                    connect: pokemon.data.types.map(
                        item => (
                            {name: item.type.name[0].toUpperCase() + item.type.name.substring(1)}
                            )
                        )
                },
                abilities: {
                    create: pokemon.data.abilities/**.filter(
                        item => !item.is_hidden && abilities.includes(
                            item.name
                        )
                    ) */.map(
                        item => (
                            {
                                ability: {
                                    connect:{
                                        name: (item.ability.name[0].toUpperCase() + item.ability.name.substring(1)).replace(/(-)/g, " ")
                                    }
                                },
                                hidden: item.is_hidden                                
                            }
                        )
                    )
                },                   
                pokedexEntries: {
                    create: getEntries(species.data.flavor_text_entries.filter(item => item.language.name == "en" && item.version.name != "legends-arceus"), pokemonName)
                },
                moves: {
                    connect: pokemon.data.moves.map(
                        item => (
                            {name: (item.move.name[0].toUpperCase() + item.move.name.substring(1)).replace(/(-)/g, " ")}
                        )
                    )
                }
            })
            setData([...data])
        }
        setDataReady(true)
    }

    const sendData = async() => {
        for(let query of data){
            const res = await axios.post("/api/admin/post/pokemon", query)
            console.log(res)
        }
        // console.log(data[0])
        // const res = await axios.post("/api/admin/post/pokemon", data[0])
        // console.log(res)
    }

    return(
        <div className={style.container}>  
            <button className={style.btn} onClick={() => {fillPokemon()}}>Load Pokemon</button>
            {
                allPokemon.length > 0? <button className={style.btn}onClick={()=>{loadData()}}>Load Extra Data</button>: <></>
            }
            {
                dataReady ? <button className={style.btn}onClick={()=>{sendData()}}>Send Load</button>: <></>
            }
        </div>
    )
}

export default AdminPokemon