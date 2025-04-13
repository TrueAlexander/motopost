import styles from './tags.module.css'
import Link from 'next/link'

const Tags = ({tags}) => {

  return (
    <div className={styles.container}>
      {tags?.map((item, index) => (
        <Link href={`/blog/?tag=${item}`} className={styles.tag} key={index}>{item}</Link>
      ))}
    </div>
  )
}

export default Tags