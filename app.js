const formAddToDo = document.querySelector(".form-add-todo")
const formSearch = document.querySelector(".form-search input")
const toDosContainer = document.querySelector(".todos-container")

const addToDo = inputValue => {
  if (/^\s*$/.test(inputValue)) {
    return
  }
  toDosContainer.innerHTML += `
  <li class="list-group-item d-flex justify-content-between align-items-center" data-todo="${inputValue}">
    <span>${inputValue}</span>
    <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
  </li>
  `
  event.target.reset()
}

formAddToDo.addEventListener("submit", event => {
  event.preventDefault()
  const inputValue = event.target.add.value.trim()

  addToDo(inputValue)
})

const removeToDo = clickedElement => {
  const trashDataValue = clickedElement.dataset.trash
  const toDo = document.querySelector(`[data-todo="${clickedElement.dataset.trash}"]`)
  trashDataValue ? toDo.remove() : null
}

toDosContainer.addEventListener("click", event => {
  const clickedElement = event.target
  removeToDo(clickedElement)
})

const manipulateClasses = (element, classToRemove, classToAdd) => {
  element.classList.remove(classToRemove)
  element.classList.add(classToAdd)
}

const hideToDos = (inputValue, arrayOfChildrenElements) => {
  arrayOfChildrenElements
  .filter(toDo => !toDo.textContent.toLowerCase().includes(inputValue))
  .forEach(element => manipulateClasses(element, "d-flex", "d-none"))
}

const showToDos = (inputValue, arrayOfChildrenElements) => {
  arrayOfChildrenElements
  .filter(toDo => toDo.textContent.toLowerCase().includes(inputValue))
  .forEach(element => manipulateClasses(element, "d-none", "d-flex"))
}

formSearch.addEventListener("input", event => {
  const inputValue = event.target.value.trim().toLowerCase()
  const arrayOfChildrenElements = Array.from(toDosContainer.children)

  hideToDos(inputValue, arrayOfChildrenElements)
  showToDos(inputValue, arrayOfChildrenElements)

})

