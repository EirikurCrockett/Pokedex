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
          <Link href="https://github.com/EirikurCrockett/pokedex_app">
            <a className={styles.link}><h1 className={styles.cardHead}>Github</h1></a>
          </Link>
        <div className={styles.cardBody}>
            <p>Public Github repo for this application</p>
            <p>Coming Soon</p>
        </div>
      </div>
    </div>
  )
}

export default Home