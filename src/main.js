// IMPORT
import "./styles.css";

// HTML OBJECTS
const projectsContainer = document.getElementById('projectsContainer');
const todoContainer = document.getElementById('todoContainer');

const createProjectButton = document.getElementById('createProjectButton');
const addNoteButton = document.getElementById('addNote');
const cancelButton = document.getElementById("cancelButton");


// PROJECT MAKER
class ProjectMaker {
    constructor(title) {
        this.title = title;
    };

    create() {
        const newTab = document.createElement('button');
        newTab.className = 'projects';
        newTab.id = this.title;
        const newTabP = document.createElement('p');
        newTabP.textContent = this.title;
        const deleteButton = document.createElement('button');
        deleteButton.className = 'deleteButton';

        newTab.appendChild(newTabP);
        newTab.appendChild(deleteButton);
        projectsContainer.appendChild(newTab);
    };
};

const defaultTab = new ProjectMaker('Default');
defaultTab.create();
const defaultTab2 = new ProjectMaker('New tab');
defaultTab2.create();


// TODO MAKER
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


// PROJECT CREATE BUTTON
createProjectButton.addEventListener('click', function(e) {
    const projectName = prompt('Enter the project name:');

    if (projectName != "") {
        const defaultTab = new ProjectMaker(projectName);
        defaultTab.create();
    };
});


// TODO CREATE BUTTON
function togglePopup() {
    const overlay = document.getElementById('popupOverlay');
    overlay.classList.toggle('show');
};

addNoteButton.addEventListener('click', function(e) {
    togglePopup();
});

cancelButton.addEventListener('click', function(e) {
    togglePopup();
});
