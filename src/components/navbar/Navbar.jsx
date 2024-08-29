import styles from './navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import AuthLinks from '../authLinks/AuthLinks'
import ThemeToggle from '../themeToggle/ThemeToggle'

const Navbar = () => {
  return (
    <nav className={styles.container} id='navbar'>
      <div className={styles.logo}>
        <Link href="/">
          <Image className={styles.logo_img} src="/motorbike.png" width={45} height={50} alt='moto-logo'></Image>
        </Link>     
      </div>
      <h1 className={styles.title}>
        MotoPost
      </h1>   
      <div className={styles.links}>
        <ThemeToggle/>
        <Link href="/" className={styles.link}>Home</Link>
        <Link href="/" className={styles.link}>Contato</Link>
        <AuthLinks/>
      </div>
    </nav>
  )}

export default Navbar
