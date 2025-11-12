// Import
import { createTodo, moveTodo, findTodoById } from './todoManager.js';
import { deleteProject, getProject, viewProjectList } from './projectManager.js';
import { deleteProjectStorage, storeProject } from './storage.js';


// RENDER TODO //
// Create a function to render todo DOM elements
export function renderTodo(todo) {
    const todoListContainer = document.getElementById('todoList-container');
    const todoContainer = document.createElement('div');
    const todoTitle = document.createElement('p');
    const todoDueDate = document.createElement('p');
    const todoPriority = document.createElement('p');
    const todoCompleted = document.createElement('p');
    const seeDetailsBtn = document.createElement('button');
    const editBtn = document.createElement('button');

    todoContainer.className = 'todo-container';
    todoTitle.className = 'todo todo-title';
    todoDueDate.className = 'todo todo-dueDate';
    todoPriority.className = 'todo todo-priority';
    todoCompleted.className = 'todo todo-completed';
    seeDetailsBtn.className = 'see todo-btn';
    editBtn.className = 'edit todo-btn';

    todo.showingDetails = false;

    todoTitle.textContent = todo.title;
    todoDueDate.textContent = todo.dueDate;
    todoPriority.textContent = todo.priority;
    todoCompleted.textContent = todo.isComplete ? '✔' : '✖';
    seeDetailsBtn.textContent = 'See Details';
    editBtn.textContent = 'Edit';

    todoContainer.appendChild(todoTitle);
    todoContainer.appendChild(todoDueDate);
    todoContainer.appendChild(todoPriority);
    todoContainer.appendChild(todoCompleted);
    todoContainer.appendChild(seeDetailsBtn);
    todoContainer.appendChild(editBtn);
    todoListContainer.appendChild(todoContainer);

    // Set the todo ID on dataset of todoContainer
    todoContainer.dataset.todoId = todo.id;

    setupDetailsBtn(seeDetailsBtn, todo, todoContainer);
    setupEditButton(editBtn, todo, todoContainer);

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


// MODAL //
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
function clearValues(form) {
    const formModal = document.getElementById('todo-form-modal');
    const inputs = formModal.querySelectorAll('input');
    const checkbox = formModal.querySelector('#checklist');
    const priorityButtons = form.querySelectorAll('.priority-button');

    if (inputs) {
        inputs.forEach(input => {
            input.value = "";
        });
    }

    // Unchecked checkbox
    checkbox.checked = false;

    // Clear priority input
    form.removeAttribute('data-priority');
    if (priorityButtons) {
        priorityButtons.forEach(button => {
            button.classList.remove('.show');
        })
    }
}


// LOGIC TO ADD TODO //
// Create a function to create a todo and push in to spesific project
function createTodoFromModal(form, projectTitle) {
    const title = document.getElementById('todo-title').value;
    const dueDate = document.getElementById('dueDate').value;
    const desc = document.getElementById('desc').value;
    const priority = form.dataset.priority;
    const note = document.getElementById('note').value;
    const completed = document.getElementById('checklist').checked;
    const inputProject = document.getElementById('project').value;

    // Validate the user's input
    if (!validateInput(form)) return;

    // Set the input as the todo's properties
    const todo = createTodo(title, dueDate, projectTitle);
    todo.setDesc = desc;
    todo.setPriority = priority;
    todo.setNote = note;
    todo.isComplete = completed;
    todo.setProject = inputProject;

    // Update the project in local storage
    const project = getProject(projectTitle);
    todo.project = project;
    storeProject(project);

    // Clear input values
    clearValues(form);

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


// SETUP MODAL FORM // 
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

// Create a function to setup the form modal to add todo
export function setupFormTodo() {
    const form = document.getElementById('todo-form-modal');
    const cancelBtn = document.getElementById('cancel-todo-button');
    const selectProject = document.getElementById('project');
    const submitBtn = document.getElementById('submit-todo-button');

    // Attach event listeners to priority buttons
    selectedPriority(form);

    selectProject.addEventListener('focus', () => {
        dropDownProjects(form);
    })

    submitBtn.addEventListener('click', (e) => {
        // Prevent event default
        e.preventDefault();
        const projectTitle = selectProject.value;
        const project = getProject(projectTitle);
        submitLogic(e, form, project);
    })

    cancelBtn.addEventListener('click', () => {
        clearValues(form);
        hideModal();
    })
}


// VALIDATE USER'S INPUT //
// Create a function to validate user input
function validateInput(form) {
    const inputTitle = form.querySelector('#todo-title');
    const inputDueDate = form.querySelector('#dueDate');

    const title = inputTitle.value;
    const dueDate = inputDueDate.value;

    if ((title === '') || (dueDate === '') || (!form.dataset.priority)){
        alert("Fields are required (Title, Due Date, Priority, Project)");
        return false;
    }

    return true;
}


// SEE DETAILS BUTTON LOGIC //
// Attach an event listener to see the todo's details
function setupDetailsBtn(seeDetailsBtn, todo, todoContainer) {
    seeDetailsBtn.addEventListener('click', () => {
        toggleTodoDetails(todo, seeDetailsBtn, todoContainer);
    })
}

// Create a function to toggle the todo's details
function toggleTodoDetails(todo, seeDetailsBtn, todoContainer) {
    if (!todo.showingDetails) {
        renderTodoDetails(todo, todoContainer);
        seeDetailsBtn.textContent = 'Hide Details';
        todo.showingDetails = true;
    }
    else {
        removeDetails(todoContainer);
        seeDetailsBtn.textContent = 'See Details';
        todo.showingDetails = false;
    }
}

// Create a function to remove the todo's details
function removeDetails(todoContainer) {
    const desc = todoContainer.querySelector('.todo-desc');
    const note = todoContainer.querySelector('.todo-note');
    const project = todoContainer.querySelector('.todo-project');
    if (desc) desc.remove();
    if (note) note.remove();
    if (project) project.remove();
}


// LOGIC EDIT TODO //
// Create a function to setup the edit todo button
function setupEditButton(editBtn, todo, todoContainer) {
    const form = document.getElementById('todo-form-modal');
    const submitAdd = document.getElementById('submit-todo-button');
    const modalHeader = document.getElementById('todo-modal-header');
    const selectProject = form.querySelector('#project');

    // Attach the event listener
    editBtn.addEventListener('click', () => {
        dropDownProjects(form);
        form.dataset.mode = "edit";
        form.dataset.todoId = todo.id;
        form.dataset.projectTitle = todo.project.title;
        submitAdd.textContent = 'Update';
        modalHeader.textContent = 'Edit Todo';
        selectProject.value = todo.project.title;
        populateForm(todo, form);
        showModal();
    })
}

// Create a function to populate the form with todo's properties
function populateForm(todo, form) {
    // Set the form's input with todo's properties
    form.querySelector('#todo-title').value = todo.title;
    form.querySelector('#dueDate').value = todo.dueDate;
    form.querySelector('#desc').value = todo.desc;
    form.querySelector('#note').value = todo.note;
    form.querySelector('#checklist').checked = todo.isComplete;
    
    // Set the input project
    form.querySelector('#project').value = todo.project.title;

    // Set the input priority
    form.dataset.priority = todo.priority;
    const priorityButtons = form.querySelectorAll('.priority-button');
    priorityButtons.forEach(button => {
        button.classList.toggle('show', button.textContent === todo.priority);
    })
}

// Create a function to set todo's new properties
function setNewTodoProperties(form, todo) {
    todo.setTitle = form.querySelector('#todo-title').value;
    todo.setDueDate = form.querySelector('#dueDate').value;
    todo.setDesc = form.querySelector('#desc').value;
    todo.setNote = form.querySelector('#note').value;
    todo.isComplete = form.querySelector('#checklist').checked;

    // Set the new project
    const projectTitle = form.querySelector('#project').value;
    moveTodo(todo, projectTitle);

    // Set the new priority
   todo.setPriority = form.dataset.priority; 
}

// Create a function to edit the todo
function editTodo(todo, form) {
    // Validate the user input
    if (!validateInput(form)) return;
    
    // Set the properties of todo with new input
    setNewTodoProperties(form, todo);

    // Hide the modal
    hideModal()

    // Store the new update in local storage
    const oldProject = getProject(form.dataset.projectTitle);
    storeProject(oldProject);
    storeProject(todo.project);

    // Delete the todo DOM before updated
    const oldTodoContainer = document.querySelector(`[data-todo-id="${form.dataset.todoId}"]`);
    console.log("Old todo container:", oldTodoContainer);

    if (oldTodoContainer) oldTodoContainer.remove();

    // Re-render the updated todo
    renderTodo(todo);
}


// FORM SUBMIT LOGIC //
// Create a function to determine the submit button logic (add/edit)
function submitLogic(e, form, project) {
    if (form.dataset.mode === "add") {
        createTodoFromModal(form, project.title);
        return;
    }

    if (form.dataset.mode === "edit") {
        const todoID = Number(form.dataset.todoId);
        const oldProject = getProject(form.dataset.projectTitle);
        const todo = findTodoById(todoID, oldProject);
        editTodo(todo, form);
    }
}


// POPOVER //
// Create a function to render popover DOM
export function renderPopoverDOM() {
    const popoverContainer = document.createElement('div');
    const confirmMessage = document.createElement('p');
    const buttonContainer = document.createElement('div');
    const yesButton = document.createElement('button');
    const noButton = document.createElement('button');

    popoverContainer.id = 'popover-container';
    confirmMessage.id = 'confirm-message';
    buttonContainer.id = 'confirm-button-container';
    yesButton.className = 'confirm-button yes';
    noButton.className = 'confirm-button no';

    confirmMessage.textContent = "Delete this todo?";
    yesButton.textContent = "Yes";
    noButton.textContent = "No";

    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);
    popoverContainer.appendChild(confirmMessage);
    popoverContainer.appendChild(buttonContainer);

    return popoverContainer;
}

// Create a function to append/show popover
function appendPopover(todoContainer) {
    const popover = renderPopoverDOM();
    todoContainer.appendChild(popover);
}

// Create a function to hide the popover
function hidePopover() {
    const popover = document.getElementById('popover-container');
    if (popover) popover.remove();
}

// Create a function to setup the popover
function setupPopover(todo) {
    const yesButton = document.querySelector('.confirm-button.yes');
    const noButton = document.querySelector('.confirm-button.no');

    yesButton.addEventListener('click', () => {
        handleDeleteTodo(todo);
        hidePopover();
    })

    noButton.addEventListener('click', () => {
        hidePopover();
    })
}


// DELETE BUTTON AND LOGIC //
// Create a function to handle the todo delete
function handleDeleteTodo(todo) {
    // Get the project
    const projectTitle = todo.project.title;
    const project = todo.project;

    // Delete todo from project's array
    project.deleteTodo(todo);

    // Update the local storage
    storeProject(project);    
}