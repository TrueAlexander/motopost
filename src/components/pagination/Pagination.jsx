"use client"
import styles from './pagination.module.css'
import { useRouter } from 'next/navigation'

const Pagination = ({page, hasPrev, hasNext}) => {

  const router = useRouter()

  return (
    <div className={styles.container}>
      <button 
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${page - 1}`)}
      >
        Voltar
      </button>
      <button 
        className={styles.button}
        disabled={!hasNext}
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        Avançar
      </button>
    </div>
  )
}

export default Pagination