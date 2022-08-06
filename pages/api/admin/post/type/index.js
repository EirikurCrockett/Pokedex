import prisma from "../../../../../components/prisma"

const CreateType = async (req, res) => {
    // console.log(req.body)

    const type = await prisma.type.createMany({
        data: req.body,
        skipDuplicates: true,
    }) 
        .catch(err => console.log(err))

    res.json(type)
}


export default CreateType