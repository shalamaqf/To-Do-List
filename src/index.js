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

   // Step 2: Ensure Inbox exists and is first
    let inbox = projectList.find(p => p.title === "Inbox");
    if (!inbox) {
        inbox = createDefaultProject();
        projectList.unshift(inbox);
    } else {
        // Move Inbox to the front if it's not already
        const inboxIndex = projectList.indexOf(inbox);
        if (inboxIndex > 0) {
            projectList.splice(inboxIndex, 1);
            projectList.unshift(inbox);
        }
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