import { version } from "react-dom"
import prisma from "../../../../../components/prisma"

const CreatePokedex = async (req, res) => {
    // console.log(req.body)

    const pokedex = await prisma.pokedex.create({
        data: req.body,
        include: {
            generations: true
        }
    })
        .catch(err => console.log(err))

    res.json(pokedex)
}


export default CreatePokedex