// IMPORT
import "./styles.css";

// HTML OBJECTS
const body = document.getElementById('body');
const sidebar = document.getElementById('sidebar');
const toDoContainer = document.getElementById('todoContainer');



// VARIABLES
const defaultTab = document.createElement('div');
defaultTab.className = 'tabs';
const defaultTabP = document.createElement('p');
defaultTabP.textContent = 'Default';

defaultTab.appendChild(defaultTabP);
sidebar.appendChild(defaultTab);


// PROJECT MAKER
class ProjectMaker {
    constructor(title) {
        this.title = title;
    };

    create() {
        const newTab = document.createElement('div');
        newTab.className = 'tabs';
        const newTabP = document.createElement('p');
        newTabP.textContent = this.title;
        newTab.appendChild(newTabP);
        sidebar.appendChild(newTab);
    };
};

class ToDoMaker {
    constructor(title, description, dueDate, priority, notes, checklist) {
        this.title = title;
        this.description;
        this.dueDate;
        this.priority;
        this.notes;
        this.checklist;
    };

    create() {
        const newToDo = document.createElement('div');
        newToDo.className = 'toDo';
        const newToDoP = document.createElement('p');
        newToDoP.textContent = this.title;
        newToDo.appendChild(newToDo);
        sidebar.appendChild(newToDo);
    };
};



// CREATE PROJECT BUTTON
const createProjectButton = document.createElement('button');
createProjectButton.id = 'createProjectButton';
createProjectButton.textContent = '+';
sidebar.appendChild(createProjectButton);


// CREATE PROJECT BUTTON CLICK
createProjectButton.addEventListener('click', function(e) {
    const projectName = prompt('Enter the project name:');

    if (projectName != "") {
        const noob = new ProjectMaker(projectName);
        noob.create();
    };

});

// CREATE TODO LIST BUTTON CLICKS
document.getElementById('addNote').addEventListener('click', function(e) {

    const todo = document.createElement('div');
    todo.className = 'todo';

    const checkButton = document.createElement('input');
    checkButton.type = 'checkbox';

    const todoTitle = document.createElement('p');
    todoTitle.textContent = 'dummy content';

    todo.appendChild(checkButton);
    toDoContainer.appendChild(todo);

});