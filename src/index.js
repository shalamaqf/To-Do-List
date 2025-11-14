import { initProjectDOM } from "./projectDOM";
import { inbox } from "./projectManager";
import "./style.css";
import { initTodoDOM } from "./todoDOM";

initProjectDOM(inbox);
initTodoDOM();