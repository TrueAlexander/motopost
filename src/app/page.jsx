import styles from "./homepage.module.css"
import CategoryList from "@/components/categoryList/CategoryList"
import CardList from "@/components/cardList/CardList"
import InfoModal from "@/components/infoModal/infoModal"

///
// import CreatePost from "@/components/createPost/CreatePost"
///

export default function Home({searchParams}) {

  const page = parseInt(searchParams.page) || 1
  const verified = searchParams.verified ? JSON.parse(searchParams.verified) : false

  return (
  <div className={styles.container}>
    <InfoModal info={verified}/>
    <CategoryList/>
    <div className={styles.content}>
      <CardList page={page} cat={null}/>
    </div>
    {/* <CreatePost/> */}
  </div>
  )
}
