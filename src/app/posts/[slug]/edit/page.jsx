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
import { IoClose } from "react-icons/io5"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

const EditPostPage = () => {

  const router = useRouter()
  const session = useSession()
  const { status } = useSession()
  const {theme} = useContext(ThemeContext)
  const themeClass = theme === 'dark' ? confirmAlertStyles.darkConfirmAlert : confirmAlertStyles.lightConfirmAlert

  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [catSlug, setCatSlug] = useState("")
  const [folder, setFolder] = useState('')
  const [imageId, setImageId] = useState('')
  const [tags, setTags] = useState([])

  // const [imgsDel, setImgsDel] = useState([])
    //track the initial image for edit mode
    const [initialImage, setInitialImage] = useState(imageId)
  

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

  const handleClose = () => {

    confirmAlert({
      customUI: ({ onClose }) => (
        <div className={themeClass}>
          <h2 style={{color: "crimson"}}>Atenção!</h2>
          <h3 style={{ marginTop: '15px', marginBottom: '15px' }}>Você tem certeza de que deseja sair sem salvar a postagem?</h3>
          <p>Não será possível restaurar seus dados depois de sair!</p>
          <button 
            className="button"
            onClick={ async () => { 
              setIsLoading(true)
              onClose()

              setImageId(initialImage)
              if (imageId !== initialImage) {
                try {
                  const imageDeleteRes = await fetch("/api/delete-image-cloud", {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ publicId: imageId })
                  })
                  
                } catch (error) {
                  console.log(error)
                }
    
              

              router.push("/")
            }}}
          >
            Sim
          </button>
          <button 
            className="button"
            onClick={() => { 
              onClose()
            }}
          >
            Não
          </button>
        </div>
      ),
    })

    
  }

   // to block go back
   useEffect(() => {
    // Add a new state to the history stack to prevent going back
    const preventBack = () => {
      window.history.pushState(null, "", window.location.href);  // Add a new history entry
      window.history.forward(); // Move forward in history if the back button is clicked
    };

    // When the page is loaded or reloaded, set up the prevention
    preventBack();

    // Add a popstate listener to prevent going back
    window.addEventListener("popstate", preventBack);

    return () => {
      // Clean up the event listener when the component is unmounted
      window.removeEventListener("popstate", preventBack);
    };
  }, []); // Empty dependency array means it runs only once on mount

  // to block refresh
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Optionally show a confirmation dialog (standard for some browsers)
      event.returnValue = "Are you sure you want to leave?";
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  




  useEffect(() => {
    // Redirect to home page if the user is unauthenticated
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status, router]) // Run when status or router changes

  if (status === "authenticated" && !isLoading) {
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
            setIsLoading={setIsLoading}
            initialImage={initialImage}
            setInitialImage={setInitialImage}
            // setImgsDel={setImgsDel}
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
            modules={{
              toolbar: [         
                [{ 'header': [1, 2, 3] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['bold', 'italic', 'underline'],
                ['link', 'image'],
              ],
            }}
            formats={['header', 'font', 'bold', 'italic', 'underline', 'list', 'link', 'image', 'align']}
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
        <button
          onClick={ handleClose }
          className={styles.return_button}
          title="à página principal"
        >  
          <IoClose/></button> 
        
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

  

