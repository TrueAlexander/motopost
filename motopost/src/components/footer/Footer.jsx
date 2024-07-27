import styles from './footer.module.css'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {

  const categories = ['notícias', 'viagens', 'oficína', 'dicas', 'estilo', 'outro']

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <div className={styles.image}>
            <Link href="/">
              <Image src="/motorbike.png" alt="moto_logo" width={50} height={50} />
            </Link>
          </div>
          <h1 className={styles.logoText}>MotoPost</h1>
        </div>
        <p className={styles.desc}>MOTOPOST é o espaço perfeito para motociclistas apaixonados por motos, viagens emocionantes, notícias atualizadas, dicas de oficina, estilo de vida e tudo o que envolve o mundo das duas rodas. Descubra rotas incríveis, mantenha-se informado com as últimas novidades do setor, obtenha dicas valiosas de manutenção e estilo, e compartilhe sua paixão pelo motociclismo. Acesse MOTOPOST e faça parte da nossa comunidade dedicada aos motociclistas.</p>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link className={styles.link} href="/">Home</Link>
          <Link className={styles.link} href="/">Contato</Link>
          <Link className={styles.link} href="/">Login</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Categorías</span>
          {categories.map((item, index) => (
            <Link
              key={index}
              className={styles.link} 
              href={`/${item}`}
              >{item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Footer