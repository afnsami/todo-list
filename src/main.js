// IMPORT
import "./styles.css";

// HTML OBJECTS
const todoContainer = document.getElementById('todoContainer');
const createProjectButton = document.getElementById('createProjectButton');
const addNoteButton = document.getElementById('addNote');
const cancelButton = document.getElementById("cancelButton");
const form = document.getElementById('form');

// VARIABLES
let currentTab = 'Default';

function restoreData() {
    localStorage.setItem('Default', 'data');

    for (let i = 0; i <= localStorage.length; i++) {
        let restoreTab = new ProjectMaker(localStorage.key(i));
        restoreTab.create();
    };
};


// PROJECT MAKER
class ProjectMaker {
    constructor(title) {
        this.title = title;
    };

    create() {
        const newTab = document.createElement('button');
        newTab.classList = 'projects';
        newTab.id = this.title;
        const newTabP = document.createElement('p');
        newTabP.textContent = this.title;
        const deleteButton = document.createElement('button');
        deleteButton.className = 'deleteButton';

        newTab.appendChild(newTabP);
        newTab.appendChild(deleteButton);
        document.getElementById('projectsContainer').appendChild(newTab);

        // LOCAL STORAGE
        localStorage.setItem(this.title, 'data');
    };
};

restoreData();

// SELECTED AS CURRENT TAB
document.querySelector('#projectsContainer > button').classList = 'projects currentTab';
document.getElementById('currentTabTitle').textContent = document.getElementsByClassName('currentTab')[0].querySelector('p').textContent;

// TAB CLICK
function tabSelectUpdate() {
    let allProjects = document.querySelectorAll('#projectsContainer > button');

    allProjects.forEach.call(allProjects, e => {
        e.addEventListener('click', function() {
            [].forEach.call(allProjects, e => {
                if (e !== this) e.classList.remove('currentTab');
            });

            this.classList.add('currentTab');
            currentTab = this.id;

            // CHANGES CURRENT TAB TITLE
            document.getElementById('currentTabTitle').textContent = document.getElementsByClassName('currentTab')[0].querySelector('p').textContent;
        }, false);
    });
};

tabSelectUpdate();

// PROJECT CREATE BUTTON
createProjectButton.addEventListener('click', e => {
    const projectName = prompt('Enter the project name:');
    if (projectName != "") {
        const defaultTab = new ProjectMaker(projectName);
        defaultTab.create();
        tabSelectUpdate();
    };
});

// TODO MAKER
class ToDoMaker {
    constructor(title, priority) {
        this.title = title;
        this.priority = priority;
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
        todoTitle.textContent = this.title;

        // SECTION 3
        const priorityP = document.createElement('p');
        priorityP.textContent = this.priority;
        priorityP.id = this.priority;
        const deleteButton = document.createElement('button');
        deleteButton.className = 'deleteButton';

        section1.appendChild(checkButton);
        section1.appendChild(todoTitle);
        section3.appendChild(priorityP);
        section3.appendChild(deleteButton);
        todo.appendChild(section1);
        todo.appendChild(section3)
        todoContainer.appendChild(todo);
    };
};

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


// WHEN ADD BUTTON IS CLICKED
form.addEventListener('submit', function(e) {
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const priority = document.querySelector('input[name="priority"]:checked');

    document.getElementById('popupOverlay').classList.toggle('show');
    const newNote = new ToDoMaker(title.value, priority.id);
    newNote.create();

    // CLEARS TITLE
    title.value = '';

    // CLEARS DESCRIPTION
    description.value = '';

    // CLEARS SELECTED RADIO BUTTON
    let radioButtons = document.getElementsByTagName("input");
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].type == "radio") {
            radioButtons[i].checked = false;
        }
    };

    e.preventDefault();
});

const allprojects = document.querySelector('#projects > button');
allprojects.addEventListener('click', function(e) {
    console.log(e.target.id);
});