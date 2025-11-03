// Create a function to render DOM elements for project title
export function renderProjectTitle(project) {
    const projectListContainer = document.querySelector("#projectList-container");
    const projectTitleDiv = document.createElement("div");
    const projectTitle = document.createElement("h4");

    projectTitleDiv.classList.add("projectTitle-container");
    projectTitle.classList.add("projectTitle");

    projectTitle.textContent = project.title;

    projectTitleDiv.appendChild(projectTitle);
    projectListContainer.appendChild(projectTitleDiv);
    
    return projectTitleDiv;
}
