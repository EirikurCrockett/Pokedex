import styles from '../styles/Home.module.css'
import { useState, useEffect } from "react"
import axios from 'axios'
import Link from 'next/link'


const Home = (props) => {

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.cardHead}>Purpose</h1>
        <div className={styles.cardBody}>
          <p>This application is intended to showcase my knowledge as a Full Stack Developer, being a recent graduate of Coding Dojo&apos;s 14 week Software Development bootcamp.</p>
        </div>
      </div>

      <div className={styles.card}>
        <h1 className={styles.cardHead}>Application</h1>
        <div className={styles.cardBody}>
          <p>This application is meant to be a comprehensive Pokemon database.</p>
        </div>
      </div>

      <div className={styles.card}>
        <h1 className={styles.cardHead}>Technologies</h1>
        <div className={styles.cardBody}>
          <ul>
            <li>Next.js for both frontend and backend design</li>
            <li>Prisma ORM for database management</li>
            <li>PostgreSQL database, deployed using AWS RDS</li>
            <li>Database will filled using information from 
              <Link href="https://pokeapi.co/">
                <a className={styles.link}> PokeAPI</a>
              </Link>
            </li>
            <li>Vercel for deployment</li>
          </ul>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardBody}>
            <h1 className={styles.cardHead}>Github</h1>
          <Link href="https://github.com/EirikurCrockett/Pokedex">
            <a className={styles.link}><p>Repo for this project</p></a>
          </Link>
          <Link href="https://github.com/EirikurCrockett">
            <a className={styles.link}><p>My Github page</p></a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home