import { getProject, addProject, deleteProject, inbox, setCurrentProject, getCurrentProject, viewProjectList, projectList } from './projectManager.js';
import { deleteProjectStorage, storeCurrentProject, storeProject } from "./storage.js";
import { renderProjectTodos, hidePopover as hidePopoverTodo, toggleAllDetails, todosProject } from './todoDOM.js';


// Create a function to render DOM elements for default project's title block
function renderDefaultProjectTitle(inbox) {
    const projectListContainer = document.querySelector("#projectList-container");
    const projectTitleDiv = document.createElement("div");
    const projectTitleButton = document.createElement("button");
   
    projectTitleDiv.className = "projectTitle-container";
    projectTitleButton.className = "projectTitleBtn";
    
    projectTitleButton.textContent = inbox.title;

    projectTitleDiv.appendChild(projectTitleButton);
    projectListContainer.appendChild(projectTitleDiv);

    setupProjectButton(projectTitleDiv, inbox);
    
    return projectTitleDiv;
}


// Create a function to render DOM elements for project's title block
function renderProjectTitle(project) {
    const projectListContainer = document.querySelector("#projectList-container");
    const projectTitleDiv = document.createElement("div");
    const projectTitleButton = document.createElement("button");
    const projectBtnContainer = document.createElement("div");
    const deleteProjectBtn = document.createElement("button");
    const renameProjectBtn = document.createElement("button");

    projectTitleDiv.className = "projectTitle-container";
    projectTitleButton.className = "projectTitleBtn";
    projectBtnContainer.className = "projectBtn-container";
    deleteProjectBtn.className = "deleteProject-button";
    renameProjectBtn.className = "renameProject-button";

    projectTitleButton.textContent = project.title;
    deleteProjectBtn.textContent = "🗑";
    renameProjectBtn.textContent = "✎";

    projectTitleDiv.dataset.title = project.title;

    projectBtnContainer.appendChild(renameProjectBtn);
    projectBtnContainer.appendChild(deleteProjectBtn);
    projectTitleDiv.appendChild(projectTitleButton);
    projectTitleDiv.appendChild(projectBtnContainer);
    projectListContainer.appendChild(projectTitleDiv);

    setupProjectButton(projectTitleButton, project);
    setupRenameProject(renameProjectBtn, project);
    setupDeleteProject(deleteProjectBtn, project, projectBtnContainer);

    return projectTitleDiv;
}

// Create a function to render the project list
export function renderProjectList() {
    const projectListContainer = document.querySelector("#projectList-container");
    projectListContainer.innerHTML = "";

    const currentProject = getCurrentProject();

    projectList.forEach(project => {
        if (project.title === "Inbox") {
            renderDefaultProjectTitle(project, project === currentProject); 
        } else {
            renderProjectTitle(project, project === currentProject); 
        }
    });
}

// Create a function to showed up the modal
function showModal() {
    const modal_container = document.querySelector(".project.modal-container");
    modal_container.classList.add("show");
}

// Create a function to hide the modal
function hideModal() {
    const modal_container = document.querySelector(".project.modal-container");
    modal_container.classList.remove("show");
}

// Create a function to clear input value
function clearInputValue() {
    const input = document.getElementById("project-title");
    if (input) input.value = "";
}


// Create a function to create a project from the modal
function createProjectFromModal() {
    // Get the input
    const input = document.getElementById("project-title");
    const projectTitle = input.value;
    
    // Validate the input, prevent from an empty input
    if (!projectTitle.trim()) return;

    // Create the project based on the projectTitle
    const project = addProject(projectTitle);
    storeProject(project);

    // Clear the input field
    clearInputValue();

    // Hide the modal
    hideModal();

    // Render the project
    renderProjectTitle(project);
}


// Create a function to add the event listener to add button
function setupAddProject() {
    const addButton = document.getElementById("add-project-button");
    const form = document.getElementById("project-form-modal");
    const submitAdd = document.getElementById("submit-project-button");
    const modalHeader = document.getElementById('modal-header');

    addButton.addEventListener('click', () => {
        form.dataset.mode = "add";
        submitAdd.textContent = "Add Project";
        modalHeader.textContent = "Add Project";
        removePopover();
        showModal();
    })
}


// Create a function to rename project's title
function renameProjectFromModal(project) {
    // Store the old title
    const oldTitle = project.title;

    // Get the input
    const input = document.getElementById("project-title");
    const newTitle = input.value;

    // Validate the input, prevent from an empty input
    if (!newTitle.trim()) return;

    // Delete the old project with the old title in local storage
    deleteProjectStorage(project);

    // Set the new title
    project.setTitle = newTitle;

    // Update the local storage with project
    storeProject(project);

    // Set the new title on the project title button
    const oldProjectDiv = document.querySelector(`[data-title="${oldTitle}"]`);
    oldProjectDiv.querySelector('.projectTitleBtn').textContent = newTitle;
    oldProjectDiv.dataset.title = newTitle;

    // Clear the input field
    clearInputValue();

    // Hide the modal
    hideModal();
}


