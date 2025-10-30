// Import project manager module
import {} from './projectManager.js';
import Todo from './todo.js';

// Create a function to create a todo object
export function createTodo(title, dueDate) {
    return new Todo(title, dueDate);
}
