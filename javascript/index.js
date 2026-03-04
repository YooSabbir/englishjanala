const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then((json) => displayLesson(json.data))
}

const loadLevelWord=(id)=>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`
        console.log(url)
        fetch(url)
        .then(res=>res.json())
        .then(data=>displayLevelWord(data.data) )
}

const displayLevelWord =(words)=>{
    const wordContainer= document.getElementById("word-container")
    wordContainer.innerHTML=''

        // "id": 5,
        //     "level": 1,
        //     "word": "Eager",
        //     "meaning": "আগ্রহী",
        //     "pronunciation": "ইগার"
        // },

    words.forEach(word => {
       const card = document.createElement("div")
       card.innerHTML=`
       <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-3">
        <h2 class="font-bold text-2xl">${word.word}</h2>
        <p class="font-semibold">Meaning / Pronounciation</p>
        <div class="font-medium text-2xl font-bangla">"${word.meaning}" / "${word.pronounciation}"</div>
        <div class="flex justify-between items-center">
            <button class="btn bg-[#1A91FF12] hover:bg-[#1A91FF60]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1A91FF12] hover:bg-[#1A91FF60]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
     </div>   
       `
       wordContainer.append(card)
    });
}

const displayLesson = (lessons) => {
    // 1. get the container & empty
    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML = ''
    // 2. get into every lessons
    for (let lesson of lessons) {
        // 3. create Element
        // console.log(lesson)
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" href="" class="btn btn-soft btn-primary">
        <i class="fa-solid fa-circle-question"></i>Lesson - ${lesson.level_no}</button>
        `
        // 4. append element
        levelContainer.append(btnDiv)
    }
}
loadLessons()