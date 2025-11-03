import { getProject } from './projectManager.js';

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