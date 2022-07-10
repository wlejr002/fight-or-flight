



export const input_parser = (inputString) => {
    let parsed = inputString.split("joined the lobby")
    let out = ""
    for(let i = 0 ; i < parsed.length-1; i ++){
        if(parsed[i].length >1){
            out += parsed[i] + ","
        }
        
    }
    console.log("out is", out)
    return out
}

export const input_parser_toString = (inputString) => {
    let parsed = inputString.split("joined the lobby")
    
    return parsed.join(" ")
}

