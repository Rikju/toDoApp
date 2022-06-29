/**
 * Načtení data z localstorage do proměnné tasks;
 * pokud je ls prázdný, tak do names uloží prázdné pole;
 * spuštění počítadla
 */

const tasks = getSavedTasks()
counter(tasks)

// vždy vypsané úkoly
if (tasks.length === 0){
    let paragraph = document.createElement("p")
    paragraph.textContent = "Databáze úkolů je prázdná. Vážně nemáš co na práci?"
    document.querySelector(".custom-heading").appendChild(paragraph)
}

for (let i = 0; i < 10 && i < tasks.length; i++){
    const oneTaskHTML = generateHTMLStructure(tasks[i])
    document.querySelector(".to-do-list-one").appendChild(oneTaskHTML)
}

for (let j = 10; j < 20 && j < tasks.length; j++){
    const oneTaskHTML = generateHTMLStructure(tasks[j])
    document.querySelector(".to-do-list-two").appendChild(oneTaskHTML)
}

for (let k = 20; k < 30 && k < tasks.length; k++){
    const oneTaskHTML = generateHTMLStructure(tasks[k])
    document.querySelector(".to-do-list-three").appendChild(oneTaskHTML)
}

/**
 * Odeslání formuláře do ls pomocí proměnné tasks
 */

let myForm = document.querySelector("#task-form")
let myCheckbox = document.querySelector("#true-false")
myForm.addEventListener("submit", function (event){

    if (tasks.length > 29){
        alert("Dosáhl jsi maximálního počtu úkolů. Začni je plnit!")
    } else {
        event.preventDefault()

        tasks.push({
            id: uuidv4(),
            task: event.target.elements.insertTask.value,
            note: event.target.elements.noteForTask.value || "neuvedena",
            completion: myCheckbox.checked
        })

        document.querySelector(".to-do-list-one").innerHTML = ""
        document.querySelector(".to-do-list-two").innerHTML = ""
        document.querySelector(".to-do-list-three").innerHTML = ""

        for (let l = 0; l < 10 && l < tasks.length; l++){
            const oneTaskHTML = generateHTMLStructure(tasks[l])
            document.querySelector(".to-do-list-one").appendChild(oneTaskHTML)
        }

        for (let m = 10; m < 20 && m < tasks.length; m++){
            const oneTaskHTML = generateHTMLStructure(tasks[m])
            document.querySelector(".to-do-list-two").appendChild(oneTaskHTML)
        }

        for (let n = 20; n < 30 && n < tasks.length; n++){
            const oneTaskHTML = generateHTMLStructure(tasks[n])
            document.querySelector(".to-do-list-three").appendChild(oneTaskHTML)
        }

        counter(tasks)
        event.target.elements.insertTask.value = ""
        event.target.elements.noteForTask.value = ""
        saveTasks(tasks)
    }
})

/**
 * Filtrování ve vyhledávání
 */

let filter = document.querySelector("#find-task")
filter.addEventListener("input", function (event){
    let weSearch = event.target.value
    let ourResult = tasks.filter(function (oneTask){
        return oneTask.task.toLowerCase().includes(weSearch.toLowerCase())
    })

    document.querySelector(".filtered-tasks-one").innerHTML = ""
    document.querySelector(".filtered-tasks-two").innerHTML = ""
    document.querySelector(".filtered-tasks-three").innerHTML = ""
    document.querySelector(".custom-heading").innerHTML = ""

    if(!weSearch){

        for (let r = 0; r < 10 && r < tasks.length; r++){
            const oneTaskHTML = generateHTMLStructure(tasks[r])
            document.querySelector(".to-do-list-one").appendChild(oneTaskHTML)
        }

        for (let s = 10; s < 20 && s < tasks.length; s++){
            const oneTaskHTML = generateHTMLStructure(tasks[s])
            document.querySelector(".to-do-list-two").appendChild(oneTaskHTML)
        }

        for (let t = 20; t < 30 && t < tasks.length; t++){
            const oneTaskHTML = generateHTMLStructure(tasks[t])
            document.querySelector(".to-do-list-three").appendChild(oneTaskHTML)
        }

    } else {

        document.querySelector(".to-do-list-one").innerHTML = ""
        document.querySelector(".to-do-list-two").innerHTML = ""
        document.querySelector(".to-do-list-three").innerHTML = ""

        let heading = document.createElement("h3")
        heading.textContent = "Vyhledané úkoly"
        document.querySelector(".custom-heading").appendChild(heading)

        for (let o = 0; o < 10 && o < ourResult.length; o++){
            const paragraph = generateHTMLStructure(ourResult[o])
            document.querySelector(".filtered-tasks-one").appendChild(paragraph)
        }

        for (let p = 10; p < 20 && p < ourResult.length; p++){
            const paragraph = generateHTMLStructure(ourResult[p])
            document.querySelector(".filtered-tasks-two").appendChild(paragraph)
        }

        for (let q = 20; q < 30 && q < ourResult.length; q++){
            const paragraph = generateHTMLStructure(ourResult[q])
            document.querySelector(".filtered-tasks-three").appendChild(paragraph)
        }
    }
})






