import prisma from "../../../../../components/prisma"

const CreateVersion = async (req, res) => {
    // console.log(req.body)

    const versionGroup = await prisma.versionGroup.create({
        data: req.body,
    })
        .catch(err => console.log(err))

    res.json(versionGroup)
}


export default CreateVersion