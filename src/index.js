import { initProjectDOM } from "./projectDOM";
import { createDefaultProject, projectList } from "./projectManager";
import { dataToObject } from "./storage";
import { initTodoDOM } from "./todoDOM";

// Create a function as init function for the program
function init() {
    // Create a variable to store the default project
    let defaultProject;

    // Check project list's length
    if (projectList.length === 0) {
        defaultProject = createDefaultProject();
    }

    // Load raw data, parse and deserialzied it
    dataToObject();

    // If defaultProject wasn't created above (projectList not empty), fallback
    if (!defaultProject) {
        defaultProject = projectList[0]; // just pick the first project
    }

    // Render the project dom section
    initProjectDOM(defaultProject);

    // Render the todo's section
    initTodoDOM();
}