'use client'
import { useRouter, useSearchParams } from "next/navigation"
import '@/utils/react-confirm-alert.css'
import AskRecover from "@/components/user/askRecover/AskRecover"
import PassSend from "@/components/user/passSend/PassSend"
import { useEffect, useState } from "react"
import styles from "./recoverAccess.module.css"

const RecoverAccessPage = () => {

  const searchParams = useSearchParams()
  const mode = searchParams.get("mode")

  const [modeAsk, setModeAsk] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (mode === "pass") setModeAsk(false)
  }, [mode])
  
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {modeAsk ? <AskRecover setModeAsk={setModeAsk}/> : <PassSend setModeAsk={setModeAsk}/>}
      </div>
    </div>
  )
}

export default RecoverAccessPage