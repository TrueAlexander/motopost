"use client"
import styles from './navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import AuthLinks from '../../user/authLinks/AuthLinks'
import ThemeToggle from '../themeToggle/ThemeToggle'
import { useState } from 'react'

const Navbar = () => {

   //burger open for small screens
   const [open, setOpen] = useState(false)

   const [tmp, setTmp] = useState(Date.now().toString().slice(-2))


   const handleClick = () => setTmp(Date.now().toString().slice(-2))

  return (
    <nav className={styles.container} id='navbar'>
      <div className={styles.logo}>
        <Link href={`/?tmp=${tmp}`} onClick={handleClick}>
          <Image className={styles.logo_img} src="/motorbike.png" width={50} height={50} alt='moto-logo'></Image>
        </Link>     
      </div>
      <h1 className={styles.title}>
        MotoPost
      </h1>   
      <div className={styles.links}>
        {!open && <ThemeToggle/>}
        <Link href={`/?tmp=${tmp}`} onClick={handleClick} className={styles.link}>Home</Link>
        <Link href="/" className={styles.link}>Contato</Link>
        <AuthLinks open={open} setOpen={setOpen}/>
      </div>
    </nav>
  )}

export default Navbar