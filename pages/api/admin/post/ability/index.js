import prisma from "../../../../../components/prisma"

const CreateAbility = async (req, res) => {
    // console.log(req.body)

    const ability = await prisma.ability.create({
        data: req.body
    }) 
        .catch(err => console.log(err))

    res.json(ability)
}


export default CreateAbility