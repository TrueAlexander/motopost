import styles from "./homepage.module.css"
import CategoryList from "@/components/categoryList/CategoryList"
import CardList from "@/components/cardList/CardList"

///
import CreatePost from "@/components/createPost/CreatePost"
///

export default function Home({searchParams}) {

  const page = parseInt(searchParams.page) || 1

  return (
  <div className={styles.container}>
    <CategoryList/>
    <div className={styles.content}>
      <CardList page={page} cat={null}/>
    </div>
    <CreatePost/>
  </div>
  )
}
