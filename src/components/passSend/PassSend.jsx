import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import Loading from "@/app/loading"
import styles from "./passSend.module.css"
import { ThemeContext } from "@/context/ThemeContext"
import { useContext } from 'react'
import confirmAlertStyles from './../../utils/confirmAlert.module.css'
import { signOut } from 'next-auth/react'

const PassSend = () => {

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const {theme} = useContext(ThemeContext)
  const themeClass = theme === 'dark' ? confirmAlertStyles.darkConfirmAlert : confirmAlertStyles.lightConfirmAlert
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const pass1 = e.target[0].value
    const pass2 = e.target[1].value
    console.log(pass1, pass2)
    if (pass1 !== pass2) {
      confirmAlert({
        customUI: ({ onClose }) => (
          <div className={themeClass}>
            <p>As senhas precisam ser iguais. Vamos tentar novamente!</p>
            <button 
              className="button"
              onClick={() => { onClose(); e.target[0].value = "";  e.target[1].value = "";  }}
            >
              Ok
            </button>
          </div>
        )
      })
       
    } else {
      setIsLoading(true)
      //
      try {
        const res = await fetch("/api/auth/new-password", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            pass1,
          }),
        })

        if (res.status === 201) {
          confirmAlert({
            customUI: ({ onClose }) => (
              <div className={themeClass}>
                <p>Prezado Usuário, a senha foi alterada com sucesso! Por favor, faça o login com a nova senha!</p>
                <button 
                  className="button"
                  onClick={() => { onClose(); signOut(); }}
                >
                  Ok
                </button>
              </div>
            )
          })
          router.push("/");
        } else {
          confirmAlert({
            customUI: ({ onClose }) => (
              <div className={themeClass}>
                <p>Ocorreu um erro. Por favor, tente solicitar a recuperação de acesso novamente.</p>
                <button 
                  className="button"
                  onClick={() => { onClose(); router.push("/recover-access");  }}
                >
                  Ok
                </button>
              </div>
            )
          })  
        }       
      } catch (err) {   
        console.log(err, "Ocorreu um erro no lado do servidor!")
      }
    }
  }

  return (
    <>
      {!isLoading ?
          <div className={styles.container}>
            <h2>Prezado Usuário!</h2>
            <div className="animate__animated animate__fadeIn">
              <h3 className={styles.subtitle}>Crie uma nova senha para o seu perfil:</h3>
              <form 
                className={styles.form} 
                onSubmit={handleSubmit}
              >
                <div className={styles.input_container}>
                  <input
                    type="password" 
                    name="password"
                    minLength={5}
                    autoComplete="on" 
                    placeholder="senha nova" 
                    required 
                  />
                </div>
                <div className="my-9">
                  <input
                    type="password" 
                    name="password"
                    minLength={5}
                    autoComplete="on" 
                    placeholder="confirmar senha" 
                    required 
                  />
                </div>
                <button 
                  className={`button ${styles.btn}`}
                  type="submit"
                  title='Enviar'
                >
                  Enviar
                </button>
                <button
                onClick={() => router.push("/")}
                title="Voltar"
                className={`button ${styles.btn}`}
              >Voltar</button>
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

export default PassSend