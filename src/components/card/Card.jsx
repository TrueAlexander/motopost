import styles from "./card.module.css"
import Image from "next/image"
import Link from "next/link"

const Card = ({key, item}) => {
  return (
    <div className={styles.container} key={key}>
      {item.img && <div className={styles.imageContainer}>
         <Image src={item.img} alt={item.title} fill className={styles.image}/>
      </div>}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>{item.createdAt.substring(0, 10)} - </span>
          <Link href={`/${item.catSlug}`} className={styles.category}>{item.catSlug}</Link>
        </div>
        <Link href={`/${item.catSlug}/${item.slug}`}>
          <h2>{item.title}</h2>
        </Link>
        <p className={styles.desc}>{item.desc.substring(0, 260)}</p>
        <Link 
          href={`/${item.catSlug}/${item.slug}`} 
          className={styles.link}
          title="Leia a postagem completa"
        >
          Leia mais
        </Link>
      </div>
    </div>
  )
}

export default Card
