import { initProjectDOM } from "./projectDOM.js";
import { createDefaultProject, findCurrentProject, projectList } from "./projectManager.js";
import { dataToObject } from "./storage.js";
import { initTodoDOM } from "./todoDOM.js";
import './style.css';

// Create a function as init function for the program
function init() {
    let defaultProject;

    // 1. Load raw data from localStorage and deserialize
    dataToObject();

    // 2. Check if Inbox exists in projectList, create if not
    const inboxExists = projectList.some(p => p.title === "Inbox");
    if (!inboxExists) {
        defaultProject = createDefaultProject(); // storeInbox inside this
    }

    // 3. Find and set the current project
    findCurrentProject();

    // 4. Fallback for default project if needed
    if (!defaultProject) {
        defaultProject = projectList[0]; // pick the first project in the list
    }

    // 6. Render the current project DOM (header/title, form, add button)
    initProjectDOM(defaultProject);

    // 7. Render the current project's todos
    initTodoDOM();
}

init();