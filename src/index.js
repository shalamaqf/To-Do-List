import { initProjectDOM } from "./projectDOM.js";
import { inbox } from "./projectManager.js";
import "./style.css";
import { initTodoDOM } from "./todoDOM.js";

initProjectDOM(inbox);
initTodoDOM();