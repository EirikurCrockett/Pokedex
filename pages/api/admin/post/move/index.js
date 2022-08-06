import prisma from "../../../../../components/prisma"

const CreateMove = async (req, res) => {
    // console.log(req.body)

    const move = await prisma.move.upsert({
        where:{
            name: req.body.name
        },
        create: req.body,
        update: req.body,
        include: {
            type: true,
        }
    })
        .catch(err => console.log(err))

    res.json(move)
}


export default CreateMove