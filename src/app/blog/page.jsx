import CardList from "@/components/cardList/CardList"
import styles from "./blogPage.module.css"
import CatTitle from "@/components/catTitle/CatTitle"

const BlogPage = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1
  const { catSlug } = searchParams

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
        <CardList page={page} catSlug={catSlug}/>
      </div>
    </div>
  )
}

export default BlogPage