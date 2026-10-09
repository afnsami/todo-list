// IMPORT
import "./styles.css";

// HTML OBJECTS
const body = document.getElementById('body');
const sidebar = document.getElementById('sidebar');
const todoContainer = document.getElementById('todoContainer');
const addNoteButton = document.getElementById('addNote');



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
        const deleteButton = document.createElement('button');
        deleteButton.className = 'deleteButton';

        newTab.appendChild(newTabP);
        newTab.appendChild(deleteButton);
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

        const section1 = document.createElement('div');
        section1.className = 'section1';
        const section2 = document.createElement('div');
        section2.className = 'section2';
        const section3 = document.createElement('div');
        section3.className = 'section3';

        // SECTION 1
        const checkButton = document.createElement('input');
        checkButton.type = 'checkbox';
        const todoTitle = document.createElement('p');
        todoTitle.textContent = 'dummy content';

        // SECTION 3
        const deleteButton = document.createElement('button');
        deleteButton.className = 'deleteButton';

        section1.appendChild(checkButton);
        section1.appendChild(todoTitle);
        section3.appendChild(deleteButton);
        todo.appendChild(section1);
        todo.appendChild(section3)
        todoContainer.appendChild(todo);
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

function togglePopup() {
    const overlay = document.getElementById('popupOverlay');
    overlay.classList.toggle('show');
};

// CREATE TODO LIST BUTTON CLICKS
addNoteButton.addEventListener('click', function(e) {
    // PROMPT INPUT VAR
    togglePopup();
    const todo = new ToDoMaker();
    todo.create();
});