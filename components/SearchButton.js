import Link from "next/link";

export default function SearchButton({ data }) {
  return (
    <div>
      <Link
        href={{
          pathname: data,
          query: { id:data }
        }}
      >
        <button>FIND ME !</button>
      </Link>
    </div>
  )
}