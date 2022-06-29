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
    const newDiv = document.createElement("div")
    const newSpan = document.createElement("span")
    const newButton = document.createElement("button")

    document.querySelector(".custom-heading").innerHTML = ""

    clearTaskInput()

    //nastavení mazacího tlačítka
    newButton.textContent = "Vymazat"
    newDiv.appendChild(newButton)

    newButton.addEventListener("click",function (){
       removeTask(tasks, oneTask.id)
       saveTasks(tasks)
       toListAgain()
        if (tasks.length === 0){
            let paragraph = document.createElement("p")
            paragraph.textContent = "Databáze úkolů je prázdná. Vážně nemáš co na práci?"
            document.querySelector(".custom-heading").appendChild(paragraph)
        }
       counter(tasks)
    })

    let orderTask = numberForTask(tasks, oneTask.id)
    newSpan.textContent = `${orderTask + 1}. ${oneTask.task}`
    newDiv.appendChild(newSpan)

    // vytvoří clon checkboxu a přidá k jednotlivým úkolům
    const node = document.getElementById("true-false");
    const clone = node.cloneNode(true);
    clone.addEventListener("click",function (){
        if (clone.checked){
            oneTask.completion = true
            newSpan.style.color = "green"
            saveTasks(tasks)
            counter(tasks)
        } else {
            oneTask.completion = false
            newSpan.style.color = "red"
            saveTasks(tasks)
            counter(tasks)
        }
    })
   if (!oneTask.completion){
        newSpan.style.color = "red"
        clone.checked = false
       counter(tasks)
    } else {
        newSpan.style.color = "green"
        clone.checked = true
       counter(tasks)
    }

    newSpan.appendChild(clone)

    return newDiv
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
        paragraph.textContent = `Zbývá: ${leftTask.length} úkolů (celkový počet: ${tasks.length} / max.: 30 úkolů)`
        document.querySelector(".summary").appendChild(paragraph)
    } else if (leftTask.length === 1){
        let paragraph = document.createElement("p")
        paragraph.textContent = `Zbývá: ${leftTask.length} úkol (celkový počet: ${tasks.length} / max.: 30 úkolů)`
        document.querySelector(".summary").appendChild(paragraph)
    } else if (leftTask.length > 1 && leftTask.length < 5){
        let paragraph = document.createElement("p")
        paragraph.textContent = `Zbývá: ${leftTask.length} úkoly (celkový počet: ${tasks.length} / max.: 30 úkolů)`
        document.querySelector(".summary").appendChild(paragraph)
    } else {
        let paragraph = document.createElement("p")
        paragraph.textContent = `Zbývá: ${leftTask.length} úkolů (celkový počet: ${tasks.length} / max.: 30 úkolů)`
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


