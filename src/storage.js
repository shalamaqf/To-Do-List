import Project from './project.js';
import Todo from './todo.js';
import { projectList } from './projectManager.js';

// Create a function to serialize the project
function serializeProject(project) {
    // Create a project plain object
    const plainProject = {
        title: project.title,
        toDoList: []
    }
    
    // Loop each project's todo, to create new plainTodo object
    project.toDoList.forEach(todo => {
        const plainTodo = {
            title: todo.title,
            dueDate: todo.dueDate,
            desc: todo.desc,
            priority: todo.priority,
            note: todo.note,
            isComplete: todo.isComplete
        }

        // Push plainTodo to plainProject's array
        plainProject.toDoList.push(plainTodo);
    });

    return plainProject;
}

// Create a function to deserialize a project
function deserializeProject(project) {
    // Create an object project
    const desProject = new Project(project.title);
    
    // Loop each project's todo, to create a todo object that includes project property
    project.toDoList.forEach(todo => {
        const desTodo = new Todo(todo.title, todo.dueDate);
        
        // Restore the todo's data
        desTodo.desc = todo.desc;
        desTodo.priority = todo.priority;
        desTodo.note = todo.note;
        desTodo.isComplete = todo.isComplete;
        desTodo.project = desProject;

        // Push the deserialized todo to the array
        desProject.addToDo(desTodo);
    });

    return desProject;

}

// Create a function to stringify a project
function stringifyProject(project) {
    const projectStr = serializeProject(project);
    return JSON.stringify(projectStr);
}

// Create a function to store a project to local storage 
export function storeProject(project) {
    const projectStr = stringifyProject(project);
    localStorage.setItem(project.title, projectStr);
}

// Create a function to delete a project in local storage
export function deleteProjectStorage(project) {
    localStorage.removeItem(project.title);
}

// Create a function to delete a project's todo in local storage
function deleteTodoStorage(project, projectStr) {
    storeProject(project, projectStr);
}

// Create a function to view a project from the local storage
function viewProjectStorage(project) {
    return localStorage.getItem(project.title);
}

// Create a function to parse a project from local storage
function parseProject(projectStr) {
    return JSON.parse(projectStr);
}

// Create a function to store the key of the current project
export function storeCurrentProject(project) {
    localStorage.setItem("CURRENT_PROJECT", project.title);
}

// Create a function to get raw project data
export function getRawData() {
    // Create an array to store the raw data
    let rawProjectData = [];

    // Store the storage length
    const storageLength = localStorage.length;

    // Loop the local storage to get the key
    for (let i = 0; i < storageLength; i++) {
        if (localStorage.key(i) !== "CURRENT_PROJECT") {
           let object = {};
           const key = localStorage.key(i);
           const value = localStorage.getItem(key);
           object = {
                projectName: key,
                todos: value
           }
           rawProjectData.push(object);
        }
    }
    return rawProjectData;
}

// Create a function to parse and deserialized the project data to project object
export function dataToObject() {
    // Create an array to store the raw data
    const rawData = getRawData();

    // Store the length of the raw data
    const length = rawData.length;

    // Loop the array, then parse and deserialized it
    for (let i = 0; i < length; i++) {
        const parsedData = parseProject(rawData[i].todos);
        const projectObject = deserializeProject(parsedData);
        projectList.push(projectObject);
    }
    
}