import style from '../styles/Navbar.module.css'
import {useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
    const [dropNav, setDropNav] = useState(false)
    const navDrop = (e) => {
        if(dropNav){
            setDropNav(false)
        } else{
            setDropNav(true)
        }
    }

    return(
        <div className={style.navContainer}>
            <nav className={style.navbar}>
                <div className={style.response}>
                    <h3>Pokédex</h3>
                    <button className={style.icon} onClick={() => navDrop()}>
                        <Image src="/images/menuIcon.svg" height={20} width={20}/>
                    </button>
                </div>
                {
                    !dropNav? 
                    <ul className={style.nav_list} id="nav_list">
                        {/* <li className={style.nav_item}>
                            <Link href="/search/generation"><a>Generation</a></Link>
                            
                        </li> */}
                        <li className={style.nav_item}>
                            <Link href="/search/type">
                                <a>
                                    Type
                                </a>
                            </Link>
                        </li>
                        <li className={style.nav_item}>
                            <Link href="/search/pokedex">
                                <a>
                                    Pokedex
                                </a>
                            </Link>
                        </li>
                        <li  className={style.nav_item}>
                            <Link href="/search/name">
                                <a>
                                    Name
                                </a>
                            </Link>
                        </li>
                    </ul> : 
                    <ul className={style.nav_list_responsive} id="nav_list">
                        {/* <li className={style.nav_item}>
                            Generation
                        </li> */}
                        <li className={style.nav_item}>
                            <Link href="/search/type">
                                <a>
                                    Type
                                </a>
                            </Link>
                        </li>
                        <li className={style.nav_item}>
                            <Link href="/search/pokedex">
                                <a>
                                    Pokedex
                                </a>
                            </Link>
                        </li>
                        <li  className={style.nav_item}>
                            <Link href="/search/name">
                                <a>
                                    Name
                                </a>
                            </Link>
                        </li>
                    </ul>
                }

            </nav>
        </div>
    )
}

export default Navbar