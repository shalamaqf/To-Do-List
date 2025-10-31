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

// Create a function to stringify a project
export function stringifyProject(project) {
    const projectStr = serializeProject(project);
    return JSON.stringify(projectStr);
}

// Create a function to store a project to local storage 
export function storeProject(project, projectStr) {
    localStorage.setItem(project.title, projectStr);
}

// Create a function to delete a project in local storage
export function deleteProjectStorage(project) {
    localStorage.removeItem(project.title);
}

// Create a function to delete a project's todo in local storage
export function deleteTodoStorage(project, projectStr) {
    storeProject(project, projectStr);
}

// Create a function to view a project from the local storage
export function viewProjectStorage(project) {
    return localStorage.getItem(project.title);
}

// Create a function to parse a project from local storage
export function parseProject(projectStr) {
    return JSON.parse(projectStr);
}