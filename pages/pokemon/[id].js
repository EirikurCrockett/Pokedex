import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"

const OnePokemon = () => {
    const router = useRouter()
    const {id} = router.query

    useEffect(() => {
        axios.get("/api/public/onePokemon/", {id: id})
    }, [])
}

export default OnePokemon