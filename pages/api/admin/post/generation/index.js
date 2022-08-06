import prisma from "../../../../../components/prisma"

const CreateGen = async (req, res) => {
    // console.log(req.body)

    const game = await prisma.generation.createMany({
        data: req.body,
        skipDuplicates: true,
    }) 
        .catch(err => console.log(err))

    res.json(game)
}


export default CreateGen