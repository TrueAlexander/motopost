import styles from './navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import AuthLinks from '../authLinks/AuthLinks'
import ThemeToggle from '../themeToggle/ThemeToggle'

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src="/motorbike.png" width={50} height={50} alt='moto-logo'></Image>
      </div>
      <div className={styles.title}>
        MotoPost
      </div>
      <div className={styles.links}>
        <ThemeToggle/>
        <Link href="/" className={styles.link}>Home</Link>
        <Link href="/" className={styles.link}>Contato</Link>
        <AuthLinks/>
      </div>
    </div>
  )}

export default Navbar
