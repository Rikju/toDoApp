/**
 * Funkce načítající data z localstorage;
 * Ošetří, pokud data v localStorage nejsou
 */

const getSavedTasks = function (){
    const myTasks = localStorage.getItem("tasks")

    if (myTasks !== null){
        return JSON.parse(myTasks)
    } else {
        return []
    }
}

/**
 * Funkce pro použití při odeslání formuláře;
 * Ukládá do localstorage úkol z formuláře
 */

const saveTasks = function (oneTask){
    localStorage.setItem("tasks", JSON.stringify(oneTask))
}

/**
 * Generování HTML struktury, kterou umístíme do stránky po kliknutí
 * na tlačítko "Vypiš" + použijeme ji také pro vypsání nových informací z ls,
 * když nějaké jméno vymažeme pomocí tlačítka "Vymazat"
 */


const generateHTMLStructure = function (oneTask){
    const container = document.createElement("div")
    container.classList.add("html-structure")
    const checkboxTaskNoteDiv = document.createElement("div")
    const deleteEditButtonDiv = document.createElement("div")
    const taskSpan = document.createElement("span")
    const noteSpan = document.createElement("span")
    const firstDeleteButton = document.createElement("button")
    firstDeleteButton.classList.add("first-delete-button")
    firstDeleteButton.classList.add("first-delete-button-visibility")
    const deleteButton = document.createElement("button")
    deleteButton.classList.add("delete-button")
    const editLinkButton = document.createElement("a")
    editLinkButton.classList.add("edit-link-button")

    document.querySelector(".custom-heading").innerHTML = ""
    clearTaskInput()

    //nastavení editovacího tlačítka
    editLinkButton.textContent = "Editovat"
    deleteEditButtonDiv.appendChild(editLinkButton)
    editLinkButton.setAttribute("href",`static/edit.html#${oneTask.id}`)

    //nastavení mazacího tlačítka
    firstDeleteButton.textContent = "Vymazat"
    deleteEditButtonDiv.appendChild(firstDeleteButton)

    firstDeleteButton.addEventListener("click", function(){

        firstDeleteButton.style.display = "none"
        deleteButton.textContent = "Potvrď"
        deleteEditButtonDiv.appendChild(deleteButton)

        deleteButton.addEventListener("click",function (){
            removeTask(tasks, oneTask.id)
            saveTasks(tasks)
            toListAgain()
            if (tasks.length === 0){
                let paragraph = document.createElement("p")
                paragraph.textContent = "Žádný úkol. Vážně nemáš co na práci?"
                document.querySelector(".custom-heading").appendChild(paragraph)
            }
            counter(tasks)
        })
    })

    // vytvoří clon checkboxu a přidá k jednotlivým úkolům
    const node = document.getElementById("true-false");
    const clone = node.cloneNode(true);
    clone.addEventListener("click",function (){
        if (clone.checked){
            oneTask.completion = true
            taskSpan.style.color = "green"
            saveTasks(tasks)
            counter(tasks)
        } else {
            oneTask.completion = false
            taskSpan.style.color = "red"
            saveTasks(tasks)
            counter(tasks)
        }
    })
    if (!oneTask.completion){
        taskSpan.style.color = "red"
        clone.checked = false
        counter(tasks)
    } else {
        taskSpan.style.color = "green"
        clone.checked = true
        counter(tasks)
    }

    checkboxTaskNoteDiv.appendChild(clone)

    // výpis názvu úkolu a jeho index
    let orderTask = numberForTask(tasks, oneTask.id)
    taskSpan.textContent = `${orderTask + 1}. ${oneTask.task} `
    checkboxTaskNoteDiv.appendChild(taskSpan)

    //výpis poznámky k úkolu
    noteSpan.textContent = `pozn.: ${oneTask.note}`
    noteSpan.classList.add("note-for-task")
    checkboxTaskNoteDiv.appendChild(noteSpan)

    container.appendChild(deleteEditButtonDiv)
    container.appendChild(checkboxTaskNoteDiv)

    return container
}

