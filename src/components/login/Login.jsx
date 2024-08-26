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

export default Login
