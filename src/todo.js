// Import date-fns library
import { isValid, parse } from "date-fns";

// Create a class to create a todo object
export default class Todo {
    constructor(title, dueDate) {
        this.title = title;
        this.dueDate = parseDate(dueDate);
        this.desc = "";
        this.priority = "";
        this.note = "";
        this.isComplete = false;
        this.project = "";
    }
}

// Create a function to parse the dueDate to date object
function parseDate(dueDate) {
    const parsedDate = parse(dueDate, "yyyy/MM/dd HH:mm", new Date());
    return isValid(parsedDate) ? parsedDate : null;
}