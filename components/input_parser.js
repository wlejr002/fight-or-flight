



export const input_parser = (inputString) => {
    let parsed = inputString.split("joined the lobby")
    return parsed
}

export const input_parser_toString = (inputString) => {
    let parsed = inputString.split("joined the lobby")
    
    return parsed.join(" ")
}

