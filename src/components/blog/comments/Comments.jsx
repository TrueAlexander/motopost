import styles from "./comments.module.css"
import Link from "next/link"

const getCommentsBypostId = async (postId) => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/get-comments-by-postId`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId }),
      cache: "no-store", // Ensures the data is not cached and is always fetched fresh
    })
    const data = await res.json()
    // console.log("data: ", data)
    return data
  } catch (error) {
    console.log(error)
  }
}


const Comments = async ({postId}) => {

  const data = await getCommentsBypostId(postId)

  if (!data) {
    return <p>Ainda não há comentários!</p> // You can show an error message if no data is returned
  }
  

  return (
    <div className={styles.container}>
      <div className={`${styles.comments} `}>
          {data.length === 0 ? (
            <p>Seja o primeiro a comentar!</p>
            ) : data.slice().reverse().map((item, index) => (
              <div className={styles.comment} key={index}>
                <div className={styles.user}>
                  <div className={styles.userInfo}>
                    <span className={styles.username}>{item.author}</span>
                    <span className={styles.date}>{(() => { const d = new Date(item.date); return d.toLocaleTimeString('ru-RU', { hour12: false }) + '\u00A0'.repeat(4) + d.toLocaleDateString('ru-RU'); })()}
                    </span>
                  </div>
                </div>
                <p className={styles.content}>{item.text}</p>
              </div>
            ))}
      </div>
    </div>
  )
}

export default Comments