/**
 * Podle ID najdeme index daného úkolu;
 * pomocí splice ho odstraníme
 */

const removeTask = function (ourTasks, id){
    const index = ourTasks.findIndex(function (taskWantToCheck){
        return taskWantToCheck.id === id
    })
        if (index > -1){
            tasks.splice(index, 1)
        }
}

/**
 * Podle ID najdeme index daného úkolu;
 * ID uložíme a použíjeme pro číslování seznamu úkolů
 */

const numberForTask = function (ourTasks, id){
    return ourTasks.findIndex(function (taskWantToCheck){
        return taskWantToCheck.id === id
    })
}

/**
 * Pokud smažeme z ls nějaký úkol, tak tato funkce zabezpečí
 * opětovné vypsání ls (již bez smazeného jména)
 */

const toListAgain = function (){
    document.querySelector(".to-do-list-one").innerHTML = ""
    document.querySelector(".to-do-list-two").innerHTML = ""
    document.querySelector(".to-do-list-three").innerHTML = ""
    let newData = getSavedTasks()
        for (let i = 0; i < 10 && i < newData.length; i++){
            const oneTaskHTML = generateHTMLStructure(newData[i])
            document.querySelector(".to-do-list-one").appendChild(oneTaskHTML)
        }

        for (let j = 10; j < 20 && j < newData.length; j++){
            const oneTaskHTML = generateHTMLStructure(newData[j])
            document.querySelector(".to-do-list-two").appendChild(oneTaskHTML)
        }

        for (let k = 20; k < 30 && k < newData.length; k++){
            const oneTaskHTML = generateHTMLStructure(newData[k])
            document.querySelector(".to-do-list-three").appendChild(oneTaskHTML)
        }
    }

/**
 * Spočítáme počet neudělaných úkolů;
 * uvedeme celkový počet úkolů
 */

const counter = function (tasksList){
    document.querySelector(".summary").innerHTML = ""
    let leftTask = tasksList.filter(function (oneTask){
        return !oneTask.completion
    })

    if (leftTask.length === 0){
        let paragraph = document.createElement("p")
        paragraph.textContent = `Zbývá: ${leftTask.length} úkolů (celkový počet: ${tasks.length} / max.: 30)`
        paragraph.classList.add("summary-center")
        document.querySelector(".summary").appendChild(paragraph)
    } else if (leftTask.length === 1){
        let paragraph = document.createElement("p")
        paragraph.textContent = `Zbývá: ${leftTask.length} úkol (celkový počet: ${tasks.length} / max.: 30)`
        paragraph.classList.add("summary-center")
        document.querySelector(".summary").appendChild(paragraph)
    } else if (leftTask.length > 1 && leftTask.length < 5){
        let paragraph = document.createElement("p")
        paragraph.textContent = `Zbývá: ${leftTask.length} úkoly (celkový počet: ${tasks.length} / max.: 30)`
        paragraph.classList.add("summary-center")
        document.querySelector(".summary").appendChild(paragraph)
    } else {
        let paragraph = document.createElement("p")
        paragraph.textContent = `Zbývá: ${leftTask.length} úkolů (celkový počet: ${tasks.length} / max.: 30)`
        paragraph.classList.add("summary-center")
        document.querySelector(".summary").appendChild(paragraph)
    }
}

/**
 * Funkce na vymazání vyhledávacího pole poté, co klineme na tlačítko "Uložit"
 */

const clearTaskInput = function (){
    const btn = document.querySelector(".btn");
    btn.addEventListener('click', function handleClick() {

        const inputs = document.querySelectorAll('.insertTask, #find-task')

        inputs.forEach(input => {
            input.value = ''
            document.querySelector(".filtered-tasks-one").innerHTML = ""
            document.querySelector(".filtered-tasks-two").innerHTML = ""
            document.querySelector(".filtered-tasks-three").innerHTML = ""
            document.querySelector(".custom-heading").innerHTML = ""
        })
    })
}


