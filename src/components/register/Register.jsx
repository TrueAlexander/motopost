"use client"
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import styles from './register.module.css'

const Register = ({setShowModal, setModeLogin, setIsLoading}) => {

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    setIsLoading(true)
    ///
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          isAdmin: false,
          emailVerified: false
        }),
      })
      if (res.status === 201) {
        confirmAlert({
          message: `Prezado ${name}, seu usuário foi criado! Para ativá-lo, por favor, confira seu e-mail: ${email}!`,
          buttons: [
            {
              label: 'Ok',
              onClick: () => {
                setShowModal(false)
                setIsLoading(false)
              }
            }
          ]
        })
      } else {
        confirmAlert({
          message: "Algo deu errado! Será que o usuário já existe? Faça login ou tente novamente.",
          buttons: [
            {
              label: 'Ok',
              onClick: () => {
                setModeLogin(true)
                setIsLoading(false)
              }
            }
          ]
        })  
      }
      
      
    } catch (err) {   
      console.log(err, "Ocorreu um erro do lado do servidor.")
    }
  }

  return (
    <div className={`${styles.register} ${"animate__animated"} ${"animate__fadeIn"}`}>
      <h3 className={styles.register_title}>Crie um novo usuário:</h3>
      <form 
        className="form" 
        onSubmit={handleSubmit}
      >
        <div className="mt-5">
          <input
            className='px-3 py-1 bg-transparent text-white rounded-md max-w-[600px] text-[16px] placeholder:text-white border border-white shadow-sm focus:outline-none focus:border-none focus:ring-[#9f50ac] focus:outline-[#9f50ac] focus:placeholder-transparent'
            type="text" 
            name="name" 
            autoComplete="on"
            placeholder="nome" 
            required 
          />
        </div>
        <div className="my-7">
          <input
            className='px-3 py-1 bg-transparent text-white rounded-md max-w-[600px] text-[16px] placeholder:text-white border border-white shadow-sm focus:outline-none focus:border-none focus:ring-[#9f50ac] focus:outline-[#9f50ac] focus:placeholder-transparent'
            type="email" 
            name="email" 
            autoComplete="on"
            placeholder="e-mail" 
            required 
          />
        </div>
        <div className="mb-9">
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
          className="bg-[#9f50ac] select-none font-bold h-[30px] min-w-[100px] rounded-[10px] text-white mr-2 ml-2" 
          type="submit"
          title='Fazer cadastro'
        >
          Enviar
        </button>
      </form>
      <h3 className="text-[#9f50ac] py-4 mt-2 text-[17px] font-bold">ou identifique-se:</h3>
        <button 
          title="Criar Usuário" 
          className="text-white text-[13px] underline cursor-pointer active:scale-95"
          onClick={() => setModeLogin(true)}
        >
          fazer login
        </button>
    </div>
  )
}

export default Register
