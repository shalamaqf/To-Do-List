// Import class project
import Project from './project.js';

// Create an array to store projects
export let projectList = [];

// Create a function to create a project object
function createProject(title) {
    return new Project(title);
}

// Create a function to add a project o projectList array
export function addProject(title) {
    const newProject = createProject(title);
    projectList.push(newProject);
}

// Create a function to delete a project from projectList array
export function deleteProject(title) {
    const index = projectList.findIndex(project => project.title === title);
    if (index !== -1) {
        projectList.splice(index, 1);
        return true;
    }
    return false;
}