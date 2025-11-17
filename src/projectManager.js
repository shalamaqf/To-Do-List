// Import class project
import Project from './project.js';
import { storeProject, storeCurrentProject } from './storage.js';

// Create an array to store projects
let projectList = [];

// Create variable to store the inbox project
export let inbox = createDefaultProject();

// Create a function to create a project object
function createProject(title) {
    return new Project(title);
}

// Create a default/global project
export function createDefaultProject() {
    const inbox = createProject('Inbox');
    projectList.push(inbox);
    storeProject(inbox);
    return inbox;
}

// Create a function to add a project o projectList array
export function addProject(title) {
    const newProject = createProject(title);
    projectList.push(newProject);
    return newProject;
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

// Create a function to search a project from projectList array
export function getProject(title) {
    const index = projectList.findIndex(project => project.title === title);
    if (index !== -1) {
        return projectList[index];
    }
    return false;
}

// Create a function to view the projectList array
export function viewProjectList() {
    return projectList.slice();
}

// Create a variable to store the current project
let currentProject = getProject("Inbox");

// Create a setter for current project
export function setCurrentProject(project) {
    currentProject = project;
    storeCurrentProject(project);
}

// Create a getter for current project
export function getCurrentProject() {
    return currentProject;
}