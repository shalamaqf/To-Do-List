// Import project manager module
import {} from './projectManager.js';
import Todo from './todo.js';

// Create a function to create a todo object
export function createTodo(title, dueDate) {
    return new Todo(title, dueDate);
}

// Check and set todo project
export function assignToDefaultProject(todo, inbox) {
    if (todo.project === undefined) {
        todo.project = inbox;
        inbox.addToDo(todo);
    }
    return;
}