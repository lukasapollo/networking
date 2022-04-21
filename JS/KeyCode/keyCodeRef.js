let NumberAlfa = ["a","A","1","b","c","2","C","d","3","D","f","4","F","g","5","G","h","6","H","i","7","j","J","8","k","K","9","l","L", "o", "P", "Q", "R", "S", "T", "u", "V", "x", "Z"]
    
function NumberKey(){
    let n = Math.floor(Math.random() * NumberAlfa.length)
    return n
}

export function keyCodeRef(qtd){
    let a = "GET"

    NumberAlfa.forEach((el, i) => {
        if(i < qtd){
            a += NumberAlfa[NumberKey()]
        }
    })
    return a
}
