"use client"
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
import { IoClose } from "react-icons/io5"

const CriarPage = () => {
  const session = useSession()
  const { status } = useSession()
  const router = useRouter()

  const {theme} = useContext(ThemeContext)
  const themeClass = theme === 'dark' ? confirmAlertStyles.darkConfirmAlert : confirmAlertStyles.lightConfirmAlert

  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [tags, setTags] = useState([])
  const [catSlug, setCatSlug] = useState("noticias")
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

    if(title.length < 9) {
      confirmAlert({
        customUI: ({ onClose }) => (
          <div className={themeClass}>
            <p>O título deve conter no mínimo 9 símbolos!</p>
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
    } else if (tags.length < 1) {
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
    } else if (!imageId) {
      confirmAlert({
        customUI: ({ onClose }) => (
          <div className={themeClass}>
            <p>Está seguro de que não quer adicionar a imagem principal?</p>
            <button 
              className="button"
              onClick={ async () => { 
                setIsLoading(true)
                onClose()

                const newPost = {
                  slug: slugify(title),
                  title: title,
                  content: content,
                  img: imageId ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${imageId}`: null,
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
                  console.log(res.status)

                  if (res.status === 400) {
                    confirmAlert({
                      customUI: ({ onClose }) => (
                        <div className={themeClass}>
                          <p>A postagem com este título já existe.</p><p>Provavelmente, a postagem já foi criada antes.</p>
                          <button 
                            className="button"
                            onClick={() => { onClose(); setIsLoading(false)}}
                          >
                            Ok
                          </button>
                        </div>
                      ),
                    })
                  } else if (res.status === 200 || 201) {
                    console.log("here")
                    confirmAlert({
                      customUI: ({ onClose }) => (
                        <div className={themeClass}>
                          <p>A postagem foi criada com sucesso!</p>
                          <button 
                            className="button"
                            onClick={() => { onClose(); router.push(`/posts/${newPost.slug}`)}}
                          >
                            Ok
                          </button>
                        </div>
                      ),
                    })  
                  } 
                  // else if (res.status === 400) {
                  //   confirmAlert({
                  //     customUI: ({ onClose }) => (
                  //       <div className={themeClass}>
                  //         <p>A postagem com este título já existe.</p><p>Provavelmente, a postagem já foi criada antes.</p>
                  //         <button 
                  //           className="button"
                  //           onClick={() => { onClose();}}
                  //         >
                  //           Ok
                  //         </button>
                  //       </div>
                  //     ),
                  //   })
                  // }
                   else {

                    confirmAlert({
                      customUI: ({ onClose }) => (
                        <div className={themeClass}>
                          <p>Algo deu errado.</p><p>Tente criar a postagem mais tarde.</p>
                          <button 
                            className="button"
                            onClick={() => { onClose(); setIsLoading(false)}}
                          >
                            Ok
                          </button>
                        </div>
                      ),
                    })             
                  }
                } catch (error) {
                  console.log(error)
                }
              }}
            >
              Confirmo
            </button>
            <button 
              className="button"
              onClick={() => { 
                onClose()
              }}
            >
              Adicionar 
            </button>
          </div>
        ),
      })
    } else {
      const newPost = {
        slug: slugify(title),
        title: title,
        content: content,
        img: imageId ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${imageId}`: null,
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

        if (res.status === 400) {
          confirmAlert({
            customUI: ({ onClose }) => (
              <div className={themeClass}>
                <p>A postagem com este título já existe.</p><p>Provavelmente, a postagem já foi criada antes.</p>
                <button 
                  className="button"
                  onClick={() => { onClose(); setIsLoading(false)}}
                >
                  Ok
                </button>
              </div>
            ),
          })
        } else if (res.status === 200 || 201) {
          confirmAlert({
            customUI: ({ onClose }) => (
              <div className={themeClass}>
                <p>A postagem foi criada com sucesso!</p>
                <button 
                  className="button"
                  onClick={() => { onClose(); router.push(`/posts/${newPost.slug}`)}}
                >
                  Ok
                </button>
              </div>
            ),
          })  
      
        } else {

          confirmAlert({
            customUI: ({ onClose }) => (
              <div className={themeClass}>
                <p>Algo deu errado.</p><p>Tente criar a postagem mais tarde.</p>
                <button 
                  className="button"
                  onClick={() => { onClose(); setIsLoading(false) }}
                >
                  Ok
                </button>
              </div>
            ),
          })             
        }
      } catch (error) {
        console.log(error)
      }
    }  

  }

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
              if (imageId) {
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
              }

              router.push("/")
            }}
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
  }, []) // Empty dependency array means it runs only once on mount

// in case of refresh
  useEffect( () => {
    const handleBeforeUnload = async (event) => {
      // Prevent default behavior (showing confirmation dialog)
      event.preventDefault();
      // Check if the imageId exists and delete the image
      if (imageId) {
        setIsLoading(true)
        try {
          const imageDeleteRes = await fetch("/api/delete-image-cloud", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ publicId: imageId })
          })
          // Optionally handle the response, e.g. checking for success
          if (!imageDeleteRes.ok) {
            console.log(`Failed to delete image with ID: ${imageId}`);
          }
          
        } catch (error) {
          console.log(error)
        }
  
      }
      // For older browsers
      event.returnValue = ''  // Required for certain browsers to show confirmation
    }
  
    // Attach the handler to the beforeunload event
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    // Cleanup handler on unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    } 
  }, [imageId]) // Re-run the effect when imageId changes
 

  if (status === "authenticated" && !isLoading) {
    return (
      <div className={styles.container}>
        <h2 className={styles.main_title}>Criar postagem</h2>
        {/* choose the category */}
        <h2 className={styles.title}>Categoria da sua postagem:</h2>
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
          modeCreate={true}
          setIsLoading={setIsLoading}
        /> 
        <form className="" onSubmit={handleSubmit}>
        {/* Add the title */}
        <h2 className={styles.title}>O título da postagem:</h2>
        <input
            type="text"
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
      </div>
    )
  }
  return <Loading />
}

export default CriarPage

  

