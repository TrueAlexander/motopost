import styles from "./singlePage.module.css"
import Image from "next/image"
import { formatDate } from "@/utils/dateFormat"
import CatTitle from "@/components/catTitle/CatTitle"
// import Comments from "@/components/comments/Comments"

// const getData = async (slug) => {
//   const res = await fetch(`${process.env.BASE_URL}/api/posts/${slug}`, {
//     cache: "no-store",
//   })

//   if (!res.ok) {
//     throw new Error("Failed!")
//   }

//   return res.json()
// }

const posts = [
  {
    _id: 0,
    img:"/watch.png",
    title: "Relógios de motociclistas",
    slug: "relogios-de-motociclistas",
    catSlug: "dicas",
    category: "dicas",
    desc: "Os relógios para motociclistas são mais do que simples acessórios; eles são ferramentas essenciais que combinam estilo, funcionalidade e robustez. Projetados para resistir às condições adversas enfrentadas na estrada, esses relógios geralmente possuem características como resistência à água, construção robusta e fácil legibilidade em diferentes condições de luz.",
    createdAt: "2023-10-29T12:16:29.938+00:00",
    author: "Admin",
    likes: 0,
    views: 5,
  },
  {
    _id: 1,
    img:"/baby.jpg",
    title: "Motociclistas jovens",
    slug: "motociclistas-jovens",
    catSlug: "viagens",
    category: "viagens",
    desc: "A infância de muitos motociclistas é marcada por uma fascinação precoce por motos e a sensação de liberdade que elas proporcionam. Desde cedo, muitos se encantam com o som dos motores, as corridas, e a ideia de aventura. Alguns começam a andar de bicicleta, sonhando com o dia em que trocarão as pedaladas pelo ronco de um motor. Para muitos, as histórias de viagens e as aventuras de motociclistas mais velhos alimentam o desejo de um dia seguir o mesmo caminho, explorando o mundo sobre duas rodas. Essa paixão, muitas vezes herdada ou inspirada por pais e familiares, molda a identidade e os sonhos de futuros motociclistas.",
    createdAt: "2023-10-31T00:16:29.938+00:00",
    author: "Admin",
    likes: 3,
    views: 3,
  },
  {
    _id: 3,
    img:"/watch.png",
    title: "Relógios de motociclistas2",
    slug: "relogios-de-motociclistas2",
    catSlug: "dicas",
    category: "dicas",
    desc: "Os relógios para motociclistas são mais do que simples acessórios; eles são ferramentas essenciais que combinam estilo, funcionalidade e robustez. Projetados para resistir às condições adversas enfrentadas na estrada, esses relógios geralmente possuem características como resistência à água, construção robusta e fácil legibilidade em diferentes condições de luz.",
    createdAt: "2023-10-29T00:16:29.938+00:00",
    author: "Admin",
    likes: 0,
    views: 5,
  },
  {
    _id: 4,
    img:"/baby.jpg",
    title: "Motociclistas jovens2",
    slug: "motociclistas-jovens2",
    catSlug: "viagens",
    category: "viagens",
    desc: "A infância de muitos motociclistas é marcada por uma fascinação precoce por motos e a sensação de liberdade que elas proporcionam. Desde cedo, muitos se encantam com o som dos motores, as corridas, e a ideia de aventura. Alguns começam a andar de bicicleta, sonhando com o dia em que trocarão as pedaladas pelo ronco de um motor. Para muitos, as histórias de viagens e as aventuras de motociclistas mais velhos alimentam o desejo de um dia seguir o mesmo caminho, explorando o mundo sobre duas rodas. Essa paixão, muitas vezes herdada ou inspirada por pais e familiares, molda a identidade e os sonhos de futuros motociclistas.",
    createdAt: "2023-10-31T00:16:29.938+00:00",
    author: "Admin",
    likes: 3,
    views: 3,
  },

] 

const SinglePage = ({params}) => {

  const {slug} = params

  /////
  const data = posts.filter(item => item.slug === slug)[0]
  const cat = data.category
  const catSlug = data.catSlug
  /////

  return (
    <div className={styles.container}>
      <CatTitle cat={cat} catSlug={catSlug}/>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h2 className={styles.title}>{data?.title}</h2>
          <div className={styles.user}>
            {/* {data?.user?.image && <div className={styles.userImageContainer} >
              <Image src={data.user.image} alt="image avatar" fill className={styles.avatar} />
            </div>} */}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.author}</span>
              <span className={styles.date}>{formatDate(data.createdAt)}</span>
            </div>
          </div>
        </div>
        {data?.img && <div className={styles.imageContainer}>
          <Image src={data.img} alt={data.title} title={data.title} fill className={styles.image} />
        </div>}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          {/* <div
           className={styles.description} 
           dangerouslySetInnerHTML={{ __html: data?.desc }}
           /> */}
          <div 
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />
          {/* <div className={styles.comment}>
            <Comments postSlug={slug}/>
          </div>       */}
        </div>
      </div>
    </div>
  )
}

export default SinglePage

