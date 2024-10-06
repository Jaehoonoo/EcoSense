'use client';

import axios from "axios";
import styles from '@/app/page.module.css';
import Head from 'next/head';
import Image from 'next/image';

const createUserData = async (userId) => {
  const response = await axios.post("/api/createData", {
    userId: userId
  })

}

export default function Home() {
  return (

    
    <div>

      <Head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet" />
      </Head>

      {/*Header Section*/}
      <header className={styles.header}>
        <nav className={styles.nav}>
        <div className={styles.logo}>
            <Image width={50} height={50} src="/logo.png" alt="EcoSense Logo" className={styles.logoImage} />
            <a href="#home" className={styles.logoText}>EcoSense</a>
          </div>
          <ul className={styles.navLink}>
            
            <li><a href="about">About</a></li>
            <li><a href="contact">Contact</a></li>
            
          </ul>
          <div className={styles.authButtons}>
            <a href="login" className={styles.loginButton}>Login</a>
            <a href="register" className={styles.registerButton}>Register</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Welcome to EcoSense</h1>
          <p>Discover the best cost-efficient solutions for your home today!</p>
          <a href="#cta" className={styles.ctaButton}>Get Started!</a>
        </div>
      </section>


      
      <button onClick={() => createUserData('jhoon')}>
        create profile
      </button>
    </div>
  );
}
