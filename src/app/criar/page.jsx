"use client"
import Image from "next/image"
import styles from "./criar.module.css"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
// import InputModal from "@/components/blog/inputModal/InputModal"
import dynamic from "next/dynamic"
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
// import "react-quill/dist/quill.snow.css"
import Loading from "./loading"


const CriarPage = () => {
  const session = useSession()
  const { status } = useSession()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [content, setContent] = useState("")
  const [erros, setErros] = useState({})
  // const [mensagem, setMensagem] = useState("");
  // const [showModal, setShowModal] = useState(false);
  // const [file, setFile] = useState(null);
  // const [media, setMedia] = useState("");
  // const [value, setValue] = useState("");
  // const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");

  // useEffect(() => {
  //   const storage = getStorage(app);
  //   const upload = () => {
  //     const name = new Date().getTime() + file.name;
  //     const storageRef = ref(storage, name);

  //     const uploadTask = uploadBytesResumable(storageRef, file);

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log("Upload is " + progress + "% done");
  //         switch (snapshot.state) {
  //           case "paused":
  //             console.log("Upload is paused");
  //             break;
  //           case "running":
  //             console.log("Upload is running");
  //             break;
  //         }
  //       },
  //       (error) => {},
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           setMedia(downloadURL);
  //         });
  //       }
  //     );
  //   };

  //   file && upload();
  // }, [file]);

  if (status === "loading") {
    return (<Loading/>)
  }

  if (status === "unauthenticated") {
    router.push("/")
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newPost = {
      slug: slugify("main title forever"),
      title: "",
      content: content,
      img: "/watch.png",
      catSlug: catSlug || "noticias",
      author: session?.data?.user.name,
      authorEmail: session?.data?.user.email,
      category: "notícias",
    }

    console.log(newPost)
    
    console.log("published")

    // const res = await fetch("/api/posts", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     title,
    //     desc: value,
    //     img: media,
    //     slug: slugify(title),
    //     catSlug: catSlug || "style", //If not selected, choose the general category
    //   }),
    // })

    // if (res.status === 200) {
    //   const data = await res.json()
    //   router.push(`/posts/${data.slug}`)
    // }
  }

  return (
    <div className={styles.container}>
      {/* choose the category */}
      <h2 className={styles.title}>Escolha uma categoria de sua postagem:</h2>
      <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)}>
        <option value="noticias">Notícias</option>
        <option value="viagens">Viagens</option>
        <option value="oficina">Oficína</option>
        <option value="dicas">Dicas</option>
        <option value="estilo">Estilo</option>
        <option value="outro">Outro</option>
      </select> 
      <form className="" onSubmit={handleSubmit}>
      {/* Add the title */}
      <h2 className={styles.title}>Escreve o título da postagem:</h2>
        <input
          type="text"
          placeholder="Título"
          className={styles.input}
          // onChange={(e) => setTitle(e.target.value)}
        />
        {erros.title && <p className={styles.error}>{erros.title}</p>}
        <h2 className={styles.title}>Adicione a imagem principal:</h2>
        {/* Add the URL of main image */}
        <input type="text" placeholder="URL da imágem" className={styles.input} />
        {erros.img && <p className={styles.error}>{erros.img}</p>}
        {/* Add the file of main image */}
        <input type="file" placeholder="file" className={styles.input} />
        {/* Add the content */}
        <h2 className={styles.title}>Conteúdo da postagem:</h2>
        {/* <ReactQuill
          value={content}
          onChange={setContent}
          className={styles.textEditor}
          placeholder="Escreva o conteúdo aqui..."
        /> */}
        {erros.content && <p className={styles.error}>{erros.content}</p>}

        <button className="button" onClick={handleSubmit}>
          Publicar
        </button>
      </form>

      
      
      
      {/* <h2>Conteúdo da postagem:</h2>
      <div className="post_content">
        <h3>Escolhe um elemento para adicionar a postagem:</h3>
        <div>
          <button className="button" onClick={handleClickAdd}>subtítulo</button>
          <button className="button" onClick={handleClickAdd}>parágrafo</button>
          <button className="button" onClick={handleClickAdd}>imagens adicionais</button>
          <button className="button" onClick={handleClickAdd}>Youtube Links</button>
        </div>
        <div>{content}</div>
      </div> */}

      {/* <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="" width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <button className={styles.addButton}>
              <label htmlFor="image">
                <Image src="/image.png" alt="" width={16} height={16} />
              </label>
            </button>
            <button className={styles.addButton}>
              <Image src="/external.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src="/video.png" alt="" width={16} height={16} />
            </button>
          </div>
        )}

      </div> */}
    </div>
  );
}

export default CriarPage

  

