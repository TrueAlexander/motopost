"use client"
import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './login.module.css'

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
