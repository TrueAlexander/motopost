"use client"
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import styles from './register.module.css'
import { ThemeContext } from "@/context/ThemeContext"
import { useContext } from 'react'
import confirmAlertStyles from './../../utils/confirmAlert.module.css'

const Register = ({setShowModal, setModeLogin}) => {

  const {theme} = useContext(ThemeContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    // setIsLoading(true)
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
          emailVerified: false,
          posts: [],
          comments: [],
          likes: []
        }),
      })

      //////
      const themeClass = theme === 'dark' ? confirmAlertStyles.darkConfirmAlert : confirmAlertStyles.lightConfirmAlert



      if (res.status === 201) {
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
      /////

      // const themeClass = theme === 'dark' ? confirmAlertStyles.darkConfirmAlert : confirmAlertStyles.lightConfirmAlert

      // if (res.status === 201) {
      //   confirmAlert(({
      //     customUI: ({ onClose }) => (
      //       <div className={themeClass}>
      //         <h1>Success</h1>
      //         <p>Prezado {name}, seu usuário foi criado! Para ativá-lo, por favor, confira seu e-mail: {email}!</p>
      //         <button onClick={() => { onClose(); setShowModal(false); }}>
      //           Ok
      //         </button>
      //       </div>
      //     ),
      //   })
      //////////////////////////
          
        //   {
        //   message: `Prezado ${name}, seu usuário foi criado! Para ativá-lo, por favor, confira seu e-mail: ${email}!`,
        //   buttons: [
        //     {
        //       label: 'Ok',
        //       onClick: () => {
        //         setShowModal(false)
        //         // setIsLoading(false)
        //       }
        //     }
        //   ]
        // }
        ///////////////////
      // )
      // } else {
      //   confirmAlert({
      //     customUI: ({ onClose }) => (
      //       <div className={themeClass}>
      //         <h1>Error</h1>
      //         <p>Algo deu errado! Será que o usuário já existe? Faça login ou tente novamente.</p>
      //         <button onClick={() => { onClose(); setModeLogin(true); }}>
      //           Ok
      //         </button>
      //       </div>
      //     ),
      //   }
        ////////////////
          
          
          
        //   {
        //   message: "Algo deu errado! Será que o usuário já existe? Faça login ou tente novamente.",
        //   buttons: [
        //     {
        //       label: 'Ok',
        //       onClick: () => {
        //         setModeLogin(true)
        //         // setIsLoading(false)
        //       }
        //     }
        //   ]
        // }
        /////////////
  //     )  
  //     }
      
      
  //   } catch (err) {   
  //     console.log(err, "Ocorreu um erro do lado do servidor.")
  //   }
  // }

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
  )
}

export default Register