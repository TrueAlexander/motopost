"use client"
import styles from "./usuarioPage.module.css"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ThemeContext } from "@/context/ThemeContext"
import { useContext } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import confirmAlertStyles from '@/utils/confirmAlert.module.css'
import Loading from "../loading"


const UsuarioPage = () => {

  const {status, data} = useSession()
  const userName = data?.user.name
  const router = useRouter()

  const {theme} = useContext(ThemeContext)
  const themeClass = theme === 'dark' ? confirmAlertStyles.darkConfirmAlert : confirmAlertStyles.lightConfirmAlert

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Redirect to home page if the user is unauthenticated
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status, router]) // Run when status or router changes


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

    const userDelete = () => {
      document.body.style.overflowY = 'hidden'
      document.documentElement.style.overflowY = 'hidden'
      confirmAlert({
        customUI: ({ onClose }) => (
          <div className={themeClass}>
            <h2 style={{color: "crimson"}}>Atenção!</h2>
            <h3 style={{ marginTop: '15px', marginBottom: '15px' }}><span style={{color: "crimson"}}>{userName}</span>, tem certeza de que deseja deletar seu perfil?</h3>
            <p>Não será possível restaurar seus dados depois de deletar!</p>
            <button 
              className="button"
              onClick={ async () => { 
                setIsLoading(true)
                onClose()
                document.body.style.overflowY = 'auto'
                document.documentElement.style.overflowY = 'auto' 
                await deletarDB() 

              }}
            >
              Confirmo
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

    const deletarDB = async () => {
      setIsLoading(true)
      const email = data?.user.email

      try {
        const res = await fetch("/api/auth/delete-user", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email
          }),
        })

        console.log("status: ", res.status)

        if (res.status === 200) {
          setIsLoading(false)
          console.log("res200")
          confirmAlert({
            customUI: ({ onClose }) => (
              <div className={themeClass}>
                <p>{`O usuário com o e-mail: ${email} foi deletado com sucesso!`}</p>
                <button 
                  className="button"
                  onClick={() => { onClose(); signOut(); router.push("/");  }}
                >
                  Ok
                </button>
              </div>
            )
          })
        } else {
          confirmAlert({
            customUI: ({ onClose }) => (
              <div className={themeClass}>
                <p>Ocorreu um erro. Provavelmente, o usuário já foi deletado.</p>
                <button 
                  className="button"
                  onClick={() => { onClose(); router.push("/");  }}
                >
                  Ok
                </button>
              </div>
            )
          })  
        }       

        
      } catch (error) {
        console.log(error, "Ocorreu um erro no lado do servidor!")
      }




      setIsLoading(false)
    }

    // const changePassword = async () => {

    // }
  
  if (isLoading) {
    return <Loading/>
  }

  return (  
    <>
      {status === "authenticated" && (
          <div className={styles.container}>
            <h3>Perfil do usuário: <span className={styles.name}>{userName}</span></h3>
            <button 
              title="suas postagens" 
              className="button"
              disabled
            >
              Postagens</button>
            <button 
              className="button"
              // onClick={changePassword}
              onClick={() => router.push("/recover-access")}

            >
              Alterar Senha</button>
            <button 
              className="button"
              onClick={logOut}
            >
              Sair</button>
            <button 
              className={`button ${styles.btn_delete}`}
              onClick={userDelete}
            >
              Deletar Perfil</button>
          </div>
      )}     
    </>
  )
}

export default  UsuarioPage