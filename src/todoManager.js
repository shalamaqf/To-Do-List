// Import project manager module
import { getProject } from './projectManager.js';
import Todo from './todo.js';

// Create a function to create a todo object
export function createTodo(title, dueDate, projectTitle) {
    const todo = new Todo(title, dueDate);
    assignTodo(todo, projectTitle);
    return todo;
}

// Create a function to assign the todo to a project
function assignTodo(todo, projectTitle) {
    const project = getProject(projectTitle);
    const inbox = getProject('Inbox');

    // Check if todo's project is undefined or no
    if (!project) {
        todo.project = inbox;
        inbox.addToDo(todo);
        return;
    }
    todo.project = project;
    project.addToDo(todo);
    return;
}

// Create a function to move the todo to a project
export function moveTodo(todo, projectTitle) {
    // Remove todo's old project
    if (todo.project) {
        todo.project.deleteToDo(todo);
    }

    // Move todo to new project 
    const project = getProject(projectTitle);
    if (project) {
        todo.project = project;
        project.addToDo(todo);
        return;
    }
}

// Creata a function to find a todo by its id
function findTodoById(todoID, project) {
    return project.toDoList.find(todo => todo.id === todoID);
}