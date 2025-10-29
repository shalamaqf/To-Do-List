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