import styles from '@/app/page.module.css';

export default function Home() {
  return (
    <div>
      {/*Header Section*/}
      <header className={styles.header}>
        <nav className={styles.nav}>
        <div className={styles.logo}>
            <img src="/logo.png" alt="EcoSense Logo" className={styles.logoImage} />
            <a href="#" className={styles.logoText}>EcoSense</a>
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
          <p>Discover the best cost-efficient solutions for your home</p>
          <a href="#cta" className={styles.ctaButton}>Get Started!</a>
        </div>
      </section>


      
    </div>
  );
}
