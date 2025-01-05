'use client'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import styles from './managePostButtons.module.css'

const ManagePostButtons = ({author, slug}) => {

  const {data} = useSession()
  const router = useRouter()

  const postDelete = async () => {

    const userConfirm = confirm("Está seguro que quer deletar este Post?")
    if (userConfirm) {
      try {
        const res = await fetch(`/api/posts/${postId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
        },
        });
        if (res.ok) {
            alert("O post foi deletado com sucesso")
            await router.push("/")
            router.refresh();
          } else {
            alert("Erro ao deletar o post.");
          }
      } catch (err) {
        console.log(err);
        alert("Erro do lado de servidor.");
      } 
    }
  }

  //access to manage the post only for its author or Admin
  if (author === data?.user?.name || data?.user?.isAdmin === true) {
    return (
      <div className={styles.buttonContainer}>
        <button 
          className="button" 
          // onClick={() => router.push(`/${postId}/edit`)}
        >
            Editar
        </button>
        <button 
          className="button"
          // onClick={postDelete}
        >
          Deletar
        </button>
      </div>
    )
  }  
}

export default ManagePostButtons