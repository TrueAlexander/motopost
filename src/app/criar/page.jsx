"use client"
import Image from "next/image"
import styles from "./criar.module.css"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import dynamic from "next/dynamic"
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"
import Loading from "./loading"
import categoryName from "@/utils/categoryName"
import CloudUploadElement from "@/components/blog/cloudUploadElement/CloudUploadElement"
import { ThemeContext } from "@/context/ThemeContext"
import { useContext } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import confirmAlertStyles from '@/utils/confirmAlert.module.css'


const CriarPage = () => {
  const session = useSession()
  const { status } = useSession()
  const router = useRouter()

  const {theme} = useContext(ThemeContext)
  const themeClass = theme === 'dark' ? confirmAlertStyles.darkConfirmAlert : confirmAlertStyles.lightConfirmAlert

  // const [open, setOpen] = useState(false)
  const [content, setContent] = useState("")
  const [erros, setErros] = useState({})
  // const [mensagem, setMensagem] = useState("");
  // const [showModal, setShowModal] = useState(false);
  // const [file, setFile] = useState(null);
  // const [media, setMedia] = useState("");
  // const [value, setValue] = useState("");
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState([])
  const [catSlug, setCatSlug] = useState("noticias")
  // const [imgUrl, setImgUrl] = useState('')
  ///folderId(folder) and imageId(main image name) for cloudinary
  const [folder, setFolder] = useState('')
  const [imageId, setImageId] = useState('')
 
  useEffect(() => {
    // Redirect to home page if the user is unauthenticated
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status, router]) // Run when status or router changes

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(title.length < 10) {
      confirmAlert({
        customUI: ({ onClose }) => (
          <div className={themeClass}>
            <p>O título deve conter no mínimo 10 símbolos!</p>
            <button 
              className="button"
              onClick={() => { onClose(); }}
            >
              Ok
            </button>
          </div>
        ),
      })
    } else if (content.length < 250) {
      confirmAlert({
        customUI: ({ onClose }) => (
          <div className={themeClass}>
            <p>O conteúdo deve conter no mínimo 250 símbolos!</p>
            <button 
              className="button"
              onClick={() => { onClose(); }}
            >
              Ok
            </button>
          </div>
        ),
      })
    } else if (!imageId) {
      confirmAlert({
        customUI: ({ onClose }) => (
          <div className={themeClass}>
            <p>Por favor, adicione a imagem principal!</p>
            <button 
              className="button"
              onClick={() => { onClose(); }}
            >
              Ok
            </button>
          </div>
        ),
      })
    } else if(tags.length < 1) {
      confirmAlert({
        customUI: ({ onClose }) => (
          <div className={themeClass}>
            <p>Insira de 1 a 5 tags para a postagem!</p>
            <button 
              className="button"
              onClick={() => { onClose(); }}
            >
              Ok
            </button>
          </div>
        ),
      })
    } else if(tags.length > 5) {
      confirmAlert({
        customUI: ({ onClose }) => (
          <div className={themeClass}>
            <p>A quantidade máxima de tags para a postagem é 5!</p>
            <button 
              className="button"
              onClick={() => { onClose(); }}
            >
              Ok
            </button>
          </div>
        ),
      })
    } else {
      const newPost = {
        slug: slugify(title),
        title: title,
        content: content,
        img: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${imageId}`,
        catSlug: catSlug,
        author: session?.data?.user.name,
        authorEmail: session?.data?.user.email,
        category: categoryName(catSlug),
        folderId: folder,
        tags: tags
      }
  
      try {
        const res = await fetch("/api/create-post", {
          method: "POST",
          body: JSON.stringify(newPost),
        })
  
        if (res.status === 200 || 201) {
          // const data = await res.json()
          // console.log(data)
          router.push(`/posts/${newPost.slug}`)
        }  
      } catch (error) {
        console.log(error)
      }
    }   
  }

  if (status === "authenticated") {
    return (
      <div className={styles.container}>
        {/* choose the category */}
        <h2 className={styles.title}>Escolha uma categoria de sua postagem:</h2>
        <select 
          className={styles.select}
          value={catSlug} 
          onChange={(e) => setCatSlug(e.target.value)}
        >
          <option value="noticias">Notícias</option>
          <option value="viagens">Viagens</option>
          <option value="oficina">Oficína</option>
          <option value="dicas">Dicas</option>
          <option value="estilo">Estilo</option>
          <option value="outro">Outro</option>
        </select>
         {/* Add the main image (Cloudinary) */}
        <h2 className={styles.title}>Adicione a imagem principal:</h2>
        <CloudUploadElement 
          author={session?.data?.user.name} 
          setFolder={setFolder}
          imageId={imageId}
          setImageId={setImageId}
        /> 
        <form className="" onSubmit={handleSubmit}>
        {/* Add the title */}
        <h2 className={styles.title}>Escreve o título da postagem:</h2>
        <input
            type="text"
            placeholder="Título"
            className={styles.input}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* {erros.title && <p className={styles.error}>{erros.title}</p>} */}
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
            placeholder="Tags"
            className={styles.input}
            onChange={(e) => setTags(e.target.value.split(/[, ]+/).filter(Boolean))}
          />
          <h2 className={styles.title}>Após preencher todos os campos, clique</h2>
          <button className="button" onClick={handleSubmit}>
            Publicar
          </button>
        </form>
      </div>
    )
  }
  return <Loading />
}

export default CriarPage

  

