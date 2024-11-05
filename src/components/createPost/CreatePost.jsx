"use client"
import { confirmAlert } from "react-confirm-alert"

const CreatePost = () => {

  const handleCreate = async () => {
    ///send POST request
    const newPost = {
      slug: "4motociclistas-jovens",
      title: "4Motociclistas jovens",
      content: "A infância de muitos motociclistas é marcada por uma fascinação precoce por motos e a sensação de liberdade que elas proporcionam. Desde cedo, muitos se encantam com o som dos motores, as corridas, e a ideia de aventura. Alguns começam a andar de bicicleta, sonhando com o dia em que trocarão as pedaladas pelo ronco de um motor. Para muitos, as histórias de viagens e as aventuras de motociclistas mais velhos alimentam o desejo de um dia seguir o mesmo caminho, explorando o mundo sobre duas rodas. Essa paixão, muitas vezes herdada ou inspirada por pais e familiares, molda a identidade e os sonhos de futuros motociclistas.",
      img: "/watch.png",
      catSlug: "noticias",
      author: "Admin",
      authorEmail: "caminante.msk@gmail.com",
      category: "notícias",
    }
 
  
    try {
      const res = await fetch("/api/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      }) 
      if (res.status === 201) {
        confirmAlert({
          message: "Prezado Admin, o Post foi criado com sucesso!",
          buttons: [
            {
              label: 'Ok',
              // onClick: () => {
              // }
            }
          ]
        })
      } else if (res.status === 400) {
        confirmAlert({
          message: "Prezado Admin, nao foi criado.",
          buttons: [
            {
              label: 'Ok',
              // onClick: () => {
              //   // setShowModal(false)
              //   setIsLoading(false)
              // }
            }
          ]
        })
      }
    }  catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2>Create Post Component</h2>
      <button onClick={handleCreate}>Create to test</button>
    </div>
  )
}

export default CreatePost