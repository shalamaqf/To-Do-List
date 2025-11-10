// Import
import { createTodo } from './todoManager.js';
import { getProject, viewProjectList } from './projectManager.js';
import { storeProject } from './storage.js';

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

// Create a function to create a todo and push in to spesific project
function createTodoFromModal(form, projectTitle) {
    const title = document.getElementById('todo-title').value;
    const dueDate = document.getElementById('dueDate').value;
    const desc = document.getElementById('desc').value;
    const priority = form.dataset.priority;
    const note = document.getElementById('note').value;
    const completed = document.getElementById('checklist').checked;
    const inputProject = document.getElementById('project').value;

    // Set the input as the todo's properties
    const todo = createTodo(title, dueDate, projectTitle);
    todo.setDesc = desc;
    todo.setPriority = priority;
    todo.setNote = note;
    todo.isComplete = completed;
    todo.setProject = inputProject;

    // Update the project in local storage
    const project = getProject(projectTitle);
    storeProject(project);

    // Clear input values
    clearValues();

    // Hide modal
    hideModal();
    
    // Render the todo
    renderTodo(todo);
}

// Create a function to add event listeners to priority buttons
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

// Create a function to drop down the project list
function dropDownProjects(form) {
    // Get the project list
    const projectList = viewProjectList();
    const select = form.querySelector('#project');

    // Clear the existing drop down
    select.innerHTML = "";

    // Create option element for each project
    projectList.forEach (project => {
        const option = document.createElement('option');
        option.textContent = project.title;
        select.appendChild(option);
    })
}

// Create a function to setup the add todo button
export function setupAddTodoButton() {
    const addButton = document.getElementById('add-todo-button');
    const form = document.getElementById('todo-form-modal');
    const submitAdd = document.getElementById('submit-todo-button');
    const modalHeader = document.getElementById('todo-modal-header');
    const selectProject = form.querySelector('#project');


    addButton.addEventListener('click', () => {
        dropDownProjects(form);
        selectProject.value = "Inbox";
        form.dataset.mode = "add";
        submitAdd.textContent = "Add";
        modalHeader.textContent = "Add Todo";
        showModal();
    })
}

// Create a function to setup the form modal to add todo
export function setupFormAddTodo() {
    const form = document.getElementById('todo-form-modal');
    const cancelBtn = document.getElementById('cancel-todo-button');
    const selectProject = document.getElementById('project');
    const addButton = document.getElementById('submit-todo-button');

    // Attach event listeners to priority buttons
    selectedPriority(form);

    selectProject.addEventListener('focus', () => {
        dropDownProjects(form);
    })

    addButton.addEventListener('click', (e) => {
        // Todo's project
        const projectTitle = selectProject.value;

        e.preventDefault();

        // Validate user's input
        if (!validateInput(form)) return;

        createTodoFromModal(form, projectTitle);
    })

    cancelBtn.addEventListener('click', () => {
        clearValues();
        hideModal();
    })
}

// Create a function to validate user input
function validateInput(form) {
    const inputTitle = form.querySelector('#todo-title');
    const inputDueDate = form.querySelector('#dueDate');
    const inputPriority = form.dataset.priority;

    const title = inputTitle.value;
    const dueDate = inputDueDate.value;

    if ((title === '') || (dueDate === '') || (inputPriority === '')){
        alert("Fields are required (Title, Due Date, Priority, Project)");
        return false;
    }

    return true;
}