// Create a function to render DOM elements for project title
export function renderProjectTitle(project) {
    const projectListContainer = document.querySelector("#projectList-container");
    const projectTitleDiv = document.createElement("div");
    const projectTitle = document.createElement("h4");
    const projectBtnContainer = document.createElement("div");
    const deleteProjectBtn = document.createElement("button");
    const renameProjectBtn = document.createElement("button");

    projectTitleDiv.classList.add("projectTitle-container");
    projectTitle.classList.add("projectTitle");
    projectBtnContainer.className = "projectBtn-container";
    deleteProjectBtn.className = "deleteProject-button";
    renameProjectBtn.className = "renameProject-button";

    projectTitle.textContent = project.title;
    deleteProjectBtn.textContent = "-";
    renameProjectBtn.textContent = "✎";

    projectBtnContainer.appendChild(renameProjectBtn);
    projectBtnContainer.appendChild(deleteProjectBtn);
    projectTitleDiv.appendChild(projectTitle);
    projectTitleDiv.appendChild(projectBtnContainer);
    projectListContainer.appendChild(projectTitleDiv);
    
    return projectTitleDiv;
}

