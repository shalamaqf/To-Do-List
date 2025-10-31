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