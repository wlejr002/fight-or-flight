import Link from "next/link";
import styles from "../styles/searchsection.module.css"
import { useRouter } from "next/router";

export default function SearchSection({ func,data }) {
  const router = useRouter()
  return (
    <div>
      {/* <input className = {styles.searchInput}
        type="text"
        placeholder="Enter Summoner Name"
        height="40"
        // clicking the button sets the value of the link (?)
        onChange = {(event) => func(event.target.value)}

        // pressing enter gets us there
        onKeyDown = {
          (event) => {
            if (event.key === "Enter") {
              router.push({
                pathname: data,
                query: { id:data },
              })
            }
          }
        }
      /> */}
      <textarea 
        className={styles.searchInput}
        id="this" 
        name="this" 
        rows="5" 
        cols="25">
        Paste champ select text
      </textarea>
      <Link
        href={{
          pathname: data,
          query: { id:data }
        }}
        >
        <button className = {styles.searchButton}>FIND ME!</button>
      </Link>
    </div>
  )
}