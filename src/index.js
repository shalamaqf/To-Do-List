import { initProjectDOM } from "./projectDOM.js"
import { loadData } from "./storage.js";
import "./style.css";
import { initTodoDOM } from "./todoDOM.js";

loadData();
initProjectDOM();
initTodoDOM();