'use client'
import "animate.css"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ThemeContext } from "@/context/ThemeContext"
import { useContext } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import confirmAlertStyles from './../../utils/confirmAlert.module.css'
import '@/utils/react-confirm-alert.css'



const InfoModal = ({info}) => {
  const router = useRouter()

  const {theme} = useContext(ThemeContext)
  const themeClass = theme === 'dark' ? confirmAlertStyles.darkConfirmAlert : confirmAlertStyles.lightConfirmAlert

  useEffect(() => {
    if (info) {
      confirmAlert({
        customUI: ({ onClose }) => (
          <div className={themeClass}>
            <h3>O e-mail foi verificado com sucesso! Faça por favor o login e bem-vindo ao Motopost!</h3>
            <button 
              className="button"
              onClick={() => { 
                onClose(); 
                router.push("/"); 
              }}
            >
              Ok
            </button>
          </div>
        ),
      });
    }
  }, [info, theme, router]);

    return null
  }


export default InfoModal