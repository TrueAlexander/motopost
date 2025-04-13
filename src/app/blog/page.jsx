import CardList from "@/components/blog/cardList/CardList"
import styles from "./blogPage.module.css"
import FilterTitle from "@/components/blog/filterTitle/FilterTitle"

const BlogPage = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1
  const { catSlug, author, tag } = searchParams

  console.log("catSlug from search: ", catSlug)
  console.log("author from search: ", author)
  ///
  const cats = {
    noticias: 'notícias',
    motopedia: 'motopédia', 
    viagens:'viagens',
    oficina: 'oficina', 
    estilo: 'estilo', 
    custom: 'custom'
  }

  const cat = cats[catSlug]
  
  return (
    <div className={styles.container}>
      <FilterTitle cat={cat} catSlug={catSlug} author={author} tag={tag}/>
      <div className={styles.content}>
        <CardList page={page} catSlug={catSlug} author={author} tag={tag}/>
      </div>
    </div>
  )
}

export default BlogPage