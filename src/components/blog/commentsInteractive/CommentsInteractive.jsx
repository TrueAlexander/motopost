"use client"
import { useSession } from "next-auth/react"
import styles from "./commentsInteractive.module.css"
import Link from "next/link"
import { useState, useEffect } from "react"
import CommentsClient from "../commentsClient/CommentsClient"
import WriteComment from "../writeComment.jsx/WriteComment"
import Loading from "@/app/loading"

const CommentsInteractive = ({postId}) => {

  const {status} = useSession()
  const session = useSession()
  const [comments, setComments] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (comments) {
      // Hide the static server-rendered comments
      const staticEl = document.getElementsByClassName("static-comments")[0]
      if (staticEl) staticEl.style.display = "none"
    }
  }, [comments])

  const handleSubmit = async (commentData) => {

    setIsLoading(true)
    try {
      const res = await fetch("/api/create-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...commentData, postId }),
      })
      
      if(res.status === 201) {
        
        const data = await fetch("/api/get-comments-by-postId",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postId }),
          }
        )
        if(data) {
          const updatedComments = await data.json()
          setComments(updatedComments)
        }
        
      }
      setIsLoading(false)
      
    } catch (error) {
      console.log("Something went wrong: ", error)
    } 
  }

  if(isLoading) {
    return <Loading/>
  }

  return (
    <>
      {status === "authenticated" ? (
        ////
         <WriteComment handleSubmit={handleSubmit} author={session.data?.user?.name} authorEmail={session.data?.user?.email}/>
        /////
      ) : (
        <Link href=""><p className={styles.notice}>Acesse sua conta para deixar um comentário</p></Link>
      )}
      {comments && <CommentsClient comments={comments}/>}
    </>
 
  )
}

export default CommentsInteractive
