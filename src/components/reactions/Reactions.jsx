"use client"
import styles from './reactions.module.css'
import { FaRegHeart } from "react-icons/fa"
import { FaRegEye } from "react-icons/fa"

const Reactions = () => {

  return (
    <div className={styles.container}>
      <div title="curtidas" ><FaRegHeart /><span className={styles.count}> 5</span></div>
      
      <div title="visualizações"><FaRegEye /><span className={styles.count}> 5</span></div>
      
    </div>
  )
}

export default Reactions