import styles from './tags.module.css'
import Link from 'next/link'

const Tags = ({tags}) => {

  console.log(tags)

  return (
    <div className={styles.container}>
      {tags.map((item, index) => (
        <Link href="" className={styles.tag} key={index}>{item}</Link>
      ))}
    </div>
  )
}

export default Tags