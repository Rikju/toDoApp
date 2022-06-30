// načteme si id uživatele a odmažeme hash
const nameID = location.hash.substring(1)

// načteme si pole objektů tasks
let tasks = getSavedTasks()

//spáruji id z url adresy s id úkolu v tasks
let searchedObject = tasks.find(function (oneObject){
    return oneObject.id === nameID
})

// pokud je v url špatné id, vrátí nás to zpět do index.html
if (searchedObject === undefined){
    location.assign("../index.html")
}

// načteme do inputů název úkolu a poznámku
document.querySelector("#edited-task").value = searchedObject.task
document.querySelector("#edited-note").value = searchedObject.note

// po kliknutí na "Aktualizovat" aktualizujeme obsah objektu v localstorage
let changingForm = document.querySelector("#changing-form")
changingForm.addEventListener("submit", function (event){
    event.preventDefault()

    searchedObject.task = event.target.elements.changingTask.value
    searchedObject.note = event.target.elements.changingNote.value

    saveTasks(tasks)
    location.assign("../index.html")
})