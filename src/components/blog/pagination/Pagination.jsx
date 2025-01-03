"use client"
import styles from './pagination.module.css'
import { useRouter } from 'next/navigation'

const Pagination = ({page, hasPrev, hasNext, catSlug}) => {

  const router = useRouter()

  return (
    <div className={styles.container}>
      <button 
        className="button"
        disabled={!hasPrev}
        onClick={() => router.push(`?${catSlug ? `catSlug=${catSlug}&` : ''}page=${page - 1}`)}
      >
        Voltar
      </button>
      <button 
        className="button"
        disabled={!hasNext}
        onClick={() => router.push(`?${catSlug ? `catSlug=${catSlug}&` : ''}page=${page + 1}`)}
      >
        Avançar
      </button>
    </div>
  )
}

export default Pagination