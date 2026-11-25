// IMPORT
import "./styles.css";
import { createProjectButtonClicked, deleteProjectButton, restoreProjects } from "./Project.js"
import { todoCheckedListener, tabSelectUpdate, restoreTodos } from './Todo.js'
import { addNoteClicked, formAddButtonClicked, cancelButtonClicked } from "./form.js"


// PROJECTS
createProjectButtonClicked();

restoreProjects();

deleteProjectButton();


// TODO
tabSelectUpdate();

restoreTodos();

todoCheckedListener();


// FORM
addNoteClicked();

formAddButtonClicked();

cancelButtonClicked();