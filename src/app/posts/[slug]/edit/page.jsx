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
import { ThemeContext } from "@/context/ThemeContext"
import { useContext } from 'react'
import confirmAlertStyles from '@/utils/confirmAlert.module.css'
import '@/utils/react-confirm-alert.css'
import { confirmAlert } from 'react-confirm-alert'
import CloudUploadElement from "@/components/blog/cloudUploadElement/CloudUploadElement"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

const EditPostPage = () => {

  const router = useRouter()
  const session = useSession()
  const { status } = useSession()
  const {theme} = useContext(ThemeContext)
  const themeClass = theme === 'dark' ? confirmAlertStyles.darkConfirmAlert : confirmAlertStyles.lightConfirmAlert

  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [catSlug, setCatSlug] = useState("")
  const [imgUrl, setImgUrl] = useState("")
  const [folder, setFolder] = useState('')
  const [imageId, setImageId] = useState('')
  const [tags, setTags] = useState([])

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
            setContent(res.content)
            setTitle(res.title)
            setCatSlug(res.catSlug)
            setTags(res.tags)
            setImageId(res.img.replace(/^https:\/\/res\.cloudinary\.com\/[a-zA-Z0-9]+\/image\/upload\//, ''))
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
      img: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${imageId}`,
      catSlug: catSlug,
      // author: session?.data?.user.name,
      // authorEmail: session?.data?.user.email,
      category: categoryName(catSlug),
      folderId: folder,
      tags: tags
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
          confirmAlert({
            customUI: ({ onClose }) => (
              <div className={themeClass}>
                <p>A postagem foi editada com sucesso</p>
                <button 
                  className="button"
                  onClick={() => { onClose(); router.push(`/posts/${updatedPost.slug}`);  }}
                >
                  Ok
                </button>
              </div>
            )
          })
        } else {
          confirmAlert({
            customUI: ({ onClose }) => (
              <div className={themeClass}>
                <p>Erro ao editar a postagem.</p> <p>Por favor, tente editar mais tarde.</p>
                <button 
                  className="button"
                  onClick={() => { onClose(); }}
                >
                  Ok
                </button>
              </div>
            )
          })
        }
    } catch (err) {
      console.log(err);
      confirmAlert({
        customUI: ({ onClose }) => (
          <div className={themeClass}>
            <p>Erro ao editar a postagem. Por favor, tente editar mais tarde.</p>
            <button 
              className="button"
              onClick={() => { onClose(); }}
            >
              Ok
            </button>
          </div>
        )
      })
    }
  }

  console.log("imageId from page: ", imageId)

  useEffect(() => {
    // Redirect to home page if the user is unauthenticated
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status, router]) // Run when status or router changes

  if (status === "authenticated") {
    return (
      <div className={styles.container}>
        <h2 className={styles.main_title}>Editar postagem</h2>
        <h2 className={styles.title}>Categoria:</h2>
          <select 
            className={styles.select}
            value={catSlug}
            onChange={(e) => setCatSlug(e.target.value)}>
            <option value="noticias">Notícias</option>
            <option value="viagens">Viagens</option>
            <option value="oficina">Oficína</option>
            <option value="dicas">Dicas</option>
            <option value="estilo">Estilo</option>
            <option value="outro">Outro</option>
          </select>
          {/*main image (Cloudinary) */}
          <h2 className={styles.title}>A imagem principal:</h2>
          <CloudUploadElement 
            author={session?.data?.user.name} 
            setFolder={setFolder}
            imageId={imageId}
            setImageId={setImageId}
            modeCreate={false}
          /> 
          <form className="" onSubmit={handleSubmit}>
          <h2 className={styles.title}>O título da postagem:</h2>
          <input
            type="text"
            value={title}
            placeholder="Título"
            className={styles.input}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h2 className={styles.title}>Conteúdo da postagem:</h2>
          <ReactQuill
            value={content}
            onChange={setContent}
            className={styles.textEditor}
            placeholder="Escreva o conteúdo aqui..."
          />
          <h2 className={styles.title}>Insira de 1 a 5 tags para a postagem, separadas por vírgulas ou espaços.</h2>
          <input
            type="text"
            value={tags}
            placeholder="Tags"
            className={styles.input}
            onChange={(e) => setTags(e.target.value.split(/[, ]+/).filter(Boolean))}
          />
          <h2 className={styles.title}>Após preencher todos os campos, clique</h2>
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

  

