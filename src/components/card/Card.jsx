import styles from "./card.module.css"
import Image from "next/image"
import Link from "next/link"
import { formatDate } from "@/utils/dateFormat"
import Reactions from "../reactions/Reactions"

const Card = ({item}) => {
  return (
    <div className={styles.container} key={item._id}>
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>{formatDate(item.createdAt)} - </span>
          <Link href={`/blog/?catSlug=${item.catSlug}`} className={styles.category}>{item.catSlug}</Link>
        </div>
        <div className={styles.infoBox}>
          <p className={styles.author}>autor: <span className={styles.author_name}>{item.author}</span></p>
          <Reactions id={item._id} />
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h2>{item.title}</h2>
        </Link>
        <p className={styles.desc}>{item.desc}</p>
        <Link 
          href={`/posts/${item.slug}`} 
          className={styles.link}
          title="Leia a postagem completa"
        >
          Leia mais
        </Link>
      </div>
      {item.img && <div className={styles.imageContainer} title={item.title}>
         <Image src={item.img} alt={item.title} fill className={styles.image}/>
      </div>}

    </div>
  )
}

export default Card
