export default function SearchInput({ func }) {

  return (
    <div>
      <input
        type="text"
        size= "40"
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
    </div>
  )
}
