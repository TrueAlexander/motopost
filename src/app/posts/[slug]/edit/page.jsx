'use client'
import styles from "./edit.module.css"
import { useEffect, useState } from "react"
import "react-quill/dist/quill.snow.css"
import dynamic from "next/dynamic"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Loading from "./loading"
import categoryName from "@/utils/categoryName"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

const EditPostPage = () => {

  const router = useRouter()

  const { status } = useSession()

  const [post, setPost] = useState(null);
  // const [erros, setErros] = useState({});
  // const [mensagem, setMensagem] = useState("");
  // const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState("")
  const [erros, setErros] = useState({})
  const [title, setTitle] = useState("")
  const [catSlug, setCatSlug] = useState("")
  const [imgUrl, setImgUrl] = useState("")

  const {slug} = useParams()

  //get the post from DB by slug
  useEffect(() => {
    const getPost = async (slug)=> {
      try {
        const data = await fetch("/api/get-one-post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
          cache: "no-store",
        })

        if (data.status === 201) {
          const { res } = await data.json() 
            setPost(res)
            setContent(res.content || "")
            setImgUrl(res.img)
            setTitle(res.title)
          } else {
            setPost(null) 
          }
        }     
       catch (error) {
        console.log(error)
      }      
    }
    getPost(slug)  
  }, [])

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")

   const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedPost = {
      slug: slugify(title),
      title: title,
      content: content,
      img: imgUrl,
      catSlug: catSlug,
      author: session?.data?.user.name,
      authorEmail: session?.data?.user.email,
      category: categoryName(catSlug),
    }

   

    try {
      const res = await fetch(`/api/edit-post/${slug}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedPost)
    })
  
      if (res.ok) {
          alert("O post foi editado com sucesso")
          router.push(`posts/${slug}`);
          // window.location.href = `/${id}`;
        } else {
          alert("Erro ao editar o post.");
        }
    } catch (err) {
      console.log(err);
      alert("Erro do lado de servidor.");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value
    }));
  }

  const handleContentChange = (event) => {
    setContent(event)
  }

  useEffect(() => {
    // Redirect to home page if the user is unauthenticated
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status, router]) // Run when status or router changes

  if (status === "authenticated") {
    return (
      <div className={styles.container}>
        <h2 className={styles.main_title}>Editar post</h2>
        <h2 className={styles.title}>Categoria:</h2>
          <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)}>
            <option value="noticias">Notícias</option>
            <option value="viagens">Viagens</option>
            <option value="oficina">Oficína</option>
            <option value="dicas">Dicas</option>
            <option value="estilo">Estilo</option>
            <option value="outro">Outro</option>
          </select> 
          <form className="" onSubmit={handleSubmit}>
          <h2 className={styles.title}>Título:</h2>
          <input
            type="text"
            value={title}
            placeholder="Título"
            className={styles.input}
            onChange={(e) => setTitle(e.target.value)}
          />
          {erros.title && <p className={styles.error}>{erros.title}</p>}
          <h2 className={styles.title}>Imagem principal:</h2>
          <input 
            type="text"
            value={imgUrl}
            placeholder="URL da imágem" 
            className={styles.input}
            onChange={(e) => setImgUrl(e.target.value)}
          />
          {erros.img && <p className={styles.error}>{erros.img}</p>}
          <input type="file" placeholder="file" className={styles.input} />
          <h2 className={styles.title}>Conteúdo:</h2>
          <ReactQuill
            value={content}
            onChange={setContent}
            className={styles.textEditor}
            placeholder="Escreva o conteúdo aqui..."
          />
          {erros.content && <p className={styles.error}>{erros.content}</p>}
  
          <button className="button" onClick={handleSubmit}>
            Publicar
          </button>
        </form> 
        
        {/* {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <p>{mensagem}</p>
            </div>
          </div>
        )} */}
      </div>  
    ) 
  }
  return <Loading />

}

export default EditPostPage






 

  

  // if (status === "loading") {
  //   return (<Loading/>)
  // }

  // if (status === "unauthenticated") {
  //   router.push("/")
  // }

  // const slugify = (str) =>
  //   str
  //     .toLowerCase()
  //     .trim()
  //     .replace(/[^\w\s-]/g, "")
  //     .replace(/[\s_-]+/g, "-")
  //     .replace(/^-+|-+$/g, "")

  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   const newPost = {
  //     slug: slugify(title),
  //     title: title,
  //     content: content,
  //     img: imgUrl,
  //     catSlug: catSlug || "noticias",
  //     author: session?.data?.user.name,
  //     authorEmail: session?.data?.user.email,
  //     category: categoryName(catSlug),
  //   }

  //   try {
  //     const res = await fetch("/api/create-post", {
  //       method: "POST",
  //       body: JSON.stringify(newPost),
  //     })

  //     if (res.status === 200 || 201) {
  //       router.push(`/posts/${newPost.slug}`)
  //     }
  
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // return (
  //   <div className={styles.container}>
  //     <h2 className={styles.title}>Escolha uma categoria de sua postagem:</h2>
  //     <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)}>
  //       <option value="noticias">Notícias</option>
  //       <option value="viagens">Viagens</option>
  //       <option value="oficina">Oficína</option>
  //       <option value="dicas">Dicas</option>
  //       <option value="estilo">Estilo</option>
  //       <option value="outro">Outro</option>
  //     </select> 
  //     <form className="" onSubmit={handleSubmit}>
  //     <h2 className={styles.title}>Escreve o título da postagem:</h2>
  //       <input
  //         type="text"
  //         placeholder="Título"
  //         className={styles.input}
  //         onChange={(e) => setTitle(e.target.value)}
  //       />
  //       {erros.title && <p className={styles.error}>{erros.title}</p>}
  //       <h2 className={styles.title}>Adicione a imagem principal:</h2>
  //       <input 
  //         type="text" 
  //         placeholder="URL da imágem" 
  //         className={styles.input}
  //         onChange={(e) => setImgUrl(e.target.value)}
  //       />
  //       {erros.img && <p className={styles.error}>{erros.img}</p>}
  //       <input type="file" placeholder="file" className={styles.input} />
  //       <h2 className={styles.title}>Conteúdo da postagem:</h2>
  //       <ReactQuill
  //         value={content}
  //         onChange={setContent}
  //         className={styles.textEditor}
  //         placeholder="Escreva o conteúdo aqui..."
  //       />
  //       {erros.content && <p className={styles.error}>{erros.content}</p>}

  //       <button className="button" onClick={handleSubmit}>
  //         Publicar
  //       </button>
  //     </form> 
  //   </div>
  // )


  

