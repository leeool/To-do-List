const formAddToDo = document.querySelector(".form-add-todo")
const formSearch = document.querySelector(".form-search input")
const toDosContainer = document.querySelector(".todos-container")

formAddToDo.addEventListener("submit", event => {
  event.preventDefault()
  const inputValue = event.target.add.value.trim()

  if (/^\s*$/.test(inputValue)) {
    return
  }
  toDosContainer.innerHTML += `
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${inputValue}</span>
    <i class="far fa-trash-alt delete"></i>
  </li>
  `
  event.target.reset()
})

toDosContainer.addEventListener("click", event => {
  const clickedElement = event.target
  const arrayClassesList = Array.from(clickedElement.classList)

  arrayClassesList.includes("delete")
    ? clickedElement.parentElement.remove()
    : null

})

const removeAndAddClasses = (element, remove, add) => {
  element.classList.remove(remove)
  element.classList.add(add)
}

formSearch.addEventListener("input", event => {
  const inputValue = event.target.value.trim().toLowerCase()
  const arrayOfChildrenElements = Array.from(toDosContainer.children)

  arrayOfChildrenElements
    .filter(toDo => !toDo.textContent.toLowerCase().includes(inputValue))
    .forEach(element => removeAndAddClasses(element, "d-flex", "d-none"))

  arrayOfChildrenElements
    .filter(toDo => toDo.textContent.toLowerCase().includes(inputValue))
    .forEach(element => removeAndAddClasses(element, "d-none", "d-flex"))
})

