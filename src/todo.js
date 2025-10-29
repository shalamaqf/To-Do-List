// Create a class to create a todo object
export default class Todo {
    constructor(title, dueDate) {
        this.title = title;
        this.dueDate = dueDate;
        this.desc = "";
        this.priority = "";
        this.note = "";
        this.isComplete = false;
        this.project = "";
    }

    // Add a method to set the todo's new title
    set setTitle(newTitle) {
        this.title = newTitle;
    }

    // Add a method to set the todo's new dueDate
    set setDueDate(newDueDate) {
        this.dueDate = parseDate(newDueDate);
    }

    // Add a method to set the todo's desc
    set setDesc(desc) {
        this.desc = desc;
    }

    // Add a method to set the todo's priority
    set setPriority(priority) {
        this.priority = priority;
    }

    // Add a method to set the todo's note
    set setNote(note) {
        this.note = note;
    }

    // Add a method to set the todo's project
    set setProject(project) {
        this.project = project;
    }
}