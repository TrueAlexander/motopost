"use client"
import { useEffect, useState } from 'react'
import styles from './reactions.module.css'
import { FaRegHeart } from "react-icons/fa"
import { FaRegEye } from "react-icons/fa"

const Reactions =  ({id}) => {

  const [likes, setLikes] = useState()
  const [views, setViews] = useState()

  const getReactions = async (id) => {
    let reactions = {likes: 0, views: 0}
    try {
      const res = await fetch("/api/get-reactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
        cache: "no-store",
      })

      const data = await res.json()

      reactions = {likes: data.res.likes, views: data.res.views}
      
      
    } catch (error) {
      console.log(error)
    }
    return reactions
  }
 
  useEffect(() => {
    ///to call the function that fetch the actual likes and views from the backend
    const actualReactions = getReactions(id).then(data => {
      setLikes(data.likes)
      setViews(data.views)
    })
  }, [])

  return (
    <div className={styles.container}>
      <div title="curtidas" ><FaRegHeart /><span className={styles.count}>{likes}</span></div>      
      <div title="visualizações"><FaRegEye /><span className={styles.count}>{views}</span></div> 
    </div>
  )
}

export default Reactions