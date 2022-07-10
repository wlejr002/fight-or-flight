import Link from "next/link";
import styles from "../styles/searchsection.module.css"
import { useRouter } from "next/router";
import { input_parser, input_parser_toString } from "./input_parser";

export default function SearchSection({ func,data }) {
  const router = useRouter()
  return (
    <div>
      <input className = {styles.searchInput}
        type="text"
        placeholder="Enter Summoner Name"
        // clicking the button sets the value of the link (?)
        onChange = {(event) => func(event.target.value)}

        // pressing enter gets us there
        onKeyDown = {
          (event) => {
            if (event.key === "Enter") {
              router.push({
                pathname: input_parser_toString(data),
                query: {id:input_parser(data) },
              })
            }
          }
        }
      />
      <Link
        href={{
          pathname: input_parser_toString(data),
          query: { id: input_parser(data) }
        }}
        >
        <button className = {styles.searchButton}>FIND ME!</button>
      </Link>
    </div>
  )
}