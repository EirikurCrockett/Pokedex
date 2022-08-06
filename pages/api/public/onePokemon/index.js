import prisma from "../../../../components/prisma"

const FindOnePokemon = async (req, res) => {
    // console.log(req.body)

    const pokemon = await prisma.pokemon.findUnique({
        where: req.body,
        include: {
            eggGroups: true,
            types: true,
            abilities: true,
            encounters: true,
            pokedexes: true,
            pokedexEntries: true,
            moves: true,
        }
    })
        .catch(err => console.log(err))

    res.json(pokemon)
}


export default FindOnePokemon