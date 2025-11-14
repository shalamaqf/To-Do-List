import { initProjectDOM } from "./projectDOM.js"
import { createDefaultProject } from "./projectManager.js";
import { loadData } from "./storage.js";
import "./style.css";
import { initTodoDOM } from "./todoDOM.js";

loadData();
createDefaultProject();
initProjectDOM();
initTodoDOM();