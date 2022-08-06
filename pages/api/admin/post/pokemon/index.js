import prisma from "../../../../../components/prisma"

const CreatePokemon = async (req, res) => {

    const pokemon = await prisma.Pokemon.create({
        data: req.body
    }) 
        .catch(err => console.log(err))

    res.json(pokemon)
}


export default CreatePokemon