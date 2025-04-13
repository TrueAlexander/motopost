"use client"
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import confirmAlertStyles from '@/utils/confirmAlert.module.css'
import styles from './register.module.css'
import { ThemeContext } from "@/context/ThemeContext"
import { useContext, useState } from 'react'
import Loading from '@/app/loading'

const Register = ({setShowModal, setModeLogin}) => {

  const [isLoading, setIsLoading] = useState(false)

  const {theme} = useContext(ThemeContext)
  const themeClass = theme === 'dark' ? confirmAlertStyles.darkConfirmAlert : confirmAlertStyles.lightConfirmAlert

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    setIsLoading(true)
    ///
    if (name.length < 3 || name.length > 21 ) {
      confirmAlert({
        customUI: ({ onClose }) => (
          <div className={themeClass}>
            <p>O nome de usuário deve conter de 3 a 20 caracteres</p>
            <button 
              className="button"
              onClick={() => { onClose(); setIsLoading(false) }}
            >
              Ok
            </button>
          </div>
        ),
      })
    } else {
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
            emailVerified: false,
            posts: [],
            comments: [],
            likes: []
          }),
        })
  
        if (res.status === 201) {
          setIsLoading(false)
          confirmAlert({
            customUI: ({ onClose }) => (
              <div className={themeClass}>
                <p>Prezado {name}, seu usuário foi criado! Para ativá-lo, por favor, confira seu e-mail: {email}!</p>
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
          confirmAlert({
            customUI: ({ onClose }) => (
              <div className={themeClass}>
                <p>Algo deu errado! Será que o usuário já existe? Faça login ou tente novamente.</p>
                <button 
                className="button"
                onClick={() => { onClose(); setModeLogin(true); }}>
                  Ok
                </button>
              </div>
            ),
          });
        }
      } catch (err) {
        console.log(err, "Ocorreu um erro do lado do servidor.");
      }

    }
  }

  if (!isLoading) {
 
    return (
      <div className={`${styles.register} ${"animate__animated"} ${"animate__fadeIn"}`}>
        <h3 className={styles.register_title}>Crie um novo usuário:</h3>
        <form 
          className="form" 
          onSubmit={handleSubmit}
        >
          <div>
            <input
              type="text" 
              name="name" 
              autoComplete="on"
              placeholder="nome" 
              required 
            />
          </div>
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
            title='Fazer cadastro'
          >
            Enviar
          </button>
        </form>
        <h3 className={styles.register_title}>ou identifique-se:</h3>
          <button 
            title="Criar Usuário" 
            className={styles.register_link}
            onClick={() => setModeLogin(true)}
          >
            fazer login
          </button>
      </div>
    )} else {
      return <Loading/>
    }
}


export default Register
