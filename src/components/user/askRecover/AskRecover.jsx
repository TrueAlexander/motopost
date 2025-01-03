import { useRouter } from "next/navigation"
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import { useState } from "react"
import Loading from "@/app/loading"
import styles from "./askRecover.module.css"
import { ThemeContext } from "@/context/ThemeContext"
import { useContext } from 'react'
import confirmAlertStyles from '@/utils/confirmAlert.module.css'

const AskRecover = () => {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {theme} = useContext(ThemeContext)
  const themeClass = theme === 'dark' ? confirmAlertStyles.darkConfirmAlert : confirmAlertStyles.lightConfirmAlert
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const email = e.target[0].value
    
    try {
      const res = await fetch("/api/auth/recover-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      })
      if (res.status === 201) {
        
        e.target[0].value = ""
        confirmAlert({
          customUI: ({ onClose }) => (
            <div className={themeClass}>
              <p>Para recuperar o acesso ou alterar a senha, por favor, verifique o seu e-mail: {email}</p>
              <button 
                className="button"
                onClick={() => { onClose(); setIsLoading(false);  router.push("/");  }}
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
              <p>Não foi possível encontrar um usuário com este e-mail. Por favor, tente novamente ou crie um perfil na plataforma.</p>
              <button 
                className="button"
                onClick={() => { onClose(); setIsLoading(false);  router.push("/recover-access");  }}
              >
                Ok
              </button>
            </div>
          )
        })
         
      }  
    } catch (err) {   
      console.log(err, "Erro do lado de servidor!")
      confirmAlert({
          message: "Lamentavelmente, não houve resposta do servidor. Por favor, tente novamente mais tarde.",
          buttons: [
            {
              label: 'Ok',
              onClick: () => {
                setIsLoading(false)
                router.push("/")
              }
            }
          ]
        }) 
    }
  }

  return (
    <>{!isLoading ? 
      <div className={styles.container}>
        <h2>Prezado Usuário!</h2>
        <div className="animate__animated animate__fadeIn">
          <h3 className={styles.subtitle}>Para recuperar o acesso à plataforma ou alterar a senha do seu perfil, por favor, informe o seu e-mail:</h3>
          <form 
            className="form" 
            onSubmit={handleSubmit}
          >
            <div className={styles.input_container}>
              <input
                type="email" 
                name="email" 
                autoComplete="on"
                placeholder="e-mail" 
                required 
              />
            </div>
            <button 
              className="button" 
              type="submit"
              title='Enviar'
            >
              Enviar
            </button>
            <button
              onClick={() => router.push("/")}
              title="Voltar"
              className={`button ${styles.btn}`}
            >  
            Voltar</button>
          </form>
        </div>
      </div> : 
      <>
        <Loading/>
      </>
    }
    </>
  )
}

export default AskRecover