import { getProject, addProject, deleteProject } from './projectManager.js';
import { deleteProjectStorage, storeProject } from "./storage.js";


// Create a function to render DOM elements for default project's title block
export function renderDefaultProjectTitle() {
    const projectListContainer = document.querySelector("#projectList-container");
    const inboxProject = getProject('Inbox');
    const projectTitleDiv = document.createElement("div");
    const projectTitleButton = document.createElement("button");
   
    projectTitleDiv.className = "projectTitle-container";
    projectTitleButton.className = "projectTitleBtn";
    
    projectTitleButton.textContent = inboxProject.title;

    projectTitleDiv.appendChild(projectTitleButton);
    projectListContainer.appendChild(projectTitleDiv);
    
    return projectTitleDiv;
}


// Create a function to render DOM elements for project's title block
export function renderProjectTitle(project) {
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
    deleteProjectBtn.textContent = "-";
    renameProjectBtn.textContent = "✎";

    projectTitleDiv.dataset.title = project.title;

    projectBtnContainer.appendChild(renameProjectBtn);
    projectBtnContainer.appendChild(deleteProjectBtn);
    projectTitleDiv.appendChild(projectTitleButton);
    projectTitleDiv.appendChild(projectBtnContainer);
    projectListContainer.appendChild(projectTitleDiv);

    setupRenameProject(renameProjectBtn, project);
    setupDeleteProject(deleteProjectBtn, project);

    return projectTitleDiv;
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
export function createProjectFromModal() {
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
export function setupAddProject() {
    const addButton = document.getElementById("add-project-button");
    const form = document.getElementById("project-form-modal");
    const submitAdd = document.getElementById("submit-project-button");

    addButton.addEventListener('click', () => {
        form.dataset.mode = "add";
        submitAdd.textContent = "Add Project";
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
export function setupRenameProject(renameProjectBtn, project) {
    const form = document.getElementById("project-form-modal");
    const submitRename = document.getElementById("submit-project-button");

    renameProjectBtn.addEventListener('click', () => {
        form.dataset.mode = "rename";
        form.dataset.oldTitle = project.title;
        submitRename.textContent = "Rename";
        showModal();
    })
}


// Create a submit function to determine logic to run on submit button
export function submitLogic(e, form) {
    e.preventDefault();

    // Add project logic
    if (form.dataset.mode === "add") {
        createProjectFromModal();
        return;
    }

    if (form.dataset.mode === "rename") {
        // Determine what project that being renamed
        const project = getProject(form.dataset.oldTitle);
        if (project) renameProjectFromModal(project);
        return;
    }
}


// Create a function to attach an event listener to form
export function setupFormProject() {
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
export function handleDeleteProject(project) {
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
}

// Create a function to setup the delete button in a project
function setupDeleteProject(deleteBtn, project) {
    deleteBtn.addEventListener('click', () => {
        handleDeleteProject(project);
    })
}

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
    yesButton.className = 'confirm-button';
    noButton.className = 'confirm-button';

    confirmMessage.textContent = "Delete this project?";
    yesButton.textContent = "Yes";
    noButton.textContent = "No";

    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);
    popoverContainer.appendChild(confirmMessage);
    popoverContainer.appendChild(buttonContainer);

    return popoverContainer;
}