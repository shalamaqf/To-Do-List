import { getProject, addProject, viewProjectList } from './projectManager.js';
import { storeProject } from "./storage.js";

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

    projectBtnContainer.appendChild(renameProjectBtn);
    projectBtnContainer.appendChild(deleteProjectBtn);
    projectTitleDiv.appendChild(projectTitleButton);
    projectTitleDiv.appendChild(projectBtnContainer);
    projectListContainer.appendChild(projectTitleDiv);
    
    return projectTitleDiv;
}

// Create a function to showed up the modal
function showModal() {
    const modal_container = document.querySelector(".project.modal-container");
    modal_container.classList.add("show");
}

// Create a function to handle user input
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
    input.value = "";

    // Hide the modal
    hideModal();

    // Render the project
    renderProjectTitle(project);
}

// Create a function to hide the modal
function hideModal() {
    const modal_container = document.querySelector(".project.modal-container");
    modal_container.classList.remove("show");
}

// Create a function add an event listener to add project button
export function setupAddProject() {
    const addButton = document.getElementById("add-project-button");
    const form = document.getElementById("project-form-modal");

    addButton.addEventListener('click', () => {
        showModal();
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        createProjectFromModal();
    })
}