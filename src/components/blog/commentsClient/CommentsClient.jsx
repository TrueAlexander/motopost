"use client"
import styles from "./commentsClient.module.css"

const CommentsClient = ({comments}) => {

  if (!comments) {
    return <p>Ainda não há comentários!</p> // You can show an error message if no data is returned
  }
  
  return (
    <div className={styles.container}>
      <div className={`${styles.comments} `}>
          {comments.length === 0 ? (
            <p>Seja o primeiro a comentar!</p>
            ) : comments.slice().reverse().map((item, index) => (
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

export default CommentsClient