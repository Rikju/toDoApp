/**
 * Načtení data z localstorage do proměnné tasks;
 * pokud je ls prázdný, tak do names uloží prázdné pole;
 * spuštění počítadla
 */

const tasks = getSavedTasks()
counter(tasks)

// vždy vypsané úkoly

toListAgain()

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
    document.querySelector(".filtered-heading").innerHTML = ""

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
        document.querySelector(".filtered-heading").innerHTML = ""
        let heading = document.createElement("h3")
        heading.textContent = "Vyhledané úkoly"
        document.querySelector(".filtered-heading").appendChild(heading)

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

/**
 * Filtrování na splněné nebo nesplněné úkoly
 */

const filterTrue = document.querySelector(".filter-true")
const filterFalse = document.querySelector(".filter-false")

filterTrue.addEventListener("click",function (event){
    let weCheck = event.target.checked

    if (weCheck === true){
        let resultCheckTrue = tasks.filter(function (checkTask){
            return checkTask.completion
        })

        document.querySelector(".to-do-list-one").innerHTML = ""
        document.querySelector(".to-do-list-two").innerHTML = ""
        document.querySelector(".to-do-list-three").innerHTML = ""

        for (let u = 0; u < 10 && u < resultCheckTrue.length; u++){
            const oneTaskHTML = generateHTMLStructure(resultCheckTrue[u])
            document.querySelector(".to-do-list-one").appendChild(oneTaskHTML)
        }
        for (let v = 10; v < 20 && v < resultCheckTrue.length; v++){
            const oneTaskHTML = generateHTMLStructure(resultCheckTrue[v])
            document.querySelector(".to-do-list-two").appendChild(oneTaskHTML)
        }

        for (let w = 20; w < 30 && w < resultCheckTrue.length; w++) {
            const oneTaskHTML = generateHTMLStructure(resultCheckTrue[w])
            document.querySelector(".to-do-list-three").appendChild(oneTaskHTML)
        }

    } else {
        toListAgain()
    }
})

filterFalse.addEventListener("click",function (event){
    let testCheck = event.target.checked
    if (testCheck === true){
        let resultCheckFalse = tasks.filter(function (checkTask){
            return !checkTask.completion
        })

        document.querySelector(".to-do-list-one").innerHTML = ""
        document.querySelector(".to-do-list-two").innerHTML = ""
        document.querySelector(".to-do-list-three").innerHTML = ""

        for (let u = 0; u < 10 && u < resultCheckFalse.length; u++){
            const oneTaskHTML = generateHTMLStructure(resultCheckFalse[u])
            document.querySelector(".to-do-list-one").appendChild(oneTaskHTML)
        }
        for (let v = 10; v < 20 && v < resultCheckFalse.length; v++){
            const oneTaskHTML = generateHTMLStructure(resultCheckFalse[v])
            document.querySelector(".to-do-list-two").appendChild(oneTaskHTML)
        }

        for (let w = 20; w < 30 && w < resultCheckFalse.length; w++) {
            const oneTaskHTML = generateHTMLStructure(resultCheckFalse[w])
            document.querySelector(".to-do-list-three").appendChild(oneTaskHTML)
        }

    } else {
        toListAgain()
    }
})

const filterAll = document.querySelector("#filter-all")
filterAll.addEventListener("click",function (event){
    toListAgain()
})







