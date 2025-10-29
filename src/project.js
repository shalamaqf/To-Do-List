// Create a class to create a project object
class Project {
    constructor(title) {
        this.title = title;
        this.toDoList = [];
    }

    // Add a method to add todo in to toDoList array
    addToDo(todo) {
        return this.toDoList.push(todo);
    }

    // Add a method to delete to do in toDoList array
    deleteToDo(todo) {
        const index = this.toDoList.indexOf(todo);
        if (index !== -1) {
            this.toDoList.splice(index, 1);
            return true;
        }
        return false;
    }

    // Add a method to get todos list in the toDoList array
    get getTodos() {
        return this.toDoList;
    }

    // Add a setter to change the project's title
    set setTitle(newTitle) {
        this.title = newTitle;
    }
}

// Create a module pattern to manage list of project
export const projectManager = ( function () {
    // Create an array to store project
    let projectList = [];

    // Create a function to create a project object
    const createProject = function (title) {
        return new Project(title);
    }

    return {
        
    }
})();