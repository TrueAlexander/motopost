import styles from './footer.module.css'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <div className={styles.image}>
            <Image src="/motorbike.png" alt="moto_logo" width={50} height={50} />
          </div>
          <h1 className={styles.logoText}>MotoPost</h1>
        </div>
        <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores quae, eligendi fugit reprehenderit magnam tempora voluptate, quas laborum voluptatibus nisi rem! Laborum, accusamus? Nemo id illum minima nulla facere repellat.</p>
        {/* <div className={styles.icons}>
          <Image src="/facebook.png" alt="" width={18} height={18} />
          <Image src="/instagram.png" alt="" width={18} height={18} />
          <Image src="/tiktok.png" alt="" width={18} height={18} />
          <Image src="/youtube.png" alt="" width={18} height={18} />
        </div> */}
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Home</Link>
          <Link href="/">Contato</Link>
          <Link href="/">Login</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Categorías</span>
          <Link href="/">Todas</Link>
          <Link href="/">Notícias</Link>
          <Link href="/">Viagens</Link>
          <Link href="/">Oficína</Link>
          <Link href="/">Dicas</Link>
        </div>
      </div>
    </div>
  )
}

export default Footer
