// IMPORT
import "./styles.css";

// HTML OBJECTS
const projectsContainer = document.getElementById('projectsContainer');
const todoContainer = document.getElementById('todoContainer');
const createProjectButton = document.getElementById('createProjectButton');
const createTodoButton = document.getElementById('addNote');
const cancelTodoButton = document.getElementById("cancelButton");
const form = document.getElementById('form');

// VARIABLES
let currentTabId;


// PROJECT MAKER
class ProjectMaker {
    constructor(title, data) {
        this.title = title;
        this.data = data;
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
        projectsContainer.appendChild(newTab);

        // LOCAL STORAGE
        localStorage.setItem(this.title, this.data);
    };
};

(function restoreProjects() {
    // IF LOCALSTORAGE IS EMPTY
    if (localStorage.length == 0) {
        let defaultTab = new ProjectMaker('Default', ['Unfinished task']);
        defaultTab.create();

    } else {
        for (let i = 0; i <= ((localStorage.length) - 1); i++) {
            let restoreTab = new ProjectMaker(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
            restoreTab.create();
        };
    }
})();

function restoreTodos() {

    document.querySelectorAll('#projectsContainer > button').forEach(e => {
        e.addEventListener('click', function() {

            // REMOVES THE PREVIOUS TODOS
            document.querySelectorAll('#todoContainer > .todo').forEach(e => e.remove());

            const todoText = localStorage.getItem(e.id);

            const todoDiv = document.createElement('div');
            todoDiv.className = 'todo';

            // SECTION 1
            const section1 = document.createElement('div');
            section1.className = 'section1';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            const p = document.createElement('p');
            p.textContent = todoText;
            section1.appendChild(checkbox);
            section1.append(p);

            // SECTION 3
            const section3 = document.createElement('div');
            section1.className = 'section3';
            const deleteButton = document.createElement('button');
            deleteButton.className = 'deleteButton';
            section3.appendChild(deleteButton);

            todoDiv.appendChild(section1);
            todoDiv.appendChild(section3);


            todoContainer.appendChild(todoDiv);
        });
    });

    // AUTO CLICKS THE FIRST TAB
    document.querySelector('#projectsContainer > button').click();
};

restoreTodos();



// PROJECT CREATE BUTTON
createProjectButton.addEventListener('click', e => {
    const projectName = prompt('Enter the project name:');

    // IF PROJECT NAME IS EMPTY
    if (projectName != "") {
        const defaultTab = new ProjectMaker(projectName);
        defaultTab.create();
    } else {
        const defaultTab = new ProjectMaker('New tab');
        defaultTab.create();
    };

    // TABSELECTUPDATE()
    let allProjects = document.querySelectorAll('#projectsContainer > button');

    allProjects.forEach.call(allProjects, e => {
        e.addEventListener('click', function() {
            [].forEach.call(allProjects, e => {
                if (e !== this) e.classList.remove('currentTab');
            });

            this.classList.add('currentTab');

            // CHANGES CURRENT TAB TITLE
            document.getElementById('currentTabTitle').textContent = document.getElementsByClassName('currentTab')[0].querySelector('p').textContent;
        }, false);
    });

});

// TAB CLICK
(function tabSelectUpdate() {

    // SELECTED AS CURRENT TAB
    document.querySelector('#projectsContainer > button').classList = 'projects currentTab';
    document.getElementById('currentTabTitle').textContent = document.getElementsByClassName('currentTab')[0].querySelector('p').textContent;


    let allProjects = document.querySelectorAll('#projectsContainer > button');

    allProjects.forEach.call(allProjects, e => {
        e.addEventListener('click', function() {
            [].forEach.call(allProjects, e => {
                if (e !== this) e.classList.remove('currentTab');
            });

            this.classList.add('currentTab');

            // CHANGES CURRENT TAB TITLE
            document.getElementById('currentTabTitle').textContent = document.getElementsByClassName('currentTab')[0].querySelector('p').textContent;
        }, false);
    });
})();





let todoData = [];
let todoArray = [];
let oldTab = document.querySelector('.projects');

// TODO MAKER
class TodoMaker {
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

        
        // --------------NESTED ARRAY------------

        todoArray.push(todoTitle.textContent); //INSERTS TODO INTO AN ARRAY

        // LOCALSTORAGE
        const currentTab = document.querySelector('.currentTab');

        if (currentTab.id == oldTab.id) {
            localStorage.setItem(currentTab.id, [todoArray]);

        } else {
            todoArray = []; //EMPTIES THE PREVIOUS ARRAY

            const todoArrayString = localStorage.getItem(currentTab.id); //GETS THE DATA FROM CURRENT SELECTED PROJECT
            const stringToArray = todoArrayString.split(',');

            todoArray.push(stringToArray);
            todoArray.pop();
            todoArray.push(todoTitle.textContent);

            localStorage.setItem(currentTab.id, [todoArray]);
            oldTab = currentTab;
        };

        todoData.push(todoArray);  
    };
};

// TODO CREATE BUTTON
createTodoButton.addEventListener('click', function(e) {
    const overlay = document.getElementById('popupOverlay');
    overlay.classList.toggle('show');
});

cancelTodoButton.addEventListener('click', function(e) {
    const overlay = document.getElementById('popupOverlay');
    overlay.classList.toggle('show');
});

// WHEN ADD BUTTON IS CLICKED
form.addEventListener('submit', function(e) {
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const priority = document.querySelector('input[name="priority"]:checked');

    document.getElementById('popupOverlay').classList.toggle('show');
    const newNote = new TodoMaker(title.value, priority.id);
    newNote.create();

    // CLEARS TITLE
    title.value = '';

    // CLEARS DESCRIPTION
    description.value = '';

    // CLEARS SELECTED RADIO BUTTON
    // let radioButtons = document.getElementsByTagName("input");
    // for (let i = 0; i < radioButtons.length; i++) {
    //     if (radioButtons[i].type == "radio") {
    //         radioButtons[i].checked = false;
    //     }
    // };

    e.preventDefault();
});
