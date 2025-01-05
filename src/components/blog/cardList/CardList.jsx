import styles from './cardList.module.css'
import Pagination from '../pagination/Pagination'
import Card from '../card/Card'

const getPosts = async (catSlug) => {

  try {

    const res = await fetch(`${process.env.BASE_URL}/api/get-posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ catSlug }),
      cache: "no-store",
    })
    // console.log("everything is OK")
    const data = await res.json()
    return data.res
    
    } catch (error) {
    console.log(error)
  }  
}

const CardList = async ({page, catSlug}) => {

  // const {posts, count} = await getData(page, cat)
  const dataDB = await getPosts(catSlug)
  // console.log("data from DB: ", dataDB)
  ///
  const count = 8
  ///

  const POST_PER_PAGE = 1

  const hasPrev = POST_PER_PAGE * (page - 1) > 0
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Postagens recentes</h3>
      <div className={styles.posts}>
        {dataDB?.reverse().map((item, number) => (
          <Card item={item} key={number}/>
        ))}
      </div>
      <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev} catSlug={catSlug}/>
    </div>
  )
}

export default CardList