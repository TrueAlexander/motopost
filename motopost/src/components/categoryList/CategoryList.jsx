import styles from './categoryList.module.css'
import Link from 'next/link'

const CategoryList = () => {


  const categoriesOrder = ['notícias', 'viagens', 'oficína', 'dicas', 'estilo', 'outro']

  // const categories = [
  //   {cat: 'Todas', img: ''},
  //   {cat: 'Notícias', img: ''},
  //   {cat: 'Viagens', img: ''},
  //   {cat: 'Oficína', img: ''},
  //   {cat: 'Dicas', img: ''},
  //   {cat: 'Estilo', img: ''},  
  // ]

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Categorías</h2>
      <div className={styles.categories}>
        {categoriesOrder.map((item) => (
          <Link
            href={`/${item}`}
            className={`${styles.category} ${item === 'notícias' 
              ? styles.notícias : item === 'viagens' 
              ? styles.viagens : item === 'oficína' 
              ? styles.oficína : item === 'dicas' 
              ? styles.dicas : item === 'estilo' 
              ? styles.estilo : item === 'outro' 
              ? styles.outro : ''} `}
            key={item._id}
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryList