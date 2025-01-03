"use client"
import SpinnerSrc from  "@/assets/spinner.gif"
import Image from "next/image"
import styles from "./spinner.module.css"

const Spinner = () => {
  return (
    <div className={styles.spinner}> 
      <Image 
        width={100}
        height={100}
        src={SpinnerSrc}
        alt="carregando..."
      /> 
    </div>
)}

export default Spinner