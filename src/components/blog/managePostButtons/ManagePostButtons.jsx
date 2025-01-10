'use client'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import styles from './managePostButtons.module.css'
import { useState } from "react"
import Loading from "@/app/loading"
import { ThemeContext } from "@/context/ThemeContext"
import { useContext } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import confirmAlertStyles from '@/utils/confirmAlert.module.css'

const ManagePostButtons = ({author, slug}) => {

    const {data} = useSession()
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const {theme} = useContext(ThemeContext)
    const themeClass = theme === 'dark' ? confirmAlertStyles.darkConfirmAlert : confirmAlertStyles.lightConfirmAlert

    const postDelete = () => {
      document.body.style.overflowY = 'hidden'
      document.documentElement.style.overflowY = 'hidden'

      confirmAlert({
        customUI: ({ onClose }) => (
          <div className={themeClass}>
            <h2 style={{color: "crimson"}}>Atenção!</h2>
            <h3 style={{ marginTop: '15px', marginBottom: '15px' }}>Você tem certeza de que deseja deletar a postagem?</h3>
            <p>Não será possível restaurar seus dados depois de deletar!</p>
            <button 
              className="button"
              onClick={ async () => { 
                setIsLoading(true)
                onClose()
                document.body.style.overflowY = 'auto'
                document.documentElement.style.overflowY = 'auto' 
                await deletarPost() 
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
    
    const deletarPost = async () => {

      setIsLoading(true)
      ///////
      try {
        const res = await fetch("/api/delete-post", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({slug}),
      })
      if (res.ok) {
          confirmAlert({
            customUI: ({ onClose }) => (
              <div className={themeClass}>
                <p>A postagem foi deletada com sucesso!</p>
                <button 
                  className="button"
                  onClick={() => { onClose();  router.push("/"); router.refresh(); }}
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
                <p>Algo deu errado! Por favor, tente fazer mais tarde!</p>
                <button 
                  className="button"
                  onClick={() => { onClose(); }}
                >
                  Ok
                </button>
              </div>
            )
          })
        }
      } catch (err) {
        console.log(err);
        confirmAlert({
          customUI: ({ onClose }) => (
            <div className={themeClass}>
              <p>Algo deu errado! Por favor, tente fazer mais tarde!</p>
              <button 
                className="button"
                onClick={() => { onClose(); }}
              >
                Ok
              </button>
            </div>
          )
        })
      } 
      setIsLoading(false)
    }

    //access to manage the post only for its author or Admin
  if (author === data?.user?.name || data?.user?.isAdmin === true) {
    return (
      <>
         {!isLoading ? (<div className={styles.buttonContainer}>
            <button 
              className="button" 
              // onClick={() => router.push(`/${postId}/edit`)}
            >
                Editar
            </button>
            <button 
              className="button"
              onClick={postDelete}
            >
              Deletar
            </button>
          </div>) : <Loading/>}
      </>
    )
  }  
}

export default ManagePostButtons