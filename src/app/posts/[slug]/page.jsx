import styles from "./singlePage.module.css"
import Image from "next/image"
import { formatDate } from "@/utils/dateFormat"
import CatTitle from "@/components/blog/filterTitle/FilterTitle"
import Reactions from "@/components/blog/reactions/Reactions"
import Link from "next/link"
import Tags from "@/components/blog/tags/Tags"
import ManagePostButtons from "@/components/blog/managePostButtons/ManagePostButtons"

const getPostBySlug = async (slug) => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/get-one-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug }),
      cache: "no-store", // Ensures the data is not cached and is always fetched fresh
    })
    const data = await res.json()
    return data.res
  } catch (error) {
    console.log(error)
  }
}

export default async function SinglePostPage({ params }) {
  const { slug } = params
  const data = await getPostBySlug(slug)

  if (!data) {
    return <div>Post not found!</div> // You can show an error message if no data is returned
  }

  return (
    <div className={styles.container}>
      <Link href={`/blog/?catSlug=${data?.catSlug}`}>
        <CatTitle cat={data?.category} catSlug={data?.catSlug}/> 
      </Link>
      <div className={styles.detailsContainer}>
        <Reactions id={data?._id} />
        {data?.author === "Deletado" ? (
          <span className={styles.username}>{data.author}</span>
        ) : (
          <Link href={`/blog/?author=${data.author}`}>
            <span className={styles.username}>{data.author}</span>
          </Link>
        )}
        <span className={styles.date}>{formatDate(data?.createdAt)}</span>
      </div>
      <h2 className={styles.title}>{data?.title}</h2>
      <div className={styles.infoContainer}>
        {data?.img && (
          <div className={styles.imageContainer}>
            <Image
              src={data?.img}
              alt={data?.title}
              title={data?.title}
              fill
              className={styles.image}
              loading="lazy"
            />
          </div>
        )}
        <div className={styles.contentContainer}>
          <div 
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: data?.content }}
          />
          <div className={styles.tagsContainer}>
            <Tags tags={data?.tags} />
          </div>
          <ManagePostButtons author={data?.author} slug={data?.slug} imagePublicId={data?.img} />
          {/* <div className={styles.comment}>
            <Comments postSlug={slug}/>
          </div>       */}
        </div>
      </div>
    </div>
  )
}