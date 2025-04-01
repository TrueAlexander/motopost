import styles from "./catTitle.module.css"

const CatTitle = ({cat, catSlug}) => {
  
  const catBg = {
    noticias: "#57c4ff31",
    motopedia: "#ff795736",
    viagens: "#da85c731",
    oficina: "#7fb88133",
    estilo: "#ffb04f45",
    custom: "#5e4fff31"
  }

  return (
    <h2 className={styles.title} style={{backgroundColor: `${catBg[catSlug]}`}}>{cat}</h2>
  )
}

export default CatTitle