'use client'
import Login from "../login/Login"
import Register from "../register/Register"
import { IoClose } from "react-icons/io5"
import "animate.css"
import { useState } from "react"
import { useRouter } from "next/navigation"
import styles from "./inputModal.module.css"



const InputModal = ({addEl, showModal, setShowModal}) => {
  const router = useRouter()
  const [modeLogin, setModeLogin] = useState(true)

  const handleClose = () => {
    setShowModal(false)
    // router.push('/')
  }

  return (
    <div 
      className={showModal ? styles.modal_open : styles.modal_closed} 
      onClick={ handleClose }
    >
      <div 
        className={`${styles.modal_content} ${"animate__animated"} ${"animate__fadeIn"}` }
        onClick={e => e.stopPropagation()}
      >
        <h2 
          className={styles.modal_title}
        >
          Prezado Usuário!</h2>
        <button
          onClick={ handleClose }
          className={styles.modal_button}
        >  
          <IoClose/></button>
        <div className="">   
          {modeLogin 
          ? <Login setShowModal={setShowModal} setModeLogin={setModeLogin}/> 
          : 
          <Register setShowModal={setShowModal} setModeLogin={setModeLogin} />
          }
        </div>
      </div>
    </div>
  )
}

export default InputModal