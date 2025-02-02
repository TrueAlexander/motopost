import styles from './cardList.module.css'
import Pagination from '../pagination/Pagination'
import Card from '../card/Card'

const getPosts = async (page, catSlug, author) => {

  try {

    const res = await fetch(`${process.env.BASE_URL}/api/get-posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ catSlug, page, author }),
      cache: "no-store",
    })
    const data = await res.json()
    return data
    
    } catch (error) {
    console.log(error)
  }  
}

const CardList = async ({page, catSlug, author}) => {

  const {posts, count} = await getPosts(page, catSlug, author)

  const POST_PER_PAGE = 5

  const hasPrev = POST_PER_PAGE * (page - 1) > 0
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Postagens recentes</h3>
      <div className={styles.posts}>
        {posts?.map((item) => (
          <Card item={item} key={item._id}/>
        ))}
      </div>
      <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev} catSlug={catSlug}/>
    </div>
  )
}

export default CardList