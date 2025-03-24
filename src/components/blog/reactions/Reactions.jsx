"use client"
import { useEffect, useState } from 'react'
import styles from './reactions.module.css'
import { FaRegHeart, FaHeart } from "react-icons/fa"
import { FaRegEye } from "react-icons/fa"
import { useSession } from 'next-auth/react'
import { ThemeContext } from "@/context/ThemeContext"
import { useContext } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import confirmAlertStyles from '@/utils/confirmAlert.module.css'

const Reactions =  ({id}) => {

  const {data} = useSession()

  const [likes, setLikes] = useState()
  const [views, setViews] = useState()
  const [likedBy, setLikedBy] = useState([])
  const [alreadyLiked, setAlreadyLiked] = useState(false)

  const {theme} = useContext(ThemeContext)
  const themeClass = theme === 'dark' ? confirmAlertStyles.darkConfirmAlert : confirmAlertStyles.lightConfirmAlert

  const getReactions = async (id) => {
    let reactions = {likes: 0, views: 0}
    if (id) {
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
        reactions = {likes: data.res.likes, views: data.res.views, likedBy: data.res.likedBy}
        
        // Check if the current user already liked the post
        if (data?.res?.likedBy.includes(data?.user?.email)) {
          setAlreadyLiked(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
    return reactions
  }
 
  useEffect(() => {
    ///to call the function that fetch the actual likes and views from the backend
    getReactions(id).then(res => {
      setLikes(res.likes)
      setViews(res.views)
      setLikedBy(res.likedBy)
      if (res?.likedBy.includes(data?.user?.email)){
        setAlreadyLiked(true)
      }
    })
  }, [id, data?.user?.email])


  const handleLiked = async () => {
    if (!data) {
      confirmAlert({
        customUI: ({ onClose }) => (
          <div className={themeClass}>
            <p>É preciso fazer login para curtir a postagem.</p>
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
      //check if the email of the user is inside the likedBy
      if (likedBy.includes(data?.user?.email)) {
        confirmAlert({
          customUI: ({ onClose }) => (
            <div className={themeClass}>
              <p>Você já curtiu esta postagem!</p>
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
          try {
            const res = await fetch("/api/like-the-post", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id, email: data?.user?.email}),
              cache: "no-store",
            })
            const result = await res.json()
            console.log(result.res.message)
            setAlreadyLiked(true)
           
            // Fetch the updated reactions
            const updatedReactions = await getReactions(id)
            setLikes(updatedReactions.likes)   // Update the likes state
            setViews(updatedReactions.views)  // Update the views state
            setLikedBy(updatedReactions.likedBy)  // Update the likedBy state
            } catch (error) {
            console.log(error)
          }  
        }
    }  
  }

  return (
    <div className={styles.container}>
      <div 
        className={styles.likes} 
        title="curtidas" 
        onClick={handleLiked} 
      >{!alreadyLiked ? <FaRegHeart /> : <FaHeart />}
      <span className={styles.count}>{likes}</span></div>      
      <div title="visualizações"><FaRegEye /><span className={styles.count}>{views}</span></div> 
    </div>
  )
}

export default Reactions