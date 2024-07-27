"use client"
import { ThemeContext } from "@/context/ThemeContext"
import { useContext, useEffect, useState } from "react"

const ThemeProvider = ({children}) => {

  const {theme} = useContext(ThemeContext)

  //to use in all browsers add the condition mounted for the component
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (mounted) {
    return (
      <div className={theme}>
        {children}
      </div>
    )
  }
}

export default ThemeProvider