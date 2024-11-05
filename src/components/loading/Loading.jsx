// import Spinner from './spinner.gif'
import styles from "./loading.module.css"

const Loading = () => {
  return (
    <div className={styles.loading-screen}>
      <div className={styles.loading-spinner}>

      </div>
      carregando....
       {/* <Image 
          className="scale-50 mx-auto"
          width={50}
          height={50}
          src='{Spinner}' 
          alt="loading"
        /> */}
    </div>
)}

export default Loading