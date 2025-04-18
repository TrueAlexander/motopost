import styles from "./card.module.css"
import Image from "next/image"
import Link from "next/link"
import { formatDate } from "@/utils/dateFormat"
import Reactions from "../reactions/Reactions"
import Tags from "../tags/Tags"

const Card = ({item}) => {
  return (
    <div className={styles.container} key={item._id}>       
        <div className={item.img ? styles.textContainer : styles.textContainerText}>
          <div className={styles.column}>
            <div className={styles.detail}>
              <span className={styles.date}>{formatDate(item.createdAt)} - </span>
              <Link href={`/blog/?catSlug=${item.catSlug}`} className={styles.category}>{item.category}</Link>
            </div>
            <div className={styles.infoBox}>
              <p className={styles.author}>
                autor:{" "}
                {item.author.toLowerCase() === "deletado" ? (
                  <span className={styles.author_name}>{item.author}</span>
                ) : (
                  <Link href={`/blog/?author=${item.author}`} className={styles.author_name}>
                    {item.author}
                  </Link>
                )}
              </p>
              <Reactions id={item._id} />
            </div>
            <Link href={`/posts/${item.slug}?tmp=${Date.now().toString().slice(-2)}`} className={styles.post_link} >
              <div className={styles.box}>
                <h2 className={styles.title} title={item.title}>{item.title}</h2>
                <p 
                  className={styles.content} 
                  dangerouslySetInnerHTML={{ __html: item?.content }} 
                /> 

              </div>    
              <p 
                className={styles.link}
                title="Leia a postagem completa"
              >
                Leia mais
              </p>   
            </Link> 
            <Tags tags={item.tags ? item.tags : ""} />               
          </div>

          {item.img ? <div className={styles.column}>
            <Link href={`/posts/${item.slug}?tmp=${Date.now().toString().slice(-2)}`} >
              {item.img && <div className={styles.imageContainer} title={item.title}>
                <Image 
                  src={item.img} 
                  alt={item.title} 
                  fill 
                  className={styles.image} 
                  loading="lazy"/>
              </div>}
            </Link>
          </div> : <div className={styles.column_empty}></div>}    
        </div>       
    </div>
  )
}

export default Card
