import prisma from "../../../../components/prisma"

const FindAllVersionGroups = async (req, res) => {
    // console.log(req.body)

    const versionGroups = await prisma.versionGroup.findMany({
        include: {
            generation: true
        }
    })
        .catch(err => console.log(err))

    res.json(versionGroups)
}


export default FindAllVersionGroups