import CardList from "@/components/blog/cardList/CardList"
import styles from "./blogPage.module.css"
import CatTitle from "@/components/blog/catTitle/CatTitle"

const BlogPage = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1
  const { catSlug, author } = searchParams

  console.log("catSlug from search: ", catSlug)
  console.log("author from search: ", author)
  ///
  const cats = {
    noticias: 'notícias', 
    viagens:'viagens',
    oficina: 'oficína', 
    dicas: 'dicas', 
    estilo: 'estilo', 
    outro: 'outro'
  }

  const cat = cats[catSlug]
  
  return (
    <div className={styles.container}>
      <CatTitle cat={cat} catSlug={catSlug}/>
      <div className={styles.content}>
        <CardList page={page} catSlug={catSlug} author={author}/>
      </div>
    </div>
  )
}

export default BlogPage