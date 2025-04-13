import styles from "./filterTitle.module.css"

const FilterTitle = ({cat, catSlug, author, tag}) => {
  
  const catBg = {
    noticias: "#57c4ff31",
    motopedia: "#ff795736",
    viagens: "#da85c731",
    oficina: "#7fb88133",
    estilo: "#ffb04f45",
    custom: "#5e4fff31"
  }

  const randomColor =  catBg[Object.keys(catBg)[Math.floor(Math.random() * Object.keys(catBg).length)]]

  if (catSlug && !author && !tag) {
    return (
      <h2 className={styles.title} style={{backgroundColor: `${catBg[catSlug]}`, textTransform: "capitalize"}}>{cat}</h2>
    )
  } else if (!catSlug && author && !tag) {
    return (
      <h2 
        className={styles.title} 
        style={{backgroundColor: `${randomColor}`, fontSize: "14px"}}
      > 
        Posts do/da <span className={styles.name}>{author}</span>
      </h2>
    )
  } else if (!catSlug && !author && tag) {
    return (
      <h2 
        className={styles.title} 
        style={{backgroundColor: `${randomColor}`, fontSize: "14px"}}
      > 
        Posts com <span className={styles.name}>#{tag}</span>
      </h2>
    )
  }

}

export default FilterTitle