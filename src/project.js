// Create a class to create a project object
export default class Project {
    constructor(title) {
        this.title = title;
        this.toDoList = [];
    }

    // Add a method to add todo in to toDoList array
    addToDo(todo) {
        return this.toDoList.push(todo);
    }
}