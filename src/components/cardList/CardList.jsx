import styles from './cardList.module.css'
// import Pagination from '../pagination/Pagination'
import Card from '../card/Card'

// const getData = async (page, cat) => {
//   const res = await fetch(`${process.env.BASE_URL}/api/posts?page=${page}&cat=${cat || ""}`, {
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
    slug: "relógios-de-motociclistas",
    catSlug: "dicas",
    desc: "Os relógios para motociclistas são mais do que simples acessórios; eles são ferramentas essenciais que combinam estilo, funcionalidade e robustez. Projetados para resistir às condições adversas enfrentadas na estrada, esses relógios geralmente possuem características como resistência à água, construção robusta e fácil legibilidade em diferentes condições de luz.",
    createdAt: "2023-10-29T00:16:29.938+00:00"
  },
  {
    _id: 2,
    img:"/baby.jpg",
    title: "Motociclistas jovens",
    slug: "motociclistas-jovens",
    catSlug: "viagens",
    desc: "A infância de muitos motociclistas é marcada por uma fascinação precoce por motos e a sensação de liberdade que elas proporcionam. Desde cedo, muitos se encantam com o som dos motores, as corridas, e a ideia de aventura. Alguns começam a andar de bicicleta, sonhando com o dia em que trocarão as pedaladas pelo ronco de um motor. Para muitos, as histórias de viagens e as aventuras de motociclistas mais velhos alimentam o desejo de um dia seguir o mesmo caminho, explorando o mundo sobre duas rodas. Essa paixão, muitas vezes herdada ou inspirada por pais e familiares, molda a identidade e os sonhos de futuros motociclistas.",
    createdAt: "2023-10-31T00:16:29.938+00:00"
  },

] 

const CardList = async ({page, cat}) => {

  // const {posts, count} = await getData(page, cat)

  const POST_PER_PAGE = 2

  // const hasPrev = POST_PER_PAGE * (page - 1) > 0
  // const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Postagens recentes</h2>
      <div className={styles.posts}>
        {posts?.map(item => (
          <Card item={item} key={item._id}/>
        ))}
      </div>
      {/* <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev}/> */}
    </div>
  )
}

export default CardList




// return (
//   <div className="main__item post" key={post._id}>
//     <div
//       className="post__image"
//       title={post.title}
//       style={{ backgroundImage: "" }}
//     >
//       <img src={`https://blog-eformaliza-api.onrender.com${post.imageUrl}`} alt={post.title} />
//     </div>
//     <div className="post__content">
//       <div className="post__row">
//         <div className="post__date">{date(post.createdAt)}</div>
//         <div className="post__author">{post.authorUsername}</div>
//       </div>
//       <h3 className="post__subtitle">{post.title}</h3>
//       <div className="post__text">{post.text}</div>
//       <button
//         id={post.id}
//         title="Leia post completo"
//         className="post__button btn"
//       >
//         <Link to={`/${post.title}`} state={{ id: post._id }} >
//           Leia mais
//         </Link>
//       </button>
//     </div>
//   </div>
// )