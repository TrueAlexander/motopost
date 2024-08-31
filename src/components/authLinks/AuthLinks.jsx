"use client"
import Link from "next/link"
import styles from "./authLinks.module.css"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import AuthModal from "../authModal/AuthModal"

const AuthLinks = () => {

  // const {status} = useSession()
  const status = "unauthenticated"
  console.log(status)

  //burger open for small screens
  const [open, setOpen] = useState(false)
  //auth modal window
  const [showModal, setShowModal] = useState(false)

  const openBurger = () => {
    setOpen(!open)
    open ? document.body.style.overflowY = 'auto' : document.body.style.overflowY = 'hidden'
  }

  const closeBurger = () => {
    setOpen(!open)
    document.body.style.overflowY = 'auto'
  }

  const openModal = () => {
    setShowModal(true)
    ///to block the scroll of the page
    document.body.style.overflow = 'hidden'
  }
  ///to unblock the scroll of the page
  useEffect(() => {
    if (!showModal) document.body.style.overflow = 'auto'
  }, [showModal])

  return (
    <>
      {status === "unauthenticated" ? (
        <>
          <button className="auth_btn" onClick={openModal} >Entrar</button>
          {showModal && <AuthModal showModal={showModal} setShowModal={setShowModal}/>}
        </> 
      ) : (
        <>
          <Link href="/escrever" className={styles.link}>Novo Post</Link>
          <span className="auth_btn">Sair</span>
        </>
      )}
      <div className={styles.burger} onClick={openBurger}>
        <div 
          className={styles.line}
          style={open ? { display: "none" } : {}}
        ></div>
        <div 
          className={styles.line} 
          style={open ? { transform: "rotate(-45deg) translate(-6px, 4px)" } : {}}
        ></div>
        <div 
          className={styles.line}
          style={open ? { transform: "rotate(45deg) translate(-5px, -5px)" } : {}}
        ></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu} onClick={closeBurger}>
          <Link href="/" >Home</Link>
          <Link href="/contato">Contato</Link>
          {status === "unauthenticated" ? (
              <button className="auth_btn burger" onClick={openModal}>Entrar</button>
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
