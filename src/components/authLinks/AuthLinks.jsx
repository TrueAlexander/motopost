"use client"
import Link from "next/link"
import styles from "./authLinks.module.css"
import { useState } from "react"
import { useSession } from "next-auth/react"

const AuthLinks = () => {

  const [open, setOpen] = useState(false)

  const {status} = useSession()

  const openBurger = () => {
    setOpen(!open)
    document.body.style.overflowY = 'hidden'
  }

  const closeBurger = () => {
    setOpen(!open)
    document.body.style.overflowY = 'auto'
  }
    
  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/" className={styles.link} >Login</Link>
      ) : (
        <>
          <Link href="/write" className={styles.link} >Write</Link>
          <span className={styles.link}>Logout</span>
        </>
      )}
      <div className={styles.burger} onClick={openBurger}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu} onClick={closeBurger}>
          <Link href="/" >Home</Link>
          <Link href="/contato">Contato</Link>
          {status === "notauthenticated" ? (
              <Link href="/login">Login</Link>
            ) : (
              <>
                <Link href="/usuario">Seu perfil</Link>
                <Link href="/criar-post">Novo Post</Link>
                <Link href="/" onClick={closeBurger}>Sair</Link>
              </>
            )}
        </div>

      )}
    </>
)}

export default AuthLinks
