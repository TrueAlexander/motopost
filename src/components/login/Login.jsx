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

const Login = ({setShowModal, setModeLogin}) => {
  const session = useSession()
  const router = useRouter()
  const params = useSearchParams()
  const [error, setError] = useState(null)

  const {theme} = useContext(ThemeContext)
  const themeClass = theme === 'dark' ? confirmAlertStyles.darkConfirmAlert : confirmAlertStyles.lightConfirmAlert

  
const alertShown = useRef(false)  // useRef to keep track of alert status

const handleSubmit = async (e) => {
  e.preventDefault()
  const email = e.target[0].value
  const password = e.target[1].value

  try {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    }) 

    if (res?.error) {
      setError(res.error)  // Set the error state
    } else {
      // Handle successful login
      if (res?.status === 200) {
        
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
  
  return (
    <div 
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
      <Link href="/recover-access">
        <p
          title="Recuperar a senha" 
          className={styles.login_link}
        >
          esqueceu a senha?</p>
      </Link>
      <h3 className={styles.login_title}>ou crie um perfil:</h3>
        <button 
          title="Criar Usuário" 
          className={styles.login_link}
          onClick={() => setModeLogin(false)}
        >
          criar usuário
        </button>
    </div>
  )
}

export default Login



/*"use client"
import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

const Login = ({setShowModal, setModeLogin}) => {
  const session = useSession()
  const router = useRouter()
  const params = useSearchParams()
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    await signIn("credentials", {
        email,
        password,
      })       
  }
  useEffect(() => {
    setError(params.get("error"))
    if (session.status === 'authenticated') {
      router.push('/')
      setShowModal(false)    
    }
    
  }, [params, router, session.status, setShowModal])
  
  return (
    <div className="my-3 animate__animated animate__fadeIn">
      <h3 className="text-[#9f50ac] text-[17px] font-bold">Faça Login:</h3>
      <form 
        className="form" 
        onSubmit={handleSubmit}
      >
        <div className="mt-5">
          <input
            className='px-3 py-1 bg-transparent text-white rounded-md max-w-[600px] text-[16px] placeholder:text-white border border-white shadow-sm focus:outline-none focus:border-none focus:ring-[#9f50ac] focus:outline-[#9f50ac] focus:placeholder-transparent'
            type="email" 
            name="email" 
            autoComplete="on"
            placeholder="e-mail" 
            required 
          />
        </div>
        <div className="mt-7 mb-9">
          <input
            className='px-3 py-1 bg-transparent text-white rounded-md max-w-[600px] text-[16px] placeholder:text-white border border-white shadow-sm focus:outline-none focus:border-none focus:ring-[#9f50ac] focus:outline-[#9f50ac] focus:placeholder-transparent'
            type="password" 
            name="password"
            minLength={5}
            autoComplete="on" 
            placeholder="senha" 
            required 
          />
        </div>
        <button 
          className="bg-[#9f50ac] select-none font-bold h-[30px] min-w-[100px] rounded-[10px] text-white mr-2 ml-2 mb-3 active:scale-95" 
          type="submit"
          title='Entrar'
        >
          Enviar
        </button>
      </form>
      <p className='text-red-600 my-3 font-semibold'>{error && decodeURIComponent(error?.slice(6))}</p>
      <Link href="/recover-access">
        <p
          title="Recuperar a senha" 
          className="text-white text-[13px] underline cursor-pointer"
        >
          esqueceu a senha?</p>
      </Link>
      <h3 className="text-[#9f50ac] py-4 text-[17px] font-bold">ou crie um perfil:</h3>
        <button 
          title="Criar Usuário" 
          className="text-white text-[13px] underline cursor-pointer"
          onClick={() => setModeLogin(false)}
        >
          criar usuário
        </button>
    </div>
  )
}

export default Login*/