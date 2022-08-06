import AdminTypes from "../../components/admin/adminTypes"
import AdminEggGroups from "../../components/admin/adminEggGroups"
import AdminAbilities from "../../components/admin/adminAbilities"
import AdminGens from "../../components/admin/adminGen"
import AdminVersions from "../../components/admin/adminVersions"
import AdminMoves from "../../components/admin/adminMoves"
import AdminPokemon from "../../components/admin/adminPokemon"
import AdminPokedexes from "../../components/admin/adminPokedex"

const adminPosts = () =>{

    return(
        <div>
            <AdminTypes/>
            <AdminEggGroups/>
            <AdminGens/>
            <AdminAbilities/>
            <AdminVersions/>
            <AdminMoves/>
            <AdminPokemon/>
            <AdminPokedexes/>
        </div>
    )
}


export default adminPosts