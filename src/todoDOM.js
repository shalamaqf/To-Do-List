// Import
import { createTodo } from './todoManager.js';
import {} from './project.js';

// Create a function to render \todo DOM elements
export function renderTodo(todo) {
    const todoListContainer = document.getElementById('todoList-container');
    const todoContainer = document.createElement('div');
    const todoTitle = document.createElement('p');
    const todoDueDate = document.createElement('p');
    const todoPriority = document.createElement('p');
    const todoCompleted = document.createElement('p');

    todoContainer.className = 'todo-container';
    todoTitle.className = 'todo todo-title';
    todoDueDate.className = 'todo todo-dueDate';
    todoPriority.className = 'todo todo-priority';
    todoCompleted.className = 'todo todo-completed';

    todoTitle.textContent = todo.title;
    todoDueDate.textContent = todo.dueDate;
    todoPriority.textContent = todo.priority;
    todoCompleted.textContent = todo.isComplete ? '✔' : '✖';

    todoContainer.appendChild(todoTitle);
    todoContainer.appendChild(todoDueDate);
    todoContainer.appendChild(todoPriority);
    todoContainer.appendChild(todoCompleted);
    todoListContainer.appendChild(todoContainer);

    return todoContainer;

}

// Create a function to render the todo's details
export function renderTodoDetails(todo, todoContainer) {
    const todoDesc = document.createElement('p');
    const todoNote = document.createElement('p');
    const todoProject = document.createElement('p');

    todoDesc.className = 'todo todo-desc';
    todoNote.className = 'todo todo-note';
    todoProject.className = 'todo todo-project';

    todoDesc.textContent = 'Description: ' + todo.desc;
    todoNote.textContent = 'Note: ' + todo.note;
    todoProject.textContent = 'Project: ' + todo.project.title;

    todoContainer.appendChild(todoDesc);
    todoContainer.appendChild(todoNote);
    todoContainer.appendChild(todoProject);

    return todoContainer;
    
}

// Create a function to show the todo modal
function showModal() {
    const modalContainer = document.querySelector('.todo.modal-container');
    modalContainer.classList.add('show');
}

// Create a funtion to hide the todo modal
function hideModal() {
    const modalContainer = document.querySelector('.todo.modal-container');
    modalContainer.classList.remove('show');
}

// Create a function to clear the values
function clearValues() {
    const formModal = document.getElementById('todo-form-modal');
    const inputs = formModal.querySelectorAll('input');
    if (inputs) {
        inputs.forEach(input => {
            input.value = "";
        });
    }
}

// Create a function to add a todo in to spesific project
function addTodo(form, project) {
    const title = document.getElementById('todo-title').value;
    const dueDate = document.getElementById('dueDate').value;
    const desc = document.getElementById('desc').value;
    const priority = form.dataset.priority;
    const note = document.getElementById('note').value;
    const completed = document.getElementById('checklist').checked;
    const inputProject = document.getElementById('project').value;

    // Set the input as the todo's properties
    const todo = createTodo(title, dueDate, project);
    todo.setDesc = desc;
    todo.setPriority = priority;
    todo.setNote = note;
    todo.isComplete = completed;
    todo.setProject = inputProject;

    // Push the todo to project's toDoList array
    project.addToDo(todo);
    
    // Render the todo
    renderTodo(todo);
}

// Create a function to select the priority button
function selectedPriority(form) {
    // Select the buttons
    const flexibleButton = form.querySelector('.flexible');
    const importantButton = form.querySelector('.important');
    const urgentButton = form.querySelector('.urgent');

    // Add the event listener
    flexibleButton.addEventListener('click', () => {
        flexibleButton.classList.add('show');
        importantButton.classList.remove('show');
        urgentButton.classList.remove('show');
        form.dataset.priority = flexibleButton.textContent;  
    })

    importantButton.addEventListener('click', () => {
        importantButton.classList.add('show');
        flexibleButton.classList.remove('show');
        urgentButton.classList.remove('show');
        form.dataset.priority = importantButton.textContent;
    })

    urgentButton.addEventListener('click', () => {
        urgentButton.classList.add('show');
        flexibleButton.classList.remove('show');
        importantButton.classList.remove('show');
        form.dataset.priority = urgentButton.textContent;
    })
}