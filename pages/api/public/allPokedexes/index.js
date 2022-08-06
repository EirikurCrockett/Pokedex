import prisma from "../../../../components/prisma"

const FindPokedexes = async (req, res) => {
    // console.log(req.body)

    const Pokedexes = await prisma.pokedex.findMany({
        include: {
            pokemon: true,
            generations: true
        }
    })
        .catch(err => console.log(err))

    res.json(Pokedexes)
}


export default FindPokedexes