"use client"
// import UpArrowIcon from "../../assets/up-arrow.png"
import { FaArrowCircleUp } from 'react-icons/fa'
import styles from "./upArrow.module.css"
import 'animate.css'
import { Link as LinkRoll } from 'react-scroll'
import { useState, useEffect } from "react"


const UpArrow = () => {
  const [y, setY] = useState(0)

  useEffect(() => {
    const handleScroll = (event) => {
      window.scrollY === 0 ? setY(0) : setY(1)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {y > 0 && <div 
        // className="upArrow animate__delay-10s animate__animated animate__pulse animate__slow animate__infinite"
        className={`${styles.upArrow} animate__delay-10s animate__animated animate__pulse animate__slow animate__infinite`}
        title="Voltar"
      >
        <LinkRoll
          className={styles.scrollLink} 
          to={"navbar"} 
          activeClass="active" 
          spy={true} 
          smooth={true} 
          offset={-100} 
          duration={500}
          title="Voltar"
        >
          <FaArrowCircleUp/>
        </LinkRoll>
      </div>}
    </>

  )
}

export default UpArrow