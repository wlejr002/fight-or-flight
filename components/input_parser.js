



export const input_parser = (inputString) => {
    let parsed = inputString.split("joined the lobby")
    let out = ""
    for(let i = 0 ; i < parsed.length; i ++){
        if(parsed[i] != ""){
            out += parsed[i] +","
        }
        
    }
    console.log("out is", out)
    return out
}

export const input_parser_toString = (inputString) => {
    let parsed = inputString.split("joined the lobby")
    
    return parsed.join(" ")
}

