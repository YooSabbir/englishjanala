const createElements = (arr) => {
    const htmlElements = arr.map(el => `<span class="btn btn-info">${el}</span>`)
    return htmlElements.join(" ")
}

const manageSpiner = (status) => {
    if (status === true) {
        document.getElementById("spiner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    } else {
        document.getElementById("spiner").classList.add("hidden");
        document.getElementById("word-container").classList.remove("hidden");
    }
}

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then((json) => displayLesson(json.data))
}

const loadLevelWord = (id) => {
    manageSpiner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    //
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive(); //remove class
            const clickedBtn = document.getElementById(`lesson-btn-${id}`)
            clickedBtn.classList.add("active")
            displayLevelWord(data.data)
        })
}

const removeActive = () => {
    const lessonsBtn = document.querySelectorAll(".lesson-btn")
    lessonsBtn.forEach(btn => btn.classList.remove("active"))
}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url);
    const details = await res.json()
    displayWordDetails(details.data)
}

const displayWordDetails = (word) => {
    console.log(word)
    const detailsBox = document.getElementById("details-container")
    detailsBox.innerHTML = `
                <div class="">
                    <h2 class="text-2xl font-bold">${word.word}(<i class="fa-solid fa-microphone-lines"></i>: ${word.pronunciation})</h2>
                </div>
                <div class="font-bold">
                    <h2 class="font-bold">Meaning</h2>
                    <p class="">${word.meaning}</p>
                </div>
                <div class="font-bold">
                    <h2 class="font-bold">Examplle</h2>
                    <p class="">${word.sentence}</p>
                </div>
                <div class="font-bold">
                    <h2 class="font-bold pb-2">Synonyms</h2>
                    <div class="flex gap-3">${createElements(word.synonyms)}</div>
                </div>
    `
    document.getElementById("word_modal").showModal();
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container")
    wordContainer.innerHTML = ''

    if (words.length == 0) {
        wordContainer.innerHTML = `
       <div class="text-center col-span-full rounded-xl py-10 space-y-6">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="font-bangla text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bangla font-bold text-4xl">নেক্সট Lesson এ যান</h2>
        </div>
       `
        manageSpiner(false);
        return;
    }

    words.forEach(word => {
        const card = document.createElement("div")
        card.innerHTML = `
       <div class="bg-white rounded-xl shadow-sm text-center py-7 px-2 space-y-3 w-full">
        <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায় নি"}</h2>
        <p class="font-semibold">Meaning / Pronounciation</p>
        <div class="font-medium text-2xl font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায় নি"}" / "${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায় নি"}"</div>
        <div class="flex justify-between items-center">
            <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF12] hover:bg-[#1A91FF60]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1A91FF12] hover:bg-[#1A91FF60]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
     </div>   
       `
        wordContainer.append(card)
    });
    manageSpiner(false);
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
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" href="" class="btn btn-soft btn-primary lesson-btn">
        <i class="fa-solid fa-circle-question"></i>Lesson - ${lesson.level_no}</button>
        `
        // 4. append element
        levelContainer.append(btnDiv)
    }
}
loadLessons()

document.getElementById("btn-search").addEventListener("click", () => {
    removeActive()
    const input = document.getElementById("input-search")
    const searchValue = input.value.trim().toLowerCase();

    fetch("https://openapi.programming-hero.com/api/words/all")
        .then(res => res.json())
        .then(data => {
            const allWords = data.data;

            const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue))
            displayLevelWord(filterWords)
        })
})