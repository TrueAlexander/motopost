import styles from "./singlePage.module.css"
import Image from "next/image"
import { formatDate } from "@/utils/dateFormat"
import CatTitle from "@/components/catTitle/CatTitle"
import Reactions from "@/components/reactions/Reactions"
// import Comments from "@/components/comments/Comments"

const getPostBySlug = async (slug) => {

  try {
    const res = await fetch(`${process.env.BASE_URL}/api/get-one-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug }),
      cache: "no-store",
    })
    const data = await res.json()
    return data.res
    
    } catch (error) {
    console.log(error)
  }  
}


const SinglePage = async ({params}) => {

  const {slug} = params

  const data = await getPostBySlug(slug)

  return (
    <div className={styles.container}>
      <CatTitle cat={data.category} catSlug={data.catSlug}/>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <div className={styles.user}>
            {/* {data?.user?.image && <div className={styles.userImageContainer} >
              <Image src={data.user.image} alt="image avatar" fill className={styles.avatar} />
            </div>} */}
            <div className={styles.userTextContainer}>
              <Reactions id={data._id} />
              <span className={styles.username}>{data?.author}</span>
              <span className={styles.date}>{formatDate(data.createdAt)}</span>
            </div>
          </div>
          <h2 className={styles.title}>{data?.title}</h2>
        </div>
        {data?.img && <div className={styles.imageContainer}>
          <Image src={data.img} alt={data.title} title={data.title} fill className={styles.image} />
        </div>}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          {/* <div
           className={styles.description} 
           dangerouslySetInnerHTML={{ __html: data?.desc }}
           /> */}
          <div 
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />
          {/* <div className={styles.comment}>
            <Comments postSlug={slug}/>
          </div>       */}
        </div>
      </div>
    </div>
  )
}

export default SinglePage

