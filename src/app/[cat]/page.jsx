'use client'
import CardList from "@/components/cardList/CardList"
import styles from "./categoryPage.module.css"


const categoryPage = ({searchParams}) => {

  const catBg = {
    notícias: "#57c4ff31",
    viagens: "#da85c731",
    oficína: "#7fb88133",
    dicas: "#ff795736",
    estilo: "#ffb04f45",
    outro: "#5e4fff31"
  }

  const page = parseInt(searchParams.page) || 1
  const { cat } = searchParams
 

  return (
  <div className={styles.container}>
    <h2 className={styles.title} style={{backgroundColor: `${catBg[cat]}`}}>{`cat: ${cat}`}</h2>
    <div className={styles.content}>
      <CardList page={page} cat={cat}/>
    </div>
  </div>
  )
}

export default categoryPage