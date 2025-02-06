import styles from "./singlePage.module.css"
import Image from "next/image"
import { formatDate } from "@/utils/dateFormat"
import CatTitle from "@/components/blog/catTitle/CatTitle"
import Reactions from "@/components/blog/reactions/Reactions"
// import Comments from "@/components/comments/Comments"
import ManagePostButtons from "@/components/blog/managePostButtons/ManagePostButtons"

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

const SinglePostPage = async ({params}) => {

  const {slug} = params

  const data = await getPostBySlug(slug)

  return (
    <div className={styles.container}>
      <CatTitle cat={data.category} catSlug={data.catSlug}/>  
      <div className={styles.detailsContainer}>
        <Reactions id={data._id} />
        <span className={styles.username}>{data?.author}</span>
        <span className={styles.date}>{formatDate(data.createdAt)}</span>
      </div>
      <h2 className={styles.title}>{data?.title}</h2>
      <div className={styles.infoContainer}>
        {data?.img && <div className={styles.imageContainer}>
          <Image src={data.img} alt={data.title} title={data.title} fill className={styles.image} />
        </div>}
        <div className={styles.contentContainer}>
          <div 
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: data?.content }}
          />
          <ManagePostButtons author={data?.author} slug={data?.slug}/>
          {/* <div className={styles.comment}>
            <Comments postSlug={slug}/>
          </div>       */}
        </div>
      </div>

    </div>
  )
}

export default SinglePostPage

