const createElement=(arr)=>{
    const htmlElements = arr.map(el=> `<span>${el}</span>`)
    console.log(htmlElements.join(""))
}

const synonyms = ["hello", "hi", "nothing"]
createElement(synonyms)