import Link from "next/link";
import styles from "../styles/searchsection.module.css"
export default function SearchSection({ func,data }) {
  return (
    <div>
      <input className = {styles.searchInput}
        type="text"
        placeholder="Enter Summoner Name"
        onChange = {(event) => func(event.target.value)}
        onKeyDown = {
          (event) => {
            if (event.key === "Enter") {
              alert(event.target.value)
            }
          }
        }
      />
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