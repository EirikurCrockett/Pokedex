import prisma from "../../../../../components/prisma"

const CreateEggGroup = async (req, res) => {
    // console.log(req.body)

    const eggGroup = await prisma.eggGroup.createMany({
        data: req.body,
        skipDuplicates: true,
    }) 
        .catch(err => res.json(err))

    res.json(eggGroup)
}


export default CreateEggGroup