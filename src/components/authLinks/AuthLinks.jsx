"use client"
import Link from "next/link"
import styles from "./authLinks.module.css"
import { useEffect, useState } from "react"
import { signOut, useSession } from "next-auth/react"
import AuthModal from "../authModal/AuthModal"
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
// import Loading from "../loading/Loading"

const AuthLinks = () => {

  const {status} = useSession()

  //burger open for small screens
  const [open, setOpen] = useState(false)
  //auth modal window
  const [showModal, setShowModal] = useState(false)

  const openBurger = () => {
    setOpen(!open)
    open ? document.body.style.overflowY = 'auto' : document.body.style.overflowY = 'hidden'
  }

  const closeBurger = () => { 
    // e.preventDefault() 
    setOpen(!open)
    // signOut()
  }

  const logOut = (e) => {
    e.preventDefault()
    document.body.style.overflowY = 'hidden'

    confirmAlert({
      message: `Você tem certeza de que deseja sair?`,
      buttons: [
        {
          label: 'Sim',
          onClick: () => {
            signOut() 
            // setIsLoading(true)
            document.body.style.overflowY = 'auto'
            if (open) closeBurger()    
          }
        },
        {
          label: 'Não',
          onClick: () => {
            document.body.style.overflowY = 'auto'
          }
        }
      ]
    }) 
  }

  const openModal = () => {
    setShowModal(true)
    console.log("TUT")
    ///to block the scroll of the page
    document.body.style.overflow = 'hidden'
  }
  ///to unblock the scroll of the page
  useEffect(() => {
    if (!showModal && !open) document.body.style.overflow = 'auto'
  }, [showModal, open])

  if (status === "loading") {
    return (<> </>)
  }

  return (
    <>
      {status === "unauthenticated" ? (
        <>
          <button className="auth_btn" onClick={openModal} >Entrar</button>
          {showModal && <AuthModal showModal={showModal} setShowModal={setShowModal}/>}
        </> 
      ) : (
        <>
          <Link href="/criar" className={styles.link}>Novo Post</Link>
          <span className="auth_btn" onClick={logOut}>Sair</span>
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
              <span className="auth_btn burger" onClick={openModal}>Entrar</span>
            ) : (
              <>
                <Link href="/usuario">Seu perfil</Link>
                <Link href="/criar">Novo Post</Link>
                <span className="auth_btn burger" onClick={logOut}>Sair</span>
              </>
            )}
        </div>

      )}
    </>
)}

export default AuthLinks
