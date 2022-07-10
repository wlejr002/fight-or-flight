import Link from "next/link";
import styles from "../styles/SearchSection.module.css"
import { useRouter } from "next/router";
import { input_parser, input_parser_toString } from "./input_parser";

export default function SearchSection({ func,data }) {
  const router = useRouter()
  const route_to = {
          pathname: input_parser(data),
          query: { id: input_parser(data) }
        }
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
        className={styles.searchTextArea}
        id="champ-select text input" 
        name="champ-select text input" 
        placeholder="Paste champ select text"
        rows="5" 
        cols="30"

        // clicking the button sets the value of the link (?)
        onChange = {(event) => func(event.target.value)}

        // pressing enter gets us there
        onKeyDown = {
          (event) => {
            if (event.key === "Enter") {
              router.push(route_to)
            }
          }
        }
      >
      </textarea>
      <Link
        href={route_to}
        >
        <button className = {styles.searchButton}>Search</button>
      </Link>
    </div>
  )
}