"use client"
import { useState } from "react"
import styles from "./writeComment.module.css"
import { ThemeContext } from "@/context/ThemeContext"
import { useContext } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import confirmAlertStyles from '@/utils/confirmAlert.module.css'

export default function WriteComment({ handleSubmit, author, authorEmail }) {

  const {theme} = useContext(ThemeContext)
  const themeClass = theme === 'dark' ? confirmAlertStyles.darkConfirmAlert : confirmAlertStyles.lightConfirmAlert

  const [text, setText] = useState("")
  const maxLength = 250

  const handleNewComment = async (e) => {
    e.preventDefault()
    if (!text.trim()) return

    if(text.length < 3 || text.length > maxLength) {
      confirmAlert({
        customUI: ({ onClose }) => (
          <div className={themeClass}>
            <p>Seu comentário deve conter entre 3 e 250 caracteres!</p>
            <button 
              className="button"
              onClick={() => { onClose(); }}
            >
              Ok
            </button>
          </div>
        ),
      })
    } else {
      await handleSubmit({ author: author, text: text.charAt(0).toUpperCase() + text.slice(1), authorEmail })
      setText()
    }
  }

  return (
    <form className={styles.write} onSubmit={handleNewComment}>
      <div className={styles.inputBox}>
        <textarea
          value={text}
          className={styles.input}
          onChange={(e) => setText(e.target.value)}
          placeholder="escreve seu comentário..."
        />
        <div
          className={`${styles.counter} ${text?.length >= maxLength ? styles.limitReached : ''}`}
        >
          {text?.length} / {maxLength}
        </div>
      </div>
      <button 
        className="button" 
        type="submit"
        disabled={!text ? true : false}
      >
        Publicar
      </button>
     
    </form>
  )
}