import prisma from "../../../../components/prisma"

const FindTypes = async (req, res) => {
    // console.log(req.body)

    const Types = await prisma.type.findMany({
        include: {
            pokemon: true
        }
    })
        .catch(err => console.log(err))

    res.json(Types)
}


export default FindTypes