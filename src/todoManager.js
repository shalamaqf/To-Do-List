// Import project manager module
import { getProject } from './projectManager.js';
import Todo from './todo.js';

// Create a function to create a todo object
export function createTodo(title, dueDate, projectTitle) {
    const todo = new Todo(title, dueDate);
    assignTodo(todo, projectTitle);
    return todo;
}

function assignTodo(todo, projectTitle) {
    const project = getProject(projectTitle);
    const inbox = getProject('Inbox');
    if (!project) {
        todo.project = inbox;
        inbox.addToDo(todo);
        return;
    }
    todo.project = project;
    project.addToDo(todo);
    return;
}