"use client"
import Link from "next/link"
import styles from "./authLinks.module.css"
import { useEffect, useState } from "react"
import { signOut, useSession } from "next-auth/react"
import AuthModal from "../authModal/AuthModal"
import { ThemeContext } from "@/context/ThemeContext"
import { useContext } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import confirmAlertStyles from '@/utils/confirmAlert.module.css'
import { useRouter } from "next/navigation"

const AuthLinks = ({open, setOpen}) => {

  const {status, data} = useSession()
  const router = useRouter()

  const {theme} = useContext(ThemeContext)
  const themeClass = theme === 'dark' ? confirmAlertStyles.darkConfirmAlert : confirmAlertStyles.lightConfirmAlert

  //auth modal window
  const [showModal, setShowModal] = useState(false)

  const openBurger = () => {
    setOpen(!open)

    if (!open) {
      document.body.style.overflowY = 'hidden'
      document.documentElement.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
      document.documentElement.style.overflowY = 'auto'
    } 
  }

  const closeBurger = () => { 
    // e.preventDefault() 
    setOpen(!open)
  }

  const logOut = (e) => {
    document.body.style.overflowY = 'hidden'
    document.documentElement.style.overflowY = 'hidden'
    e.preventDefault()

    confirmAlert({
      customUI: ({ onClose }) => (
        <div className={themeClass}>
          <p>Você tem certeza de que deseja sair?</p>
          <button 
            className="button"
            onClick={() => { 
              signOut() 
              // setIsLoading(true)
              document.body.style.overflowY = 'auto'
              document.documentElement.style.overflowY = 'auto'
              if (open) {
                closeBurger()
              }  
            }}
          >
            Sim
          </button>
          <button 
            className="button"
            onClick={() => { 
              onClose()
              document.body.style.overflowY = 'auto'
              document.documentElement.style.overflowY = 'auto'
            }}
          >
            Não
          </button>
        </div>
      ),
    })
  }

  const openModal = () => {
    setShowModal(true)
    ///to block the scroll of the page
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflowY = 'hidden'
  }

  ///to unblock the scroll of the page
  useEffect(() => {
    if (!showModal && !open) {
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflowY = 'auto'
    }
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
          {!open && 
          <span className={styles.name}>Olá, <span 
              title="Seu perfil"
              onClick={() => router.push("/usuario")}
              style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                {data?.user?.name.substring(0, 8)}
            </span>!
          </span>}
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
