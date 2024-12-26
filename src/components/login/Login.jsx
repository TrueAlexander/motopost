"use client"
import { useState, useEffect, useRef } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './login.module.css'
import { ThemeContext } from "@/context/ThemeContext"
import { useContext } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import confirmAlertStyles from './../../utils/confirmAlert.module.css'
import Loading from '@/app/loading'

const Login = ({setShowModal, setModeLogin}) => {
  const session = useSession()
  const router = useRouter()
  const params = useSearchParams()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const {theme} = useContext(ThemeContext)
  const themeClass = theme === 'dark' ? confirmAlertStyles.darkConfirmAlert : confirmAlertStyles.lightConfirmAlert

  
const alertShown = useRef(false)  // useRef to keep track of alert status

const handleSubmit = async (e) => {
  e.preventDefault()
  setIsLoading(true)
  const email = e.target[0].value
  const password = e.target[1].value

  try {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    }) 

    if (res?.error) {
      setIsLoading(false)
      setError(res.error)  // Set the error state
    } else {
      // Handle successful login
      if (res?.status === 200) {
        setIsLoading(false)
        confirmAlert({
          customUI: ({ onClose }) => (
            <div className={themeClass}>
              <h3>Bem-vindo a Motopost!</h3>
              <button 
                className="button"
                onClick={() => { onClose(); setShowModal(false); }}
              >
                Ok
              </button>
            </div>
          ),
        });
      } else {
        setIsLoading(false)
      }
    }
       
  } catch (error) {
    console.log(error)
    
  }
      
}

useEffect(() => {
  setError(params.get("error"))
  
  // Guard clause to only show the alert once for the given session state
  if (session.status === 'authenticated' && !alertShown.current) {
    alertShown.current = true  // Mark the alert as shown
    
    router.push('/')
    setShowModal(false)
  } else if (session.status === 'unauthenticated' && !alertShown.current) {
    alertShown.current = true  // Mark the alert as shown
    setShowModal(true)
  }
  
}, [params, router, session.status, setShowModal])

const recoverAccess = () => {
  setShowModal(false)
  router.push("/recover-access")
}
  
  return (
    <>
      {isLoading 
        ? <Loading/> 
        : <div 
            className={`${styles.login} ${"animate__animated"} ${"animate__fadeIn"}`}
          >
            <h3 className={styles.login_title}>Faça Login:</h3>
            <form 
              className="form" 
              onSubmit={handleSubmit}
            >
              <div>
                <input
                  type="email" 
                  name="email" 
                  autoComplete="on"
                  placeholder="e-mail" 
                  required
                  onChange={() => setError(null)}
                />
              </div>
              <div>
                <input
                  className="input_last"
                  type="password" 
                  name="password"
                  minLength={5}
                  autoComplete="on" 
                  placeholder="senha" 
                  required
                  onChange={() => setError(null)}
                />
              </div>
              <button 
                className="button" 
                type="submit"
                title='Entrar'
              >
                Enviar
              </button>
            </form>
            <p className={styles.login_error}>{error && decodeURIComponent(error?.slice(6))}</p>
            <div onClick={recoverAccess}>
              <p
                title="Recuperar a senha" 
                className={styles.login_link}
              >
                esqueceu a senha?</p>
            </div>
            <h3 className={styles.login_title}>ou crie um perfil:</h3>
              <button 
                title="Criar Usuário" 
                className={styles.login_link}
                onClick={() => setModeLogin(false)}
              >
                criar usuário
              </button>
          </div>
        
        }
 
    </>

  )
}

export default Login

