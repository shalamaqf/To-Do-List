// Create a function to render \todo DOM elements
export function renderTodo(todo) {
    const todoListContainer = document.getElementById('todoList-container');
    const todoContainer = document.createElement('div');
    const todoTitle = document.createElement('p');
    const todoDueDate = document.createElement('p');
    const todoPriority = document.createElement('p');
    const todoCompleted = document.createElement('p');

    todoContainer.className = 'todo-container';
    todoTitle.className = 'todo todo-title';
    todoDueDate.className = 'todo todo-dueDate';
    todoPriority.className = 'todo todo-priority';
    todoCompleted.className = 'todo todo-completed';

    todoTitle.textContent = todo.title;
    todoDueDate.textContent = todo.dueDate;
    todoPriority.textContent = todo.priority;
    todoCompleted.textContent = todo.isComplete ? '✔' : '✖';

    todoContainer.appendChild(todoTitle);
    todoContainer.appendChild(todoDueDate);
    todoContainer.appendChild(todoPriority);
    todoContainer.appendChild(todoCompleted);
    todoListContainer.appendChild(todoContainer);

    return todoContainer;

}