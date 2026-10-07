// IMPORT
import "./styles.css";

// HTML OBJECTS
const body = document.getElementById('body');
const sidebar = document.getElementById('sidebar');
const toDoContainer = document.getElementById('todoContainer');



// PROJECT MAKER
class ProjectMaker {
    constructor(title) {
        this.title = title;
    };

    create() {
        const newTab = document.createElement('div');
        newTab.className = 'projects';
        const newTabP = document.createElement('p');
        newTabP.textContent = this.title;
        newTab.appendChild(newTabP);
        sidebar.appendChild(newTab);
    };
};

const defaultTab = new ProjectMaker('Default');
defaultTab.create();


// TO DO MAKER
class ToDoMaker {
    constructor(title, description, dueDate, priority, notes, checklist) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
    };

    create() {
        const todo = document.createElement('div');
        todo.className = 'todo';

        // CHECK BUTTON
        const checkButton = document.createElement('input');
        checkButton.type = 'checkbox';

        // TITLE
        const todoTitle = document.createElement('p');
        todoTitle.textContent = 'dummy content';

        todo.appendChild(checkButton);
        todo.appendChild(todoTitle);
        toDoContainer.appendChild(todo);
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

document.getElementById('tabs').addEventListener('click', function(e) {
    alert('clicked');
});

// CREATE TODO LIST BUTTON CLICKS
document.getElementById('addNote').addEventListener('click', function(e) {
    const todo = new ToDoMaker();
    todo.create();
});