// Create a function to setup the modal for rename project
function setupRenameProject(renameProjectBtn, project) {
    const form = document.getElementById("project-form-modal");
    const submitRename = document.getElementById("submit-project-button");
    const modalHeader = document.getElementById('modal-header');

    renameProjectBtn.addEventListener('click', () => {
        form.dataset.mode = "rename";
        form.dataset.oldTitle = project.title;
        submitRename.textContent = "Rename";
        modalHeader.textContent = "Rename Project";
        removePopover()
        showModal();
    })
}


// Create a submit function to determine logic to run on submit button
function submitLogic(e, form) {
    e.preventDefault();

    // Add project logic
    if (form.dataset.mode === "add") {
        createProjectFromModal();
        return;
    }

    if (form.dataset.mode === "rename") {
        // Determine what project that being renamed
        const project = getProject(form.dataset.oldTitle);
        if (project) {
            renameProjectFromModal(project);
            if (getCurrentProject().title === project.title) {
                todosProject();
            }
        } 
        return;
    }
}


// Create a function to attach an event listener to form
function setupFormProject() {
    const form = document.getElementById("project-form-modal");
    const cancelBtn = document.getElementById("cancel-project-button");

    form.addEventListener('submit', (e) => {
        submitLogic(e, form);
    })

    cancelBtn.addEventListener('click', () => {
        hideModal();
        clearInputValue();
    })
}


// Create a function to delete project in DOM
function deleteProjectDOM(project) {
    const projectDiv = document.querySelector(`[data-title="${project.title}"]`);
    projectDiv.remove();
}

// Create a function to delete project in global array, storage, and DOM
function handleDeleteProject(project) {
    // Get the project title
    const projectTitle = project.title;

    // Delete all project's todo
    project.toDoList.length = 0;
    
    // Delete project in global array
    deleteProject(projectTitle);

    // Delete project in storage
    deleteProjectStorage(project);

    // Delete project in DOM
    deleteProjectDOM(project);

    // Set the current project
    const projectArray = viewProjectList();
    setCurrentProject(projectArray[projectArray.length - 1]);
}

// Create a function to setup the delete button in a project
function setupDeleteProject(deleteBtn, project, projectBtnContainer) {
    deleteBtn.addEventListener('click', () => {
        appendPopover(projectBtnContainer);
        setupPopover(project);
        hideButtons(projectBtnContainer);
    })
}

// Create a function to hide the project buttons 
function hideButtons(projectBtnContainer) {
    const renameBtn = projectBtnContainer.querySelector('.renameProject-button');
    const deleteBtn = projectBtnContainer.querySelector('.deleteProject-button');

    renameBtn.classList.add('hide');
    deleteBtn.classList.add('hide');
}

// Create a function to render popover DOM
function renderPopoverDOM() {
    const popoverContainer = document.createElement('div');
    const confirmMessage = document.createElement('p');
    const buttonContainer = document.createElement('div');
    const yesButton = document.createElement('button');
    const noButton = document.createElement('button');

    popoverContainer.id = 'popover-container-project';
    confirmMessage.id = 'confirm-message';
    buttonContainer.id = 'confirm-button-container';
    yesButton.className = 'confirm-button yes';
    noButton.className = 'confirm-button no';

    confirmMessage.textContent = "Delete this project?";
    yesButton.textContent = "Yes";
    noButton.textContent = "No";

    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);
    popoverContainer.appendChild(confirmMessage);
    popoverContainer.appendChild(buttonContainer);

    return popoverContainer;
}

// Create a function to append the popover DOM to the project title div
function appendPopover(projectBtnContainer) {
    // Prevent duplicate popovers
    removePopover();
    const popover = renderPopoverDOM();
    projectBtnContainer.appendChild(popover);
}

// Create a function to setup the popover and add event listener to the buttons 
function setupPopover(project) {
    const yesButton = document.querySelector('.confirm-button.yes');
    const noButton = document.querySelector('.confirm-button.no');

    yesButton.addEventListener('click', () => {
        handleDeleteProject(project);
        removePopover();
        todosProject();
        renderProjectTodos(getCurrentProject());
    })

    noButton.addEventListener('click', () => {
        removePopover();
    })
}

// Create a function to remove popover from DOM
function removePopover() {
    const popover = document.getElementById('popover-container-project');
    if (popover) popover.remove();
}


// SHOW PROJECT'S TODOS //
// Create a function to attach an event to project button //
function setupProjectButton(projectBtn, project) {
    projectBtn.addEventListener('click', () => {
        setCurrentProject(project);
        toggleAllDetails();
        removePopover();
        hidePopoverTodo();
        renderProjectTodos(project);
        todosProject();
    })
}

// Create a function to initiallize the project DOM
export function initProjectDOM(defaultProject) {
    // Ensure current project is set in local storage
    const currentProject = getCurrentProject() || defaultProject;
    setCurrentProject(currentProject);

    renderProjectList();
    setupAddProject();
    setupFormProject();
}
