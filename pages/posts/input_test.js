import {useState} from "react"
import {Input, Button} from "@nextui-org/react"
import { useRouter } from 'next/router'
import Link from "next/link";

function input_test() {
    const [data, setData] = useState('')
    const ROUTE_POST_ID = "[id]";
    function handleClick() {
        console.log(textInput.current.value);
    }

    function onSave(temp){



        console.log(temp, data)
        
    }

    const posts = [
        {
          id: 1,
          title: "Post #1"
        },
        {
          id: 2,
          title: "Post #2"
        }
      ];
   



    return (
        <div>

            <input
                type="text"
                placeholder="Enter new name"
                onChange={(e) => setData(e.target.value)}
            />
            
            
            <Link
              href={{
                pathname: data,
                query: { id:data }
              }}
            >
              <a>FIND ME !</a>
            </Link>
         
            <button  onClick={() => onSave(data)}>Save</button>
        </div>

    );

    
}


export default input_test