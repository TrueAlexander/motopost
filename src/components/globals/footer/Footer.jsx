import styles from './footer.module.css'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {

  const catSlugsOrder = ['noticias', 'viagens', 'oficina', 'dicas', 'estilo', 'outro']
  const categories = ['Notícias', 'Viagens', 'Oficína', 'Dicas', 'Estilo', 'Outro']

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <div className={styles.image}>
            <Link href="/">
              <Image className={styles.image_img} src="/motorbike.png" alt="moto_logo" width={50} height={50} />
            </Link>
          </div>
          <h1 className={styles.logoText}>MotoPost</h1>
        </div>
        <p className={styles.desc}>MOTOPOST é o espaço perfeito para motociclistas apaixonados por motos, viagens emocionantes, notícias atualizadas, dicas de oficina, estilo de vida e tudo o que envolve o mundo das duas rodas. Faça parte da nossa comunidade dedicada aos motociclistas.</p>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link className={styles.link} href="/">Home</Link>
          <Link className={styles.link} href="/">Contato</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Categorías</span>
          {catSlugsOrder.map((item, index) => (
            <Link
              key={index}
              className={styles.link} 
              href={`/blog?catSlug=${item}`}
            >
              {/* {categories[index].charAt(0).toUpperCase() + item.slice(1)} */}
              {categories[index]}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Footer