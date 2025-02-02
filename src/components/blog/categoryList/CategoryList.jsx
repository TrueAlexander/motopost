import styles from './categoryList.module.css'
import Link from 'next/link'

const CategoryList = () => {


  const catSlugsOrder = ['noticias', 'viagens', 'oficina', 'dicas', 'estilo', 'outro']
  const categories = ['notícias', 'viagens', 'oficína', 'dicas', 'estilo', 'outro']

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Categorías</h2>
      <div className={styles.categories}>
        {catSlugsOrder.map((item, index) => (
          <Link
            href={`/blog?catSlug=${item}`}
            className={`${styles.category} ${item === 'noticias' 
              ? styles.noticias : item === 'viagens' 
              ? styles.viagens : item === 'oficina' 
              ? styles.oficina : item === 'dicas' 
              ? styles.dicas : item === 'estilo' 
              ? styles.estilo : item === 'outro' 
              ? styles.outro : ''} `}
            key={index}
          >
            {categories[index]}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryList