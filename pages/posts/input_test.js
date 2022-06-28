import {useState} from "react";
// import {Input, Button} from "@nextui-org/react"
// import { useRouter } from 'next/router'
import SearchSection from "../../components/searchsection"
import styles from "../../styles/searchsection.module.css"
// import SearchButton from "../../components/searchbutton";
// import SearchInput from "../../components/searchinput";

function input_test() {
    const [data, setData] = useState('')
    const ROUTE_POST_ID = "[id]";
    function handleClick() {
        console.log(textInput.current.value);
    }

    function onSave(temp){
        console.log(temp, data)
    }

    return (
        <div className = {styles.searchContainer}>
            { /*<input
                type="text"
                placeholder="Enter new name"
                onChange={(e) => setData(e.target.value)}
            /> */}
            <h1 className = {styles.dodgeHeader}>Should I dodge?</h1>
            <SearchSection func = {setData} data = {data} />
            {/* {<button  onClick={() => onSave(data)}>Save</button>} */}
        </div>
    );
}

export default input_test