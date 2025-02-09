"use client"
import '@/utils/react-confirm-alert.css'
import confirmAlertStyles from '@/utils/confirmAlert.module.css'
import { confirmAlert } from 'react-confirm-alert'
import { ThemeContext } from "@/context/ThemeContext"
import { useContext } from 'react'

const CustomAlert = ({content, response1, function1, response2, function2}) => {

  const {theme} = useContext(ThemeContext)
  const themeClass = theme === 'dark' ? confirmAlertStyles.darkConfirmAlert : confirmAlertStyles.lightConfirmAlert

  confirmAlert({
    customUI: ({ onClose }) => (
      <div className={themeClass}>
        <div>{content}</div>
        <button 
          className="button"
          onClick={() => { 
            onClose()
            function1()
          }}
        >
          {response1}
        </button>
        <button 
          className="button"
          onClick={() => { 
            onClose()
            function2()
          }}
        >
          {response2}
        </button>
      </div>
    ),
  })
}

export default CustomAlert