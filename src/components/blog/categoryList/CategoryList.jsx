import styles from './categoryList.module.css'
import Link from 'next/link'

const CategoryList = () => {


  const catSlugsOrder = ['noticias', 'motopedia', 'viagens', 'oficina', 'estilo', 'custom' ]
  const categories = ['notícias', 'motopédia', 'viagens', 'oficina', 'estilo', 'custom']

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
              ? styles.oficina : item === 'motopedia' 
              ? styles.motopedia : item === 'estilo' 
              ? styles.estilo : item === 'custom' 
              ? styles.custom : ''} `}